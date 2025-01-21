import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import modals from "../components/modals"
import ChannelsList from '../components/chat/ChannelsList';

const Chat = () => {
  const modalType = useSelector((state) => state.modal.type);
  return (
  <Container fluid className="h-100 my-4">
  <Row className="flex-md-row h-100 bg-white justify-content-center align-content-center">
    <Col className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
      <ChannelsList />
    </Col>
    <Col>

    </Col>
    { !!modalType ? modals[modalType]() : null }
  </Row>
  </Container>
  )
};

export default Chat;