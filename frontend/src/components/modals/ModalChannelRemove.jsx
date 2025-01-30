import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../../store/services/chatApi';
import { setCurChannel, activeChannelSelector } from '../../../store/slices/activeChannelSlice';
import defaultChannel from '../../../utils/defaultChannel';

const ModalChannelRemove = ({ closeModal }) => {
  const [formState, setFormState] = useState('idle');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());
  const activeChannel = useSelector(activeChannelSelector);
  const channelId = useSelector((state) => state.modal.channel.id);
  const [removeChannel] = useRemoveChannelMutation();
  const handleRemoveChannel = () => {
    const toastId = toast(t('modals.removeForm.loading'), { autoClose: false });
    setFormState('pending');
    removeChannel(channelId)
      .unwrap()
      .then(() => {
        if (activeChannel.id === channelId) {
          dispatch(setCurChannel(defaultChannel));
        }
        toast.update(toastId, {
          render: t('modals.removeForm.success'),
          autoClose: 2000,
          type: 'success',
        });
      })
      .catch(() => {
        toast.update(toastId, {
          render: t('modals.errors.network'),
          autoClose: 2000,
          type: 'error',
        });
      })
      .finally(() => {
        handleCloseModal();
      });
  };

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        {t('modals.removeForm.headerLabel')}
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            onClick={handleCloseModal}
            disabled={formState !== 'idle'}
          >
            {t('modals.removeForm.cancelButton')}
          </Button>
          <Button
            variant="danger"
            onClick={handleRemoveChannel}
            disabled={formState !== 'idle'}
          >
            {t('modals.removeForm.submitButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChannelRemove;
