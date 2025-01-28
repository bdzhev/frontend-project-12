import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { activeChannelSelector } from '../../../store/slices/activeChannelSlice';
import { useGetMessagesQuery } from '../../../store/services/chatApi';
import MessageContainerPlaceholder from './placeholders/MessageContainerPlaceholder';
import MessageBox from './MessageBox';
import MessageForm from './MessageForm';
import MessageContainerHeader from './MessageContainerHeader';

const MessageContainer = () => {
  const { t } = useTranslation();
  const username = useSelector((state) => state.auth.user);
  const activeChannel = useSelector(activeChannelSelector);
  const { data, error, isLoading } = useGetMessagesQuery();

  if (isLoading) return (<MessageContainerPlaceholder />);

  if (error) {
    toast.warn(t('chatPage.errors.messagesReqError'));
    return (<MessageContainerPlaceholder />);
  }

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
