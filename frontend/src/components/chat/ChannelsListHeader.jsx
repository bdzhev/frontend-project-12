import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { openModal } from '../../../store/slices/modalSlice';
import '../../main.scss';

const ChannelsListHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleAddModal = () => {
    dispatch(openModal({ type: 'add', channel: null }));
  };
  return (
    <div className="d-flex w-100 py-4 px-0 align-items-center">
      <b>{t('chatPage.channelsList.header')}</b>
      <Button size="sm" variant="outline-primary" className="ms-auto" onClick={handleAddModal}>+</Button>
    </div>
  );
};

export default ChannelsListHeader;
