import { Container, Row, Col, Card, Image } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom";
import { apiPaths } from "../../utils/routes";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../../store/slices/authSlice";
import LoginForm from "../components/features/LoginForm";


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const fromPage = location.state?.from?.pathname || '/';

  const navigateToPrevPage = () => navigate(fromPage, {replace: true});
  const authUser = async (userFromInput, password) => {
    const response = await axios.post(apiPaths.login(), { username: userFromInput, password });
    const { username, token } = response.data;
    dispatch(setCredentials({ user: username, token }));
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs="12" md="8" xxl="6">
          <Card className="h-100">
            <Card.Body>
              <Row className="p-5">
                <Col xs="12" md="6">
                  <Image src="/login_image.jpg" fluid></Image>
                </Col>
                <Col xs="12" md="6">
                  <Row>
                    <h1 className="text-center">Войти</h1>
                  </Row>
                  <Row className="justify-content-center align-content-center h-100">
                    <LoginForm navigateToPrevPage={navigateToPrevPage} authUser={authUser}/>
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
