import { useGetChannelsQuery } from '../../store/services/channelsApi';
import { Col, Row, Dropdown } from 'react-bootstrap';


const Channels = () => {
  const { data, error, isLoading, refetch } = useGetChannelsQuery();
  console.log(data);
  if (isLoading) return (<h1>Content is loading</h1>);
  if (error) return (<h1>Error while trying to get data</h1>);

  return (
    <Col>
      <h1>test</h1>
    </Col>
  )
};

export default Channels;
