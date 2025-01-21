import { useDispatch } from "react-redux";
import { openModal } from "../../../store/slices/modalSlice";
import { Button } from "react-bootstrap";

const ChannelsListHeader = () => {
  const dispatch = useDispatch();
  const handleAddModal = () => {
    dispatch(openModal({ type:'add', channel: null }));
  }
  return (
    <div className="d-flex w-100 justify-content-between p-4">
      <b>Каналы</b>
      <Button size="sm" variant='outline-primary' className='p-0' onClick={handleAddModal}>{' + '}</Button>
    </div>
  );
};

export default ChannelsListHeader;
