import {
  DropdownButton,
  Dropdown,
  ButtonGroup,
  Button,
  Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/slices/modalSlice';
import { setCurChannel } from '../../../store/slices/activeChannelSlice';

const ChannelItem = ({
  id,
  name,
  removable,
  isActive,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOpenModal = (channel) => (type) => {
    dispatch(openModal({ type, channel }));
  };

  const setChannelActive = () => {
    dispatch(setCurChannel({ id, name, removable }));
  };

  const variant = isActive ? 'secondary' : 'light';

  return (
    <Nav.Item key={id} className="w-100">
      {removable
        ? (
          <ButtonGroup className="d-flex">
            <Button
              className="w-100 text-start text-truncate"
              variant={variant}
              onClick={setChannelActive}
            >
              {`# ${name}`}
            </Button>
            <DropdownButton variant={variant} onSelect={handleOpenModal({ id, name })}>
              <Dropdown.Item eventKey="remove">{t('chatPage.channelItem.removeButton')}</Dropdown.Item>
              <Dropdown.Item eventKey="edit">{t('chatPage.channelItem.editButton')}</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        )
        : (
          <Button
            className="w-100 text-start"
            variant={variant}
            onClick={setChannelActive}
          >
            {`# ${name}`}
          </Button>
        )}
    </Nav.Item>
  );
};

export default ChannelItem;
