import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Box } from '@mui/material';
import type { AuthMode } from '../../types/AuthMode';

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (values: any) => void;
}

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues extends LoginValues {
  username: string;
  confirmPassword: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const initialValues: LoginValues | RegisterValues =
    mode === 'login'
      ? { email: '', password: '' }
      : { username: '', email: '', password: '', confirmPassword: '' };

  const validate = (values: any) => {
    const errors: Partial<any> = {};

    if (mode === 'register') {
      if (!values.username) {
        errors.username = 'Username is required';
      } else if (values.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
      }
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email format';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    return errors;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form>
            {mode === 'register' && (
              <Box mb={2}>
                <Field
                  name="username"
                  as={TextField}
                  label="Username"
                  fullWidth
                  error={touched.username && Boolean(errors.username)}
                  helperText={<ErrorMessage name="username" />}
                />
              </Box>
            )}

            <Box mb={2}>
              <Field
                name="email"
                as={TextField}
                label="Email"
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
              />
            </Box>

            <Box mb={2}>
              <Field
                name="password"
                as={TextField}
                label="Password"
                type="password"
                fullWidth
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
              />
            </Box>

            {mode === 'register' && (
              <Box mb={2}>
                <Field
                  name="confirmPassword"
                  as={TextField}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={<ErrorMessage name="confirmPassword" />}
                />
              </Box>
            )}

            <Button
              type="submit"
              variant="contained"
              color={mode === 'login' ? 'primary' : 'success'}
              fullWidth
            >
              {mode === 'login' ? 'Login' : 'Register'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AuthForm;
