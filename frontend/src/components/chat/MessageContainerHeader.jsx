const MessageContainerHeader = ({ activeChannelName, numOfMessages }) => {
  return (
    <>
    <p>{activeChannelName}</p>
    <p>{`num of messages: ${numOfMessages}`}</p>
    </>
  );
};

export default MessageContainerHeader;
