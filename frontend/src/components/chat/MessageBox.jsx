import filter from 'leo-profanity';
import { useEffect, useRef } from 'react';

const renderMessage = ({ body, id, username }) => (
  <div className="text-break mb-2" key={id}>
    <b>{`${filter.clean(username)}: `}</b>
    { filter.clean(body) }
  </div>
);

const MessageBox = ({ messages }) => {
  const messagesRef = useRef(null);
  useEffect(() => {
    messagesRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);
  return (
    <div
      className="overflow-auto px-5"
      ref={messagesRef}
    >
      {messages.length > 0
        ? messages.map(renderMessage) : null}
    </div>
  );
};

export default MessageBox;
