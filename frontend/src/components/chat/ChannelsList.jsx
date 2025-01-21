import { useGetChannelsQuery } from '../../../store/services/chatApi';
import { Row, Nav, DropdownButton, Dropdown, NavDropdown, ButtonGroup, Button } from 'react-bootstrap';
import { openModal } from "../../../store/slices/modalSlice";
import { useDispatch } from "react-redux";
import Loading from "../Loading";
import ChannelsListHeader from './ChannelsListHeader';

const renderChannel = (handleOpenModal) => ({ id, name, removable }) => (
  <Nav.Item key={id} className='w-100'>
    {!!removable 
    ? (
      <ButtonGroup className='d-flex'>
      <Button className='w-100 text-start text-truncate' variant='light'>{`# ${name}`}</Button>
      <DropdownButton variant='light' onSelect={handleOpenModal({id, name})}>
        <Dropdown.Item eventKey='remove'>Удалить</Dropdown.Item>
        <Dropdown.Item eventKey='edit'>Переименовать</Dropdown.Item>
      </DropdownButton>
    </ButtonGroup>
    )
    :(
      <Button className='w-100 text-start' variant='light'>{`# ${name}`}</Button>
    )}
  </Nav.Item>
);

const Channels = () => {
  const dispatch = useDispatch();
  const handleOpenModal = (channel) => (type) => {
    dispatch(openModal({ type, channel }));
  }
  const { data, error, isLoading, refetch } = useGetChannelsQuery();
  if (isLoading) return (<Loading />);
  if (error) return (<h1>Error while trying to get data</h1>);

  return (
    <>
      <Row className='mx-4'>
        <ChannelsListHeader />
      </Row>
      <Nav className='flex-column'>
        {data.map(renderChannel(handleOpenModal))}
      </Nav>
    </>
  )
};

export default Channels;
