import { useState } from "react";
import { useFormik } from "formik";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { apiPaths, routes } from "../../../utils/routes";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../../../store/slices/authSlice";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const signUpUser = async ({ username, password }) => {
    const response = await axios.post(apiPaths.signup(), { username, password });
    const { token } = response.data;
    localStorage.setItem('authData', JSON.stringify({ user: username, token }));
    dispatch(setCredentials({ user: username, token }));
  };

  const navigate = useNavigate();
  const navigateToMain = () => navigate(routes.main, {replace: true});

  const [formState, setFormState] = useState({ signUpStatus: 'idle', errors: null }); // idle, failed

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordCopy: '' },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required') // i18 error message
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов'),
      password: Yup.string()
        .required('Password required')
        .min(6, 'More than 6 symbols'),
      passwordCopy: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await signUpUser(values);
        navigateToMain();

      } catch(err) {
        setFormState({ authStatus: 'failed', errors: 'User already exists or incorrect data'})
        resetForm();
      }
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FloatingLabel
        controlId="username"
        label='Логин'
        className="mb-3"
      >
        <Form.Control
            id="username"
            type="text"
            isInvalid={formState.signUpStatus === 'failed'}
            {...formik.getFieldProps('username')}
            placeholder="login@somemail.com"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="password"
        label='Пароль'
        className="mb-3"
      >
        <Form.Control
          id="password"
          type="password"
          placeholder="Введите пароль"
          isInvalid={formState.signUpStatus === 'failed'}
          {...formik.getFieldProps('password')}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="password"
        label='Повторите пароль'
        className="mb-3"
      >
        <Form.Control
          id="passwordCopy"
          type="password"
          placeholder="Введите пароль еще раз"
          isInvalid={formState.signUpStatus === 'failed'}
          {...formik.getFieldProps('passwordCopy')}
        />
        <Form.Control.Feedback type="invalid">{formState.errors}</Form.Control.Feedback>
      </FloatingLabel>
      <Button className="mt-3" type="submit">Зарегистрироваться</Button>
    </Form>
  )
};

export default SignUpForm;
