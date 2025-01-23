import { useDispatch } from "react-redux";
import { openModal } from "../../../store/slices/modalSlice";
import { setCurChannel } from '../../../store/slices/activeChannelSlice';
import { DropdownButton, Dropdown, ButtonGroup, Button, Nav } from 'react-bootstrap';

const ChannelItem = ({ id, name, removable }) => {
  const dispatch = useDispatch();
  const handleOpenModal = (channel) => (type) => {
    dispatch(openModal({ type, channel }));
  };

  const setChannelActive = () => {
    dispatch(setCurChannel({ id, name, removable }));
  };

  return (
  <Nav.Item key={id} className='w-100'>
    {!!removable 
    ? (
      <ButtonGroup className='d-flex'>
      <Button
        className='w-100 text-start text-truncate'
        variant='light'
        onClick={setChannelActive}
      >
        {`# ${name}`}
      </Button>
      <DropdownButton variant='light' onSelect={handleOpenModal({id, name})}>
        <Dropdown.Item eventKey='remove'>Удалить</Dropdown.Item>
        <Dropdown.Item eventKey='edit'>Переименовать</Dropdown.Item>
      </DropdownButton>
    </ButtonGroup>
    )
    :(
      <Button
        className='w-100 text-start'
        variant='light'
        onClick={setChannelActive}
      >
        {`# ${name}`}
      </Button>
    )}
  </Nav.Item>
  );
};

export default ChannelItem;