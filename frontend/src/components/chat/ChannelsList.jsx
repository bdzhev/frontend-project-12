import { Row, Nav } from 'react-bootstrap';
import ChannelsListHeader from './ChannelsListHeader';
import ChannelItem from './ChannelItem';
import { useGetChannelsQuery } from '../../../store/services/chatApi';
import Loading from '../Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setCurChannel } from '../../../store/slices/activeChannelSlice';
import { defaultChannel } from '../../../utils/defaultChannel';

const Channels = () => {
  const dispatch = useDispatch();
  const { data: channels, error, isLoading } = useGetChannelsQuery();
  const activeChannel = useSelector((state) => state.activeChannel.active);
  if (isLoading) return (<Loading />);
  if (error) return (<h1>Error while trying to get data</h1>);

  const existingChannelsIds = channels.map((c) => c.id);
  if (!existingChannelsIds.includes(activeChannel.id)) {
    dispatch(setCurChannel(defaultChannel));
  }

  return (
    <>
      <Row className='mx-4'>
        <ChannelsListHeader />
      </Row>
      <Nav className='flex-column'>
        {
          channels.map(({ id, name, removable }) =>
            <ChannelItem id={id} name={name} removable={removable} isActive={id === activeChannel.id}/>
          )
        }
      </Nav>
    </>
  )
};

export default Channels;
