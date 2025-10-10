import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import type { AuthMode } from '../../types/AuthMode';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  const registerSchema = loginSchema
    .extend({
      name: z.string().min(3, 'Name must be at least 3 characters'),
      confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    });

  const validationSchema =
    mode === 'login'
      ? toFormikValidationSchema(loginSchema)
      : toFormikValidationSchema(registerSchema);

  return (
    <Box sx={{ width: '100%' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}
        // enableReinitialize
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
                type={showPassword ? 'text' : 'password'}
                fullWidth
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                        {showPassword ? (
                          <VisibilityOff
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <Visibility onClick={() => setShowPassword(true)} />
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            {mode === 'register' && (
              <Box mb={2}>
                <Field
                  name="confirmPassword"
                  as={TextField}
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{ cursor: 'pointer' }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff
                              onClick={() => setShowConfirmPassword(false)}
                            />
                          ) : (
                            <Visibility
                              onClick={() => setShowConfirmPassword(true)}
                            />
                          )}
                        </InputAdornment>
                      ),
                    },
                  }}
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
