import { useSelector } from 'react-redux';
import { activeChannelSelector } from '../../../store/slices/activeChannelSlice';
import { useGetMessagesQuery } from '../../../store/services/chatApi';
import Loading from '../Loading';
import MessageBox from './MessageBox';
import MessageForm from './MessageForm';
import MessageContainerHeader from './MessageContainerHeader';

const MessageContainer = () => {
  const username = useSelector((state) => state.auth.user);
  const activeChannel = useSelector(activeChannelSelector);
  const { data, error, isLoading } = useGetMessagesQuery();

  if (isLoading) return (<Loading />);
  if (error) return ('Encountered an error while trying to get messages');
  const currentMessages = data.filter((m) => m.channelId === activeChannel.id);

  return (
    <div className="d-flex flex-column h-100">
      <MessageContainerHeader
        activeChannelName={activeChannel.name}
        numOfMessages={currentMessages.length}
      />
      <MessageBox messages={currentMessages} />
      <MessageForm channelId={activeChannel.id} username={username} />
    </div>

  );
};

export default MessageContainer;
