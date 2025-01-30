import { Placeholder } from 'react-bootstrap';

const MessageContainerPlaceholder = () => (
  <div className="d-flex flex-column h-100">
    <div className="px-4 py-4 bg-light">
      <Placeholder animation="glow">
        <Placeholder
          style={{ width: '100%', height: '20px' }}
        />
      </Placeholder>
    </div>
    <div className="px-4 mt-2">
      <Placeholder animation="glow">
        <Placeholder
          className="w-75"
        />
      </Placeholder>
      {'  '}
      <Placeholder animation="glow">
        <Placeholder
          className="w-25"
        />
      </Placeholder>
      {'  '}
      <Placeholder animation="glow">
        <Placeholder
          className="w-50"
        />
      </Placeholder>
      {'  '}
      <Placeholder animation="glow">
        <Placeholder
          className="w-50"
        />
      </Placeholder>
    </div>
    <div className="mt-auto p-4">
      <Placeholder animation="glow">
        <Placeholder
          className="mt-auto py-3 w-100"
        />
      </Placeholder>
    </div>
  </div>
);

export default MessageContainerPlaceholder;
