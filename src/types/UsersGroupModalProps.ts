type UsersGroupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  groupUsers: { id: string; name: string }[];
};

export default UsersGroupModalProps;