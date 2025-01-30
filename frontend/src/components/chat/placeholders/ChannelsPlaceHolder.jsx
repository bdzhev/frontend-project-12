import { Placeholder, Row } from 'react-bootstrap';

const ChannelsPlaceHolder = () => (
  <>
    <Row className="px-2 py-4">
      <Placeholder animation="glow">
        <Placeholder style={{ width: '100%', height: '30px' }} size="lg" />
      </Placeholder>
    </Row>
    <div className="justify-content-center p-2 h-100">
      <Placeholder animation="glow">
        <Placeholder
          style={{ height: '30px' }}
          className="mb-2 w-100"
        />
        <Placeholder
          style={{ height: '30px' }}
          className="mb-2 w-100"
        />
      </Placeholder>
    </div>
  </>
);

export default ChannelsPlaceHolder;
