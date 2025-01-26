const renderMessage = ({ body, id, username }) => (
  <div className="text-break mb-2" key={id}>
    <b>{`${username}: `}</b>
    { body }
  </div>
);


const MessageBox = ({ messages }) => {
  return (
    <div className="overflow-auto px-5">
      {messages.length > 0
          ? messages.map(renderMessage) : null
      }
    </div>
  )
};

export default MessageBox;
