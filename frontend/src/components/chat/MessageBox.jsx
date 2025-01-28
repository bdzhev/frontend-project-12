import filter from 'leo-profanity';

const renderMessage = ({ body, id, username }) => (
  <div className="text-break mb-2" key={id}>
    <b>{`${filter.clean(username)}: `}</b>
    { filter.clean(body) }
  </div>
);

const MessageBox = ({ messages }) => (
  <div className="overflow-auto px-5">
    {messages.length > 0
      ? messages.map(renderMessage) : null}
  </div>
);

export default MessageBox;
