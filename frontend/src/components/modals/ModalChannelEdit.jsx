/* eslint-disable react/jsx-props-no-spreading */
import {
  Modal, Form, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { activeChannelSelector, setCurChannel } from '../../../store/slices/activeChannelSlice';
import { useGetChannelsQuery, useEditChannelMutation } from '../../../store/services/chatApi';
import schemas from '../../../utils/validationSchemas';

const ModalChannelEdit = ({ closeModal }) => {
  const [formState, setFormState] = useState('idle');
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());
  const channel = useSelector((state) => state.modal.channel);
  const activeChannel = useSelector(activeChannelSelector);
  const [editChannel] = useEditChannelMutation();
  const { data: existingChannels } = useGetChannelsQuery();
  const existingChannelNames = existingChannels.map((c) => c.name);

  useEffect(() => {
    inputRef.current.select();
  }, [dispatch]);

  const handleAddChannel = (channelName) => {
    const toastId = toast(t('modals.editForm.loading'), { autoClose: false });
    setFormState('pending');
    editChannel({ id: channel.id, name: channelName })
      .unwrap()
      .then(() => {
        if (activeChannel.id === channel.id) {
          dispatch(setCurChannel({ ...channel, name: channelName }));
        }
        toast.update(toastId, {
          render: t('modals.editForm.success'),
          type: 'success',
          autoClose: 2000,
        });
      })
      .catch(() => {
        toast.update(toastId, {
          render: t('modals.errors.network'),
          type: 'error',
          autoClose: 2000,
        });
      })
      .finally(() => {
        handleCloseModal();
      });
  };

  const formik = useFormik({
    initialValues: { channelName: channel.name },
    validationSchema: schemas.modal.editAddModals(t, existingChannelNames),
    onSubmit: ({ channelName }) => handleAddChannel(channelName.trim()),
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        {t('modals.editForm.headerLabel')}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden" htmlFor="channelName">
              {t('modals.editForm.label')}
            </Form.Label>
            <Form.Control
              id="channelName"
              type="text"
              ref={inputRef}
              isInvalid={formik.touched.channelName
                && formik.errors.channelName}
              {...formik.getFieldProps('channelName')}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelName}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-4">
              <Button
                className="me-2"
                variant="secondary"
                onClick={handleCloseModal}
              >
                {t('modals.editForm.cancelButton')}
              </Button>
              <Button
                type="submit"
                disabled={formState !== 'idle'}
              >
                {t('modals.editForm.submitButton')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChannelEdit;
