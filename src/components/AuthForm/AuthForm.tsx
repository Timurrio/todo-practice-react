import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Box } from '@mui/material';
import * as Yup from 'yup';
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
  name: string;
  confirmPassword: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const initialValues: LoginValues | RegisterValues =
    mode === 'login'
      ? { email: '', password: '' }
      : { name: '', email: '', password: '', confirmPassword: '' };

  const validationSchema = Yup.object().shape({
    ...(mode === 'register' && {
      name: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
    }),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    ...(mode === 'register' && {
      confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
    }),
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}
        enableReinitialize
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            {mode === 'register' && (
              <Box mb={2}>
                <Field
                  name="name"
                  as={TextField}
                  label="Name"
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={<ErrorMessage name="name" />}
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
              disabled={!isValid || !dirty}
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
