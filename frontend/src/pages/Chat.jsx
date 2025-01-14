import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import channelModals from '../components/modals';
import { openModal } from '../../store/slices/modalSlice';
import Channels from '../components/Channels';

const Chat = () => {
  const type = useSelector((state) => state.modal.type);
  const dispatch = useDispatch();
  const handleModal = () => dispatch(openModal({ type: 'add', channel: 'first' }));
  return (
  <Container fluid className="h-100 my-4">
  <Row className="flex-md-row h-100 bg-white">
    <Col className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
      <Channels/>
    </Col>
    <Col className='p-0 h-100'>
      <Button onClick={handleModal}>Open Add Modal</Button>
    </Col>
    { !!type ? channelModals[type]() : null }
  </Row>
  </Container>
  )
};

export default Chat;