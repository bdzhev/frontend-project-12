/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { setCredentials } from '../../../store/slices/authSlice';
import { apiPaths } from '../../../utils/routes';
import schemas from '../../../utils/validationSchemas';

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const navigateToPrevPage = () => navigate(fromPage, { replace: true });
  const [formState, setFormState] = useState({ authStatus: 'idle', errors: null });

  const authUser = ({ username, password }) => {
    setFormState({ ...formState, authStatus: 'sending' });
    axios.post(apiPaths.login(), { username, password })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('authData', JSON.stringify({ user: username, token }));
        dispatch(setCredentials({ user: username, token }));
        navigateToPrevPage();
      })
      .catch((err) => {
        const errMessage = axios.isAxiosError(err)
          ? t('loginForm.errors.authError')
          : t('loginForm.errors.unknownError');

        setFormState({ authStatus: 'idle', errors: errMessage });
      });
  };

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: schemas.loginForm(t),
    onSubmit: (values) => authUser(values),
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="username">{t('loginForm.username')}</Form.Label>
        <Form.Control
          id="username"
          type="text"
          isInvalid={formState.errors}
          {...formik.getFieldProps('username')}
        />
        <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">{t('loginForm.password')}</Form.Label>
        <Form.Control
          id="password"
          type="password"
          isInvalid={formState.errors}
          {...formik.getFieldProps('password')}
        />
        <Form.Control.Feedback type="invalid">{formState.errors}</Form.Control.Feedback>
      </Form.Group>
      <Button
        className="mt-3"
        type="submit"
        disabled={!formState.authStatus === 'idle'}
      >
        {t('loginForm.login')}
      </Button>
    </Form>
  );
};

export default LoginForm;
