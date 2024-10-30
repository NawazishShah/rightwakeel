const express = require('express');
const bcrypt = require('bcryptjs'); 
const Lawyer = require('../models/Lawyer');
const User = require('../models/User'); // Assuming the User model exists
const fileUpload = require('express-fileupload'); // Import fileUpload

const router = express.Router();


// Enable file upload
router.use(fileUpload());

// Get all lawyers
router.get('/list', async (req, res) => {
  try {
    const lawyers = await Lawyer.find();
    res.json({ lawyers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Filter lawyers based on user input
router.post('/filter', async (req, res) => {
  const { specialty, location, experience, userId } = req.body;

  try {
    // Find user to use their preferences or saved lawyers (if needed)
    const user = await User.findById(userId);

    // Filter logic based on input
    const filterCriteria = {};
    if (specialty) filterCriteria.specialty = { $in: specialty };
    if (location) filterCriteria.location = location;
    if (experience) filterCriteria.experience = { $gte: experience };

    const lawyers = await Lawyer.find(filterCriteria);

    // Optional: Filtering further based on user-specific criteria (e.g., preferences)
    if (user && user.savedLawyers) {
      // Modify filtering based on user saved lawyers or any other criteria
    }

    res.json(lawyers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get lawyer details, including related data from user or reviews
router.post('/details', async (req, res) => {
  const { id, userId } = req.body;

  try {
    const lawyer = await Lawyer.findById(id)
      .populate('reviews.user', 'name') // Populating user info in reviews
      .populate('relatedLawyers'); // Example: if a lawyer has related lawyers

    if (!lawyer) return res.status(404).json({ error: 'Lawyer not found' });

    // Optional: Get user-specific details, such as if the lawyer is saved by the user
    let isSaved = false;
    if (userId) {
      const user = await User.findById(userId);
      isSaved = user.savedLawyers.includes(id); // Assuming the user has savedLawyers array
    }

    res.json({ lawyer, isSaved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new lawyer
router.post('/add', async (req, res) => {
  const { firstname, lastname, email, specialty, contact, location, experience } = req.body;

  try {
    const lawyer = new Lawyer({
      firstname,
      lastname,
      email,
      specialty,
      contact,
      location,
      experience
    });

    await lawyer.save();
    res.status(201).json({ message: 'Lawyer added successfully', lawyer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a lawyer by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
console.log('id form api', id)
  try {
    // Find the lawyer by ID
    const lawyer = await Lawyer.findById(id)
      .populate('relatedLawyers'); // Example: populate related lawyers if needed

    if (!lawyer) {
      return res.status(404).json({ error: 'Lawyer not found' });
    }

    res.json(lawyer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Update user profile by email
// router.put('/updateProfile', async (req, res) => {
//   console.log('Update Profile endpoint hit');
//   const { 
//     email,
//     firstname,
//     lastname,
//     dob,
//     ccNumber,
//     cnicNumber,
//     contact,
//     designation,
//     qualificationTitle,
//     address,
//     address1,
//     country,
//     state,
//     speciality,
//     note 
//   } = req.body;

//   try {
//     // Validate email
//     if (!email) {
//       return res.status(400).json({ msg: 'Email is required' });
//     }

//     // Find the user by email
//     const updateFields = {
//       ...(firstname && { firstname }),
//       ...(lastname && { lastname }),
//       ...(dob && { dob }),
//       ...(ccNumber && { ccNumber }),
//       ...(cnicNumber && { cnicNumber }),
//       ...(contact && { contact }),
//       ...(designation && { designation }),
//       ...(qualificationTitle && { qualificationTitle }),
//       ...(address && { address }),
//       ...(address1 && { address1 }),
//       ...(country && { country }),
//       ...(state && { state }),
//       ...(speciality && { speciality }), 
//       ...(note && { note })
//   };

//     const result = await Lawyer.findOneAndUpdate(
//       { email },
//       { $set: updateFields },
//       { new: true, runValidators: true }  // Run validation on updated fields
//     );

//     if (!result) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     res.status(200).json({ msg: 'Profile updated successfully', user: result });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

router.put('/updateProfile/:id', async (req, res) => {
  const lawyerId = req.params.id;
  const updatedData = req.body;

  try {
    const result = await Lawyer.findByIdAndUpdate(lawyerId, updatedData, { new: true, runValidators: true });
    if (!result) {
      return res.status(404).send({ message: 'Lawyer not found' });
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});


router.put('/updateProfilePic/:id', async (req, res) => {
  const lawyerId = req.params.id;
  const updatedData = req.body;

  // Check if there is a file
  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const uploadPath = '/uploads/' + avatar.name; // Store relative path

    // Use mv() to place the file somewhere on your server
    await new Promise((resolve, reject) => {
      avatar.mv(__dirname + '/../uploads/' + avatar.name, function(err) {
        if (err) {
          return reject(err);
        }
        resolve(uploadPath); // Resolve with the relative path
      });
    })
    .then(() => {
      updatedData.avatar = uploadPath; // Store the relative path
    })
    .catch(error => {
      return res.status(500).send(error);
    });
  }

  try {
    const result = await Lawyer.findByIdAndUpdate(lawyerId, updatedData, { new: true, runValidators: true });
    if (!result) {
      return res.status(404).send({ message: 'Lawyer not found' });
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});



// Delete lawyer
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Lawyer.findByIdAndDelete(id);
    res.json({ message: 'Lawyer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
