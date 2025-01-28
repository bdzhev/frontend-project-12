/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { apiPaths, routes } from '../../../utils/routes';
import { setCredentials } from '../../../store/slices/authSlice';

const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const signUpUser = async ({ username, password }) => {
    const response = await axios.post(apiPaths.signup(), { username, password });
    const { token } = response.data;
    localStorage.setItem('authData', JSON.stringify({ user: username, token }));
    dispatch(setCredentials({ user: username, token }));
  };

  const navigate = useNavigate();
  const navigateToMain = () => navigate(routes.main, { replace: true });

  const [formState, setFormState] = useState({ signUpStatus: 'idle', errors: null }); // idle, failed

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordCopy: '' },
    validationSchema: Yup.object({
      username: Yup.string()
        .required(t('loginForm.errors.required'))
        .min(3, t('loginForm.errors.username.short'))
        .max(20, t('loginForm.errors.username.long')),
      password: Yup.string()
        .required(t('loginForm.errors.required'))
        .min(6, t('signupForm.errors.shortPassword')),
      passwordCopy: Yup.string()
        .required(t('loginForm.errors.required'))
        .oneOf([Yup.ref('password')], t('signupForm.errors.matchingPasswords')),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await signUpUser(values);
        navigateToMain();
      } catch (err) {
        if (axios.isAxiosError(err) && err.response.status === 409) {
          setFormState({ signUpStatus: 'failed', errors: t('signupForm.errors.userExists') });
        } else {
          setFormState({ signUpStatus: 'failed', errors: t('signupForm.errors.unknown') });
        }
        resetForm();
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FloatingLabel
        controlId="username"
        label={t('signupForm.labels.username')}
        className="mb-3"
      >
        <Form.Control
          id="username"
          type="text"
          isInvalid={formState.signUpStatus === 'failed'
              || (formik.touched.username && formik.errors.username)}
          {...formik.getFieldProps('username')}
          placeholder={t('signupForm.labels.username')}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        controlId="password"
        label={t('loginForm.password')}
        className="mb-3"
      >
        <Form.Control
          id="password"
          type="password"
          placeholder={t('loginForm.password')}
          isInvalid={formState.signUpStatus === 'failed'
            || (formik.errors.password && formik.touched.password)}
          {...formik.getFieldProps('password')}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        controlId="password"
        label={t('signupForm.labels.repeatPassword')}
        className="mb-3"
      >
        <Form.Control
          id="passwordCopy"
          type="password"
          placeholder={t('signupForm.labels.repeatPassword')}
          isInvalid={formState.signUpStatus === 'failed'
            || (formik.errors.passwordCopy && formik.touched.passwordCopy)}
          {...formik.getFieldProps('passwordCopy')}
        />
        <Form.Control.Feedback type="invalid">
          {formState.errors || formik.errors.passwordCopy}
        </Form.Control.Feedback>
      </FloatingLabel>
      <Button className="mt-3" type="submit">
        {t('signupForm.sendFormButton')}
      </Button>
    </Form>
  );
};

export default SignUpForm;
