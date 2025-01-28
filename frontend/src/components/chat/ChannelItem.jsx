import {
  Dropdown,
  ButtonGroup,
  Button,
  Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import filter from 'leo-profanity';
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

  const handleOpenModal = (type) => () => {
    dispatch(openModal({ type, channel: { id, name } }));
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
              className="w-100 rounded-0 text-start text-truncate"
              variant={variant}
              onClick={setChannelActive}
              name={name}
              role="button"
            >
              {`# ${filter.clean(name)}`}
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant={variant} id="channel-dropdown" className="rounded-0">
                <span className="visually-hidden">{t('chatPage.channelItem.dropdown')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleOpenModal('remove')}>{t('chatPage.channelItem.removeButton')}</Dropdown.Item>
                <Dropdown.Item onClick={handleOpenModal('edit')}>{t('chatPage.channelItem.editButton')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
        )
        : (
          <Button
            className="w-100 rounded-0 text-start text-truncate"
            variant={variant}
            onClick={setChannelActive}
            name={name}
            role="button"
          >
            {`# ${filter.clean(name)}`}
          </Button>
        )}
    </Nav.Item>
  );
};

export default ChannelItem;
