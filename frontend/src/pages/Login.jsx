import { Container, Row, Col, Card } from "react-bootstrap"
import { Formik } from "formik"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const fromPage = location.state?.from?.pathname || '/';

  const form = (
    <Formik
    initialValues={{ username: '', password: '' } }
    validate={values => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Обязательное поле'; // i18
      } else if (values.username.length < 3 || values.username.length > 20) {
        errors.username = 'От 3 до 20 символов'; // i18
      }
      return errors;
    }}
    onSubmit={(values) => {
      console.log(values);
      const { username } = values;
      signIn(username, () => navigate(fromPage, {replace: true}));

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
      }) => (
        <Row className="justify-content-center">
          <form onSubmit={handleSubmit}>
            <Row>
              <input
                type="username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </Row>
            <Row>
              {errors.username && touched.username && errors.username}
            </Row>
            <Row>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Row>
            <Row>
              {errors.password && touched.password && errors.password}
            </Row>
            <Row>
              <button type="submit" disabled={isSubmitting}>Submit</button>
            </Row>
          </form>
        </Row>
      )}
  </Formik>
  )

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs="12" md="8" xxl="6">
          <Card className="h-100">
            <Card.Body>
              <Row className="p-5">
                <Col xs="12" md="6">
                  <h1>Login page</h1>
                </Col>
                <Col xs="12" md="6">
                  <Row>
                    <h1 className="text-center">Войти</h1>
                  </Row>
                  <Row className="justify-content-center align-content-center h-100">
                    {form}
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default Login;