import { Row, Nav } from 'react-bootstrap';
import ChannelsListHeader from './ChannelsListHeader';
import ChannelItem from './ChannelItem';
import { useGetChannelsQuery } from '../../../store/services/chatApi';
import Loading from '../Loading';

const Channels = () => {
  const { data, error, isLoading, refetch } = useGetChannelsQuery();
  if (isLoading) return (<Loading />);
  if (error) return (<h1>Error while trying to get data</h1>);

  return (
    <>
      <Row className='mx-4'>
        <ChannelsListHeader />
      </Row>
      <Nav className='flex-column'>
        {
          data.map(({ id, name, removable }) =>
            <ChannelItem id={id} name={name} removable={removable} />
          )
        }
      </Nav>
    </>
  )
};

export default Channels;
