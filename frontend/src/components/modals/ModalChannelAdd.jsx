/* eslint-disable react/jsx-props-no-spreading */
import {
  Modal, Form, Button, FloatingLabel,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setCurChannel } from '../../../store/slices/activeChannelSlice';
import { useGetChannelsQuery, useAddChannelMutation } from '../../../store/services/chatApi';
import schemas from '../../../utils/validationSchemas';

const ModalChannelAdd = ({ closeModal }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());
  const [addChannel] = useAddChannelMutation();
  const { data: existingChannels } = useGetChannelsQuery();
  const existingChannelNames = existingChannels.map((c) => c.name);
  const [formState, setFormState] = useState({ state: 'idle' });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddChannel = (channelName) => {
    const toastId = toast(t('modals.addForm.loading'), { autoClose: false });
    setFormState('sending');
    addChannel(channelName)
      .unwrap()
      .then((newChannel) => {
        dispatch(setCurChannel(newChannel));
        toast.update(toastId, {
          render: t('modals.addForm.success'),
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

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: schemas.modal.editAddModals(t, existingChannelNames),
    onSubmit: async ({ channelName }) => {
      handleAddChannel(channelName);
      handleCloseModal();
    },
  });

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        {t('modals.addForm.headerLabel')}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FloatingLabel
            controlId="channelName"
            label={t('modals.addForm.label')}
            className="mb-3"
          >
            <Form.Control
              id="channelName"
              type="text"
              ref={inputRef}
              {...formik.getFieldProps('channelName')}
              isInvalid={formik.touched.channelName && formik.errors.channelName}
            />
            <Form.Control.Feedback tooltip type="invalid">
              {formik.errors.channelName}
            </Form.Control.Feedback>
          </FloatingLabel>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="secondary"
              onClick={handleCloseModal}
            >
              {t('modals.addForm.cancelButton')}
            </Button>
            <Button
              type="submit"
              disabled={formState.state !== 'idle'}
            >
              {t('modals.addForm.submitButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChannelAdd;
