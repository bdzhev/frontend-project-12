import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../../store/services/chatApi';
import { setCurChannel } from '../../../store/slices/activeChannelSlice';
import defaultChannel from '../../../utils/defaultChannel';

const ModalChannelRemove = ({ closeModal }) => {
  const [formState, setFormState] = useState('idle');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());

  const channelId = useSelector((state) => state.modal.channel.id);
  const [removeChannel] = useRemoveChannelMutation();
  const handleRemoveChannel = async () => {
    const toastId = toast(t('modals.removeForm.loading'), { autoClose: false });
    setFormState('pending');
    try {
      dispatch(setCurChannel(defaultChannel));
      await removeChannel(channelId);
      handleCloseModal();
      toast.update(toastId, { render: t('modals.removeForm.success'), autoClose: 2000, type: 'success' });
    } catch {
      toast.update(toastId, { render: t('modals.errors.network'), autoClose: 2000, type: 'warn' });
    }
    setFormState('idle');
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
          disabled={formState !== 'idle'}
        >
          {t('modals.removeForm.cancelButton')}
        </Button>
        <Button
          className="mt-3"
          variant="danger"
          onClick={handleRemoveChannel}
          disabled={formState !== 'idle'}
        >
          {t('modals.removeForm.submitButton')}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChannelRemove;
