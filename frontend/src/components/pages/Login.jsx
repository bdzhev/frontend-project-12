import { Container } from "react-bootstrap"
import { Formik } from "formik"
/*
Header
Form
  Row 1 - login
    Col 1
      Image
    Col 2
      h1
      loginInput
      passwordInput
      formSumbit
  Row 2 - Registration
    text
    link
*/


const Login = () => {
  return (
    <Container>
      <h1>Login Form</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSumbitting }) => {
          console.log(values);
          setSumbitting(false);
        }}
      >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
      </Formik>
    </Container>
  )
};

export default Login;