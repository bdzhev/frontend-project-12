import { useTranslation } from 'react-i18next';
import { Row, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ChannelsListHeader from './ChannelsListHeader';
import ChannelItem from './ChannelItem';
import { useGetChannelsQuery } from '../../../store/services/chatApi';
import { setCurChannel } from '../../../store/slices/activeChannelSlice';
import defaultChannel from '../../../utils/defaultChannel';
import ChannelsPlaceHolder from './placeholders/ChannelsPlaceHolder';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: channels, error, isLoading } = useGetChannelsQuery();
  const activeChannel = useSelector((state) => state.activeChannel.active);

  if (isLoading) return (<ChannelsPlaceHolder />);

  if (error) {
    toast.error(t('chatPage.errors.channelsReqError'));
    return (<ChannelsPlaceHolder />);
  }

  const existingChannelsIds = channels.map((c) => c.id);
  if (!existingChannelsIds.includes(activeChannel.id)) {
    dispatch(setCurChannel(defaultChannel));
  }

  return (
    <>
      <Row className="mx-3">
        <ChannelsListHeader />
      </Row>
      <Nav className="flex-column">
        {
          channels.map(({ id, name, removable }) => (
            <ChannelItem
              id={id}
              name={name}
              removable={removable}
              isActive={id === activeChannel.id}
              key={id}
            />
          ))
        }
      </Nav>
    </>
  );
};

export default Channels;
