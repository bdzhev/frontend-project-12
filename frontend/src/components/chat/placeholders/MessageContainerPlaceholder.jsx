import { Placeholder } from 'react-bootstrap';

const MessageContainerPlaceholder = () => (
  <div className="d-flex flex-column h-100">
    <div>
      <Placeholder animation="glow">
        <Placeholder
          style={{ width: '100%', height: '42px' }}
          className="p-3 mb-4"
        />
      </Placeholder>
    </div>
    <div className="px-5">
      <Placeholder animation="glow">
        <Placeholder
          xs={6}
        />
      </Placeholder>
    </div>
    <div className="mt-auto px-5 py-3">
      <Placeholder animation="glow">
        <Placeholder
          style={{ width: '100%' }}
          className="mt-auto px-5 py-3"
        />
      </Placeholder>
    </div>
  </div>
);

export default MessageContainerPlaceholder;
