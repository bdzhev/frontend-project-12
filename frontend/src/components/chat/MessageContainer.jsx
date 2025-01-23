import { Row } from "react-bootstrap"
import { activeChannelSelector } from "../../../store/slices/activeChannelSlice";
import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../../store/services/chatApi";
import Loading from "../Loading";
import MessageBox from "./MessageBox";
import MessageForm from "./MessageForm";
import MessageContainerHeader from "./MessageContainerHeader";

const MessageContainer = () => {
  const activeChannel = useSelector(activeChannelSelector);
  const { data, error, isLoading, refetch } = useGetMessagesQuery();
  if (isLoading) return (<Loading />);
  if (error) return (`Encountered an error while trying to get messages`);
  const currentMessages = data.filter((m) => m.channelId === activeChannel.id);
  return (
    <>
      <Row>
        <MessageContainerHeader
          activeChannelName={activeChannel.name}
            numOfMessages={currentMessages.length}
        />
      </Row>
      <Row>
        <MessageBox />
      </Row>
      <Row>
        <MessageForm />
      </Row>
    </>
    
  );
};

export default MessageContainer;