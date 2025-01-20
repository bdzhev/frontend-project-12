import { Container, Row, Col, Card, Image } from "react-bootstrap"
import LoginForm from "../components/features/LoginForm";


const Login = () => {
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
                    <LoginForm/>
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
