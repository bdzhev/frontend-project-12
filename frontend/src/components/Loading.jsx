import { Spinner, Col, Row } from 'react-bootstrap';

const Loading = () => (
  <Row className="h-100 d-flex justify-content-center align-items-center">
    <Col>
      <Spinner animation="border" variant="primary" role="status" />
    </Col>
  </Row>
);

export default Loading;
