import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useEditChannelMutation } from "../../../store/services/chatApi";
import * as Yup from 'yup';
import { useRef, useEffect } from "react";

const ModalChannelEdit = ({ closeModal }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());
  const channel = useSelector((state) => state.modal.channel);
  const [editChannel] = useEditChannelMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, [dispatch])

  const formik = useFormik({
    initialValues: { newChannelName: channel.name},
    validationSchema: Yup.object({
      newChannelName: Yup.string()
      .required('Required'),
    }),
    onSubmit: (values) => {
      editChannel({ id: channel.id, name: values.newChannelName });
      handleCloseModal();
    },
  });

  return (
    <Modal show={true} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        {'Переименовать канал'}
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="channelName">Выберите новое название для канала</Form.Label>
            <Form.Control
              id="newChannelName"
              type="text"
              ref={inputRef}
              {...formik.getFieldProps('newChannelName')}
            />
          </Form.Group>
          <Button className="mt-3" variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button className="mt-3" type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
};

export default ModalChannelEdit;
