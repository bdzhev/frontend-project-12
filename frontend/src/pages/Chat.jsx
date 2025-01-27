import { Container } from 'react-bootstrap';
import ChatContainer from '../components/chat/ChatContainer';

const Chat = () => (
  <Container className="h-100 my-4 rounded shadow overflow-hidden">
    <ChatContainer />
  </Container>
);

export default Chat;
