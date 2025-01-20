import { useState } from "react";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { apiPaths } from "../../../utils/routes";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../../../store/slices/authSlice";

const LoginForm = () => {
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
  const navigateToPrevPage = () => navigate(fromPage, {replace: true});

  const [formState, setFormState] = useState({ authStatus: 'idle', errors: null }); // idle, failed

  const formik = useFormik({
    initialValues: { username: '', password: ''},
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required') // i18 error message
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов'),
      password: Yup.string()
        .required('Password required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await authUser(values);
        navigateToPrevPage();

      } catch(err) {
        setFormState({ authStatus: 'failed', errors: 'Login or password incorrect'})
        resetForm();
      }
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          id="username"
          type="text"
          isInvalid={formState.authStatus === 'failed'}
          {...formik.getFieldProps('username')}/>
        {}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          id="password"
          type="text"
          isInvalid={formState.authStatus === 'failed'}
          {...formik.getFieldProps('password')}
        />
        <Form.Control.Feedback type="invalid">{formState.errors}</Form.Control.Feedback>
      </Form.Group>
      <Button className="mt-3" type="submit">Login</Button>
    </Form>
  )
};

export default LoginForm;
