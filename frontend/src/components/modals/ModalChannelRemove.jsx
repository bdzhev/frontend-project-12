import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRemoveChannelMutation } from "../../../store/services/chatApi";
import { setCurChannel } from '../../../store/slices/activeChannelSlice';
import { defaultChannel } from "../../../utils/defaultChannel";

const ModalChannelRemove = ({ closeModal }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());

  const channelId = useSelector((state) => state.modal.channel.id);
  const [removeChannel] = useRemoveChannelMutation();
  const handleRemoveChannel = () => {
    dispatch(setCurChannel(defaultChannel));
    removeChannel(channelId);
    handleCloseModal();
  };

  return (
    <Modal show={true} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        {'Удалить канал'}
      </Modal.Header>
      <Modal.Body>
        <Button className="mt-3" onClick={handleCloseModal}>Cancel</Button>
        <Button className="mt-3" onClick={handleRemoveChannel}>Submit</Button>
      </Modal.Body>
    </Modal>
  )
};

export default ModalChannelRemove;
