/* eslint-disable react/jsx-props-no-spreading */
import {
  Modal, Form, Button, FloatingLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { activeChannelSelector, setCurChannel } from '../../../store/slices/activeChannelSlice';
import { useGetChannelsQuery, useEditChannelMutation } from '../../../store/services/chatApi';

const ModalChannelEdit = ({ closeModal }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());
  const channel = useSelector((state) => state.modal.channel);
  const activeChannel = useSelector(activeChannelSelector);
  const [editChannel] = useEditChannelMutation();
  const { data, error, isLoading } = useGetChannelsQuery();
  const existingChannelNames = data.map((c) => c.name);

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
    onSubmit: (values) => {
      editChannel({ id: channel.id, name: values.newChannelName });
      if (activeChannel.id === channel.id) {
        dispatch(setCurChannel({ ...channel, name: values.newChannelName }));
      }
      handleCloseModal();
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
          >
            {t('modals.editForm.cancelButton')}
          </Button>
          <Button
            className="mt-3"
            type="submit"
            disabled={formik.errors.newChannelName}
          >
            {t('modals.editForm.submitButton')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChannelEdit;
