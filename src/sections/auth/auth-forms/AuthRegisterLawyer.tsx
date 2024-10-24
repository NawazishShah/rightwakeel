import { SyntheticEvent, useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { Eye, EyeSlash } from 'iconsax-react';
import { Box } from '@mui/system';
import { StringColorProps } from 'types/password';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import useAuth from 'hooks/useAuth'; // Import your useAuth hook for JWT context
import { AxiosError } from 'axios';

interface ApiErrorResponse {
  msg: string; 
}
const AuthRegisterLawyer = () => {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const { register } = useAuth(); // Get the register function from context

  const [showPassword, setShowPassword] = useState(false);
  const [level, setLevel] = useState<StringColorProps>();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };
  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        email: '',
        company: '',
        password: '',
        experience: '0',
        location: '-',
        contact: '-',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().max(255).required('First Name is required'),
        lastname: Yup.string().max(255).required('Last Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await register('lawyer', values); // Call the register function from context
          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
            dispatch(
              openSnackbar({
                open: true,
                message: 'Lawyer registration successful!',
                variant: 'alert',
                alert: { color: 'success' },
                close: false
              })
            );
            setTimeout(() => {
              navigate('/login', { replace: true });
            }, 1500);
          }
        } catch (error) {
          if (scriptedRef.current) {
            setStatus({ success: false });
            const axiosError = error as AxiosError<ApiErrorResponse>; 
      
            if (axiosError.response) {
              setErrors({ submit: axiosError.response.data.msg || 'An unknown error occurred.' });
            } else {
              setErrors({ submit: 'An unexpected error occurred.' });
            }
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                <Typography variant="h3">Sign up as Lawyer</Typography>
                <Typography variant="body1" color="primary">
                  Already have an account?
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                <OutlinedInput
                  id="firstname-signup"
                  value={values.firstname}
                  name="firstname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="John"
                  fullWidth
                  error={Boolean(touched.firstname && errors.firstname)}
                />
                {touched.firstname && errors.firstname && (
                  <FormHelperText error id="helper-text-firstname-signup">
                    {errors.firstname}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.lastname && errors.lastname)}
                  id="lastname-signup"
                  value={values.lastname}
                  name="lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Doe"
                />
                {touched.lastname && errors.lastname && (
                  <FormHelperText error id="helper-text-lastname-signup">
                    {errors.lastname}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="company-signup">Company</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.company && errors.company)}
                  id="company-signup"
                  value={values.company}
                  name="company"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Demo Inc."
                />
                {touched.company && errors.company && (
                  <FormHelperText error id="helper-text-company-signup">
                    {errors.company}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  id="email-signup"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="demo@company.com"
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-signup">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-signup"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="******"
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                By Signing up, you agree to our &nbsp;
                <Link variant="subtitle2" component={RouterLink} to="#">
                  Terms of Service
                </Link>
                &nbsp; and &nbsp;
                <Link variant="subtitle2" component={RouterLink} to="#">
                  Privacy Policy
                </Link>
              </Typography>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Create Account
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthRegisterLawyer;
