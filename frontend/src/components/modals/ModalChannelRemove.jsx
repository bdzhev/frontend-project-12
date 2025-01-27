import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRemoveChannelMutation } from '../../../store/services/chatApi';
import { setCurChannel } from '../../../store/slices/activeChannelSlice';
import defaultChannel from '../../../utils/defaultChannel';

const ModalChannelRemove = ({ closeModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());

  const channelId = useSelector((state) => state.modal.channel.id);
  const [removeChannel] = useRemoveChannelMutation();
  const handleRemoveChannel = () => {
    dispatch(setCurChannel(defaultChannel));
    removeChannel(channelId);
    handleCloseModal();
  };

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        {t('modals.removeForm.headerLabel')}
      </Modal.Header>
      <Modal.Body>
        <Button
          className="mt-3"
          variant="secondary"
          onClick={handleCloseModal}
        >
          {t('modals.removeForm.cancelButton')}
        </Button>
        <Button
          className="mt-3"
          variant="danger"
          onClick={handleRemoveChannel}
        >
          {t('modals.removeForm.submitButton')}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChannelRemove;
