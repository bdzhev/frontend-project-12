import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
} from 'react-bootstrap';
import LoginForm from '../components/features/LoginForm';

const Login = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs="12" md="8" xxl="6">
          <Card className="h-100">
            <Card.Body>
              <Row className="p-5">
                <Col xs="12" md="6">
                  <Image src="/loginimage.jpg" fluid />
                </Col>
                <Col xs="12" md="6">
                  <Row>
                    <h1 className="text-center">{t('loginPage.cardTitle')}</h1>
                  </Row>
                  <Row className="justify-content-center align-content-center h-100">
                    <LoginForm />
                  </Row>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('loginPage.noAccountQuestion')}</span>
                <a href="/signup">{t('loginPage.register')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
