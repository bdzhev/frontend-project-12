import { useState } from "react";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";

const LoginForm = ({ navigateToPrevPage, authUser }) => {
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
        const { username, password } = values;
        await authUser(username, password);
        navigateToPrevPage();

      } catch(err) {
        console.log(err)
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
      <Button type="submit">Login</Button>
    </Form>
  )
};

export default LoginForm;
