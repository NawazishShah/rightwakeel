import { RefObject, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

// material-ui
import {
  Autocomplete,
  Box,
  Button,
  CardHeader,
  Chip,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import MainCard from 'components/MainCard';
import countries from 'data/countries';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import axios from 'axios';

// assets
import { Add } from 'iconsax-react';
import useAuth from 'hooks/useAuth';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

const Specialities = [
  'Speciality',
  'Anti Corruption Law',
  'Anti Narcotics Law',
  'Arbitration Law',
  'Auqaf & Religious affairs Law',
  'Aviation Law',
  'Banking Law',
  'Cantonments Law',
  'Civil Law',
  'Commercial Law',
  'Company Law',
  'Constitutional Law',
  'Consumer Law',
  'Contract Law',
  'Copyrights & Trademarks Law',
  'Corporate Law',
  'Criminal Law',
  'Customs Law',
  'Cybercrime Law',
  'Defamation Law',
  'Election & Political Law',
  'Employment Law',
  'Environmental Law',
  'Family Law',
  'Immigration Law',
  'International Law',
  'Labour Law',
  'Land Revenue Law',
  'Landlord & Tenancy Law',
  'Medical Negligence Law',
  'Money laundering Law',
  'Nab Law',
  'Taxation Law'
];


function useInputRef() {
  return useOutletContext<RefObject<HTMLInputElement>>();
}

// ==============================|| USER PROFILE - PERSONAL ||============================== //

const TabPersonal = () => {
  const { user, isLoggedIn } = useAuth();
  const [lawyerData, setLawyerData] = useState(null);
  console.log(lawyerData, user, isLoggedIn, "===");

  const handleChangeDay = (event: SelectChangeEvent<string>, date: Date, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue('dob', new Date(date.setDate(parseInt(event.target.value, 10))));
  };

  const handleChangeMonth = (event: SelectChangeEvent<string>, date: Date, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue('dob', new Date(date.setMonth(parseInt(event.target.value, 10))));
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const inputRef = useInputRef();

  useEffect(() => {
    const fetchLawyerData = async () => {
      if (isLoggedIn && user) {
        try {
          const response = await axios.get(`/api/lawyers/${user.id}`); // Use the user ID here
          setLawyerData(response.data);
        } catch (error) {
          console.error('Error fetching lawyer data:', error);
        }
      }
    };

    fetchLawyerData();
  }, [isLoggedIn, user]); 

  return (
    <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>

<Formik
  initialValues={{
    firstname: 'Stebin',
    lastname: 'Ben',
    email: 'abcd@gmail.com',
    dob: new Date('03-10-1993'),
    ccNumber: '12',
    cnicNumber: '6765467896543',
    countryCode: '+91',
    contact: 9652364852,
    designation: 'Advocate',
    qualificationTitle: '',
    address: '3801 Chalk Butte Rd, Cut Bank, MT 59427, United States',
    address1: '301 Chalk Butte Rd, Cut Bank, NY 96572, New York',
    country: 'US',
    state: 'California',
    speciality: [
      'Auqaf & Religious affairs Law',
      'Aviation Law',
      'Banking Law',
      'Cantonments Law',
      'Immigration Law',
      'International Law',
      'Labour Law',
      'Land Revenue Law',
      'Landlord & Tenancy Law',
      'Medical Negligence Law',
      'Money laundering Law',
      'Nab Law',
      'Taxation Law'
    ],
    note: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    submit: null,
    password: '123456'
  }}
  validationSchema={Yup.object().shape({
    firstname: Yup.string().max(255).required('First Name is required.'),
    lastname: Yup.string().max(255).required('Last Name is required.'),
    email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),
    dob: Yup.date().required('Date of birth is required.'),
    ccNumber: Yup.string().required('CC Number is required.'),
    cnicNumber: Yup.string().length(13, 'CNIC must be 13 digits long').required('CNIC Card Number is required.'),
    contact: Yup.string().length(10, 'Contact should be exactly 10 digits').required('Phone number is required'),
    designation: Yup.string().required('Designation is required'),
    address: Yup.string().min(50, 'Address too short.').required('Address is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    note: Yup.string().min(150, 'Note should be more than 150 characters.'),
  })}
  onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      // Send the form data to the backend
      const response = await axios.put('http://localhost:5000/api/lawyers/updateProfile', values);
      console.log(response);
      // Handle success
      dispatch(
        openSnackbar({
          open: true,
          message: 'Personal profile updated successfully.',
          variant: 'alert',
          alert: {
            color: 'success',
          },
          close: false,
        })
      );
      setStatus({ success: true });
      setSubmitting(false);
    } catch (err) {
      // Handle error
      console.error(err);
      setStatus({ success: false });
      // setErrors({ submit: err?.message });
      setSubmitting(false);
    }
  }}
>


        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-first-name"
                      value={values.firstname}
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoFocus
                      inputRef={inputRef}
                    />
                    {touched.firstname && errors.firstname && (
                      <FormHelperText error id="personal-first-name-helper">
                        {errors.firstname}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-last-name">Last Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-last-name"
                      value={values.lastname}
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                    {touched.lastname && errors.lastname && (
                      <FormHelperText error id="personal-last-name-helper">
                        {errors.lastname}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-email">Email Address</InputLabel>
                    <TextField
                      type="email"
                      fullWidth
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="personal-email"
                      placeholder="Email Address"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="personal-email-helper">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="dob-month">Date of Birth (+18)</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Select
                        fullWidth
                        value={values.dob.getMonth().toString()}
                        name="dob-month"
                        onChange={(e: SelectChangeEvent<string>) => handleChangeMonth(e, values.dob, setFieldValue)}
                      >
                        <MenuItem value="0">January</MenuItem>
                        <MenuItem value="1">February</MenuItem>
                        <MenuItem value="2">March</MenuItem>
                        <MenuItem value="3">April</MenuItem>
                        <MenuItem value="4">May</MenuItem>
                        <MenuItem value="5">June</MenuItem>
                        <MenuItem value="6">July</MenuItem>
                        <MenuItem value="7">August</MenuItem>
                        <MenuItem value="8">September</MenuItem>
                        <MenuItem value="9">October</MenuItem>
                        <MenuItem value="10">November</MenuItem>
                        <MenuItem value="11">December</MenuItem>
                      </Select>
                      <Select
                        fullWidth
                        value={values.dob.getDate().toString()}
                        name="dob-date"
                        onBlur={handleBlur}
                        onChange={(e: SelectChangeEvent<string>) => handleChangeDay(e, values.dob, setFieldValue)}
                        MenuProps={MenuProps}
                      >
                        {[
                          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
                        ].map((i) => (
                          <MenuItem
                            key={i}
                            value={i}
                            disabled={
                              (values.dob.getMonth() === 1 && i > (values.dob.getFullYear() % 4 === 0 ? 29 : 28)) ||
                              (values.dob.getMonth() % 2 !== 0 && values.dob.getMonth() < 7 && i > 30) ||
                              (values.dob.getMonth() % 2 === 0 && values.dob.getMonth() > 7 && i > 30)
                            }
                          >
                            {i}
                          </MenuItem>
                        ))}
                      </Select>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          views={['year']}
                          value={values.dob}
                          maxDate={maxDate}
                          onChange={(newValue) => {
                            setFieldValue('dob', newValue);
                          }}
                          sx={{ width: 1 }}
                        />
                      </LocalizationProvider>
                    </Stack>
                    {touched.dob && errors.dob && (
                      <FormHelperText error id="personal-dob-helper">
                        {errors.dob as String}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-cc-number">CC Number</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-cc-number"
                      value={values.ccNumber}
                      name="ccNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="CC Number"
                    />
                    {touched.ccNumber && errors.ccNumber && (
                      <FormHelperText error id="personal-cc-number-helper">
                        {errors.ccNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {/* New CNIC Card Number field */}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-cnic-number">CNIC Card Number</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-cnic-number"
                      value={values.cnicNumber}
                      name="cnicNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="CNIC Card Number"
                    />
                    {touched.cnicNumber && errors.cnicNumber && (
                      <FormHelperText error id="personal-cnic-number-helper">
                        {errors.cnicNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-phone">Phone Number</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Select value={values.countryCode} name="countryCode" onBlur={handleBlur} onChange={handleChange}>
                        <MenuItem value="+91">+91</MenuItem>
                        <MenuItem value="1-671">1-671</MenuItem>
                        <MenuItem value="+36">+36</MenuItem>
                        <MenuItem value="(225)">(255)</MenuItem>
                        <MenuItem value="+39">+39</MenuItem>
                        <MenuItem value="1-876">1-876</MenuItem>
                        <MenuItem value="+7">+7</MenuItem>
                        <MenuItem value="(254)">(254)</MenuItem>
                        <MenuItem value="(373)">(373)</MenuItem>
                        <MenuItem value="1-664">1-664</MenuItem>
                        <MenuItem value="+95">+95</MenuItem>
                        <MenuItem value="(264)">(264)</MenuItem>
                      </Select>
                      <TextField
                        fullWidth
                        id="personal-contact"
                        value={values.contact}
                        name="contact"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Contact Number"
                      />
                    </Stack>
                    {touched.contact && errors.contact && (
                      <FormHelperText error id="personal-contact-helper">
                        {errors.contact}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-designation">Designation</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-designation"
                      value={values.designation}
                      name="designation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Designation"
                    />
                    {touched.designation && errors.designation && (
                      <FormHelperText error id="personal-designation-helper">
                        {errors.designation}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <CardHeader title="Qualification" />
            <Divider />
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="qualification-title">Qualification Title</InputLabel>
                    <TextField
                      fullWidth
                      id="qualification-title"
                      value={values.qualificationTitle}
                      name="qualificationTitle"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter qualification title"
                    />
                    {touched.qualificationTitle && errors.qualificationTitle && (
                      <FormHelperText error id="qualification-title-helper">
                        {errors.qualificationTitle}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="languages">Languages</InputLabel>
                    <Autocomplete
                      multiple
                      id="languages"
                      options={['English', 'Urdu', 'Punjabi', 'Sindhi', 'Pushto']}
                      onChange={(event, value) => {
                        setFieldValue('languages', value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select languages"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password' // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="courts">Courts</InputLabel>
                    <Autocomplete
                      multiple
                      id="courts"
                      options={[
                        'Azad Kashmir High Court',
                        'Azad Kashmir Supreme Court',
                        'Balochistan High Court',
                        'District & Session Courts',
                        'Gilgit-Baltistan Chief Court',
                        'Islamabad High Court',
                        'Lahore High Court',
                        'Peshawar High Court',
                        'Sindh High Court',
                        'Special Courts',
                        'Supreme Appellate Court of Gilgit Baltistan',
                        'Supreme Court'
                      ]}
                      onChange={(event, value) => {
                        setFieldValue('courts', value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select courts"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password' // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            <CardHeader title="Office Address" />
            <Divider />
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-addrees1">Address 01</InputLabel>
                    <TextField
                      multiline
                      rows={3}
                      fullWidth
                      id="personal-addrees1"
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Address 01"
                    />
                    {touched.address && errors.address && (
                      <FormHelperText error id="personal-address-helper">
                        {errors.address}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-addrees2">Address 02</InputLabel>
                    <TextField
                      multiline
                      rows={3}
                      fullWidth
                      id="personal-addrees2"
                      value={values.address1}
                      name="address1"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Address 02"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-country">Country</InputLabel>
                    <Autocomplete
                      id="personal-country"
                      fullWidth
                      value={countries.filter((item) => item.code === values?.country)[0]}
                      onBlur={handleBlur}
                      onChange={(event, newValue) => {
                        setFieldValue('country', newValue === null ? '' : newValue.code);
                      }}
                      options={countries}
                      autoHighlight
                      isOptionEqualToValue={(option, value) => option.code === value?.code}
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          {option.code && (
                            <img
                              loading="lazy"
                              width="20"
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              alt=""
                            />
                          )}
                          {option.label}
                          {option.code && `(${option.code}) ${option.phone}`}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Choose a country"
                          name="country"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password' // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                    {touched.country && errors.country && (
                      <FormHelperText error id="personal-country-helper">
                        {errors.country}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-state">State</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-state"
                      value={values.state}
                      name="state"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="State"
                    />
                    {touched.state && errors.state && (
                      <FormHelperText error id="personal-state-helper">
                        {errors.state}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <CardHeader title="Speciality" />
            <Divider />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 2.5, m: 0 }} component="ul">
              <Autocomplete
                multiple
                fullWidth
                id="tags-outlined"
                options={Specialities} // Adjusted here
                value={values.speciality}
                onBlur={handleBlur}
                getOptionLabel={(label) => label}
                onChange={(event, newValue) => {
                  setFieldValue('Speciality', newValue);
                }}
                renderInput={(params) => <TextField {...params} name="Speciality" placeholder="Add Specialities" />}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      variant="combined"
                      label={option}
                      deleteIcon={<Add style={{ fontSize: '0.75rem', transform: 'rotate(45deg)' }} />}
                      sx={{ color: 'text.primary' }}
                    />
                  ))
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    p: 0,
                    '& .MuiAutocomplete-tag': {
                      m: 1
                    },
                    '& fieldset': {
                      display: 'none'
                    },
                    '& .MuiAutocomplete-endAdornment': {
                      display: 'none'
                    },
                    '& .MuiAutocomplete-popupIndicator': {
                      display: 'none'
                    }
                  }
                }}
              />
            </Box>
            <CardHeader title="Note" />
            <Divider />
            <Box sx={{ p: 2.5 }}>
              <TextField
                multiline
                rows={5}
                fullWidth
                value={values.note}
                name="note"
                onBlur={handleBlur}
                onChange={handleChange}
                id="personal-note"
                placeholder="Note"
              />
              {touched.note && errors.note && (
                <FormHelperText error id="personal-note-helper">
                  {errors.note}
                </FormHelperText>
              )}
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>
                <Button disabled={isSubmitting } type="submit" variant="contained">
                  Save
                </Button>
              </Stack>
            </Box>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

export default TabPersonal;
