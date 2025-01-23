import { Modal, Form, Button} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useAddChannelMutation } from "../../../store/services/chatApi";
import * as Yup from 'yup';
import { useRef, useEffect } from "react";

/*
TODO
Add check for existing channel names
*/

const ModalChannelAdd = ({ closeModal }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());
  const [addChannel] = useAddChannelMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const formik = useFormik({
    initialValues: { channelName: ''},
    validationSchema: Yup.object({
      channelName: Yup.string()
      .required('Required'),
    }),
    onSubmit: (values) => {
      addChannel(values.channelName);
      handleCloseModal();
    },
  });

  return (
    <Modal show={true} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        {'Добавить канал'}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="channelName">Название нового канала</Form.Label>
            <Form.Control
              id="channelName"
              type="text"
              ref={inputRef}
              {...formik.getFieldProps('channelName')}
            />
          </Form.Group>
          <Button className="mt-3" variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button className="mt-3" type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
};

export default ModalChannelAdd;
