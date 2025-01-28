/* eslint-disable react/jsx-props-no-spreading */
import {
  Modal, Form, Button, FloatingLabel,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setCurChannel } from '../../../store/slices/activeChannelSlice';
import { useGetChannelsQuery, useAddChannelMutation } from '../../../store/services/chatApi';

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

  const handleAddChannel = async (channelName) => {
    const toastId = toast(t('modals.addForm.loading'), { autoClose: false });
    try {
      setFormState('sending');
      const newChannel = await addChannel(channelName).unwrap();
      dispatch(setCurChannel(newChannel));
      toast.update(toastId, {
        render: t('modals.addForm.success'),
        autoClose: 2000,
        type: 'success',
      });
    } catch (err) {
      toast.update(toastId, {
        render: t('modals.errors.network'),
        autoClose: 2000,
        type: 'warn',
      });
    }
  };

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: Yup.object({
      channelName: Yup.string()
        .required(t('modals.errors.required'))
        .min(3, t('modals.errors.short'))
        .max(20, t('modals.errors.long'))
        .notOneOf([existingChannelNames], t('modals.errors.alreadyExists')),
    }),
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
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelName}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button
            className="mt-3"
            variant="secondary"
            onClick={handleCloseModal}
          >
            {t('modals.addForm.cancelButton')}
          </Button>
          <Button
            className="mt-3"
            type="submit"
            disabled={formState.state !== 'idle'}
          >
            {t('modals.addForm.submitButton')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChannelAdd;
