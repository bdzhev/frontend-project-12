import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from '../../../store/slices/modalSlice';
import { useFormik } from "formik";

const ModalChannelRemove = () => {
  // to do - in headers name = use the passed modals type to access the translation
  const { type, channel } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const onHide = () => dispatch(closeModal());
  const formik = useFormik({
    initialValues: { channelName: ''}
  })
  return (
    <Modal show={type === 'add'} onHide={onHide}>
      <Modal.Header>
        {'Редактировать/ Добавить канал'}
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
    </Modal>
  )
};

export default ModalChannelRemove;
