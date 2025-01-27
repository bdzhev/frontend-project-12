import ModalChannelAdd from './ModalChannelAdd';
import ModalChannelEdit from './ModalChannelEdit';
import ModalChannelRemove from './ModalChannelRemove';
import { closeModal } from '../../../store/slices/modalSlice';

const modals = {
  add: () => <ModalChannelAdd closeModal={closeModal} />,
  edit: () => <ModalChannelEdit closeModal={closeModal} />,
  remove: () => <ModalChannelRemove closeModal={closeModal} />,
};

export default modals;
