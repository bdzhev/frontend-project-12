/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Image } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAddMessageMutation } from '../../../store/services/chatApi';

const MessageForm = ({ channelId, username }) => {
  const [formState, setFormState] = useState({ state: 'idle' });
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [sendMessage] = useAddMessageMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, [channelId]);

  const handleSendMessage = (body, resetForm) => {
    setFormState({ state: 'sending' });
    sendMessage({ body, channelId, username })
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch(() => {
        toast.error(t('chatPage.messageForm.errors.network'), { autoClose: 1000 });
      })
      .finally(() => {
        setFormState({ state: 'idle' });
      });
  };

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: Yup.object({
      body: Yup.string().trim().required(),
    }),
    onSubmit: ({ body }, { resetForm }) => {
      handleSendMessage(body, resetForm);
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="d-flex flex-row">
          <Form.Control
            id="body"
            type="text"
            ref={inputRef}
            {...formik.getFieldProps('body')}
            placeholder={t('chatPage.messageForm.placeholder')}
            className="rounded"
            aria-label={t('chatPage.messageForm.arialabel')}
          />
          <Button
            type="submit"
            variant="primary"
            className="ml-1"
            disabled={!(formState.state === 'idle'
              && !formik.errors.body)}
          >
            <Image
              src="/arrow-up.svg"
              width="20px"
            />
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;
