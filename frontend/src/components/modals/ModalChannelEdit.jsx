/* eslint-disable react/jsx-props-no-spreading */
import {
  Modal, Form, Button, FloatingLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { activeChannelSelector, setCurChannel } from '../../../store/slices/activeChannelSlice';
import { useGetChannelsQuery, useEditChannelMutation } from '../../../store/services/chatApi';

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
    inputRef.current.focus();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: { newChannelName: channel.name },
    validationSchema: Yup.object({
      newChannelName: Yup.string()
        .required(t('modals.errors.required'))
        .min(3, t('modals.errors.short'))
        .max(20, t('modals.errors.long'))
        .notOneOf([existingChannelNames], t('modals.errors.alreadyExists')),
    }),
    onSubmit: async (values) => {
      const toastId = toast(t('modals.editForm.loading'), { autoClose: false });
      setFormState('pending');
      try {
        await editChannel({ id: channel.id, name: values.newChannelName });
        if (activeChannel.id === channel.id) {
          dispatch(setCurChannel({ ...channel, name: values.newChannelName }));
        }
        toast.update(toastId, {
          render: t('modals.editForm.success'),
          type: 'success',
          autoClose: 2000,
        });
        handleCloseModal();
      } catch {
        toast.update(toastId, {
          render: t('modals.errors.network'),
          type: 'warn',
          autoClose: 2000,
        });
      }
      setFormState('idle');
    },
  });

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        Переименовать канал
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FloatingLabel
            controlId="channelName"
            label={t('modals.editForm.label')}
            className="mb-3"
          >
            <Form.Control
              id="newChannelName"
              type="text"
              ref={inputRef}
              isInvalid={formik.touched.newChannelName
                && formik.errors.newChannelName}
              {...formik.getFieldProps('newChannelName')}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.newChannelName}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button
            className="mt-3"
            variant="secondary"
            onClick={handleCloseModal}
            disabled={formState !== 'idle'}
          >
            {t('modals.editForm.cancelButton')}
          </Button>
          <Button
            className="mt-3"
            type="submit"
            disabled={formState !== 'idle'}
          >
            {t('modals.editForm.submitButton')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChannelEdit;
