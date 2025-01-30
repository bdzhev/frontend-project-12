/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { apiPaths, routes } from '../../../utils/routes';
import { setCredentials } from '../../../store/slices/authSlice';
import schemas from '../../../utils/validationSchemas';

const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToMain = () => navigate(routes.main, { replace: true });
  const [formState, setFormState] = useState({ authStatus: 'idle', errors: null });

  const authUser = ({ username, password }) => {
    setFormState({ ...formState, authStatus: 'sending' });
    axios.post(apiPaths.signup(), { username, password })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('authData', JSON.stringify({ user: username, token }));
        dispatch(setCredentials({ user: username, token }));
        navigateToMain();
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          if (err.response.status === 401) {
            setFormState({
              authStatus: 'idle',
              errors: t('signupForm.errors.userExists'),
            });
          } else {
            setFormState({
              authStatus: 'idle',
              errors: t('signupForm.errors.network'),
            });
          }
        } else {
          setFormState({
            authStatus: 'idle',
            errors: t('loginForm.errors.unknownError'),
          });
        }
      });
  };

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordCopy: '' },
    validationSchema: schemas.signupForm(t),
    onSubmit: (values) => authUser(values),
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
          isInvalid={
            formState.errors
            || (formik.errors.username && formState.errors)
          }
          {...formik.getFieldProps('username')}
          placeholder={t('signupForm.labels.username')}
        />
        <Form.Control.Feedback tooltip type="invalid">
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
          isInvalid={
            formState.errors
            || (formik.errors.password && formik.touched.password)
          }
          {...formik.getFieldProps('password')}
        />
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        controlId="passwordCopy"
        label={t('signupForm.labels.repeatPassword')}
        className="mb-3"
      >
        <Form.Control
          id="passwordCopy"
          type="password"
          placeholder={t('signupForm.labels.repeatPassword')}
          isInvalid={
            formState.errors
            || (formik.errors.passwordCopy && formik.touched.passwordCopy)
          }
          {...formik.getFieldProps('passwordCopy')}
        />
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.passwordCopy}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {formState.errors}
        </Form.Control.Feedback>
      </FloatingLabel>
      <Button
        className="mt-3"
        type="submit"
        disabled={!formState.authStatus === 'idle'}
      >
        {t('signupForm.sendFormButton')}
      </Button>
    </Form>
  );
};

export default SignUpForm;
