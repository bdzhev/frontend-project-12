/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { setCredentials } from '../../../store/slices/authSlice';
import { apiPaths } from '../../../utils/routes';

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authUser = async ({ username, password }) => {
    const response = await axios.post(apiPaths.login(), { username, password });
    const { token } = response.data;
    localStorage.setItem('authData', JSON.stringify({ user: username, token }));
    dispatch(setCredentials({ user: username, token }));
  };

  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const navigateToPrevPage = () => navigate(fromPage, { replace: true });

  const [formState, setFormState] = useState({ authStatus: 'idle', errors: null }); // idle, failed

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string()
        .required(t('loginForm.errors.required'))
        .min(3, t('loginForm.errors.username.short'))
        .max(20, t('loginForm.errors.username.long')),
      password: Yup.string()
        .required(t('loginForm.errors.required')),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await authUser(values);
        navigateToPrevPage();
      } catch (err) {
        setFormState({ authStatus: 'failed', errors: t('loginForm.errors.authError') });
        resetForm();
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="username">{t('loginForm.username')}</Form.Label>
        <Form.Control
          id="username"
          type="text"
          isInvalid={formState.authStatus === 'failed'}
          {...formik.getFieldProps('username')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">{t('loginForm.password')}</Form.Label>
        <Form.Control
          id="password"
          type="password"
          isInvalid={formState.authStatus === 'failed'}
          {...formik.getFieldProps('password')}
        />
        <Form.Control.Feedback type="invalid">{formState.errors}</Form.Control.Feedback>
      </Form.Group>
      <Button className="mt-3" type="submit">{t('loginForm.login')}</Button>
    </Form>
  );
};

export default LoginForm;
