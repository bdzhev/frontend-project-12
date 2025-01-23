import { Row, Col } from 'react-bootstrap';
import modals from "../modals";
import ChannelsList from "./ChannelsList";
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux';

const ChatContainer = () => {
  const modalType = useSelector((state) => state.modal.type);

  return (
    <Row className="flex-md-row h-100 bg-white justify-content-center align-content-center">
      <Col className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
        <ChannelsList />
      </Col>
      <Col className='p-0 h-100'>
        <MessageContainer />
      </Col>
      { !!modalType ? modals[modalType]() : null }
    </Row>
  );
};

export default ChatContainer;
