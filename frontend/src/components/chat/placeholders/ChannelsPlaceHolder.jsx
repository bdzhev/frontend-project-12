import { Placeholder, Row } from 'react-bootstrap';

const ChannelsPlaceHolder = () => (
  <>
    <Row className="mx-4 p-4">
      <Placeholder animation="glow">
        <Placeholder style={{ width: '100%' }} size="lg" />
      </Placeholder>
    </Row>
    <div>
      <Placeholder animation="glow">
        <Placeholder.Button variant="secondary" style={{ width: '100%', height: '30px' }} />
        <Placeholder.Button variant="secondary" style={{ width: '100%', height: '30px' }} />
      </Placeholder>
    </div>
  </>
);

export default ChannelsPlaceHolder;
