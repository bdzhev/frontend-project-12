import { useTranslation } from 'react-i18next';

const MessageContainerHeader = ({ activeChannelName, numOfMessages: count }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-light small mb-4 p-3">
      <p className="m-0">
        <b>{`#${activeChannelName}`}</b>
      </p>
      <span className="text-muted">
        {`${count} ${t('chatPage.messageBox.numOfMessages.message', { count })}`}
      </span>
    </div>
  );
};

export default MessageContainerHeader;
