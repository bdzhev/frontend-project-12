import ModalChannelAdd from "./ModalChannelAdd";
import ModalChannelEdit from "./ModalChannelEdit";
import ModalChannelRemove from "./ModalChannelRemove";

const channelModals = {
  add: () => <ModalChannelAdd />,
  edit: () => <ModalChannelEdit />,
  remove: () => <ModalChannelRemove />,
};

export default channelModals;
