const MessageContainerHeader = ({ activeChannelName, numOfMessages }) => {
  return (
    <div className="bg-light small mb-4 p-3">
      <p className="m-0">
        <b>{`#${activeChannelName}`}</b>
      </p>
      <span className="text-muted">{`num of messages: ${numOfMessages}`}</span>
    </div>
  );
};

export default MessageContainerHeader;
