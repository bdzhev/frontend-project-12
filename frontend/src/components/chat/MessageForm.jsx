import { useFormik } from "formik";
import { useAddMessageMutation } from "../../../store/services/chatApi";
import * as Yup from "yup";
import { Form, Button, Image } from "react-bootstrap";

const MessageForm = ({ channelId, username }) => {
  const [ sendMessage ] = useAddMessageMutation();
  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: Yup.object({
      body: Yup.string().required('Заполните поле'),
    }),
    onSubmit: ({ body }, { resetForm }) => {
      sendMessage({ body, channelId, username });
      resetForm();
    }
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="d-flex flex-row">
          <Form.Control
            id="body"
            type="text"
            {...formik.getFieldProps('body')}
            placeholder="Введите сообщение..."
            className="rounded"
          />
          <Button
            type="submit"
            variant="primary"
            className="ml-1"
            disabled={!formik.values.body}
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
