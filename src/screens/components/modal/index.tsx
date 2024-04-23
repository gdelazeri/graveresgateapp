import { Overlay } from "react-native-elements";
import colors from "@theme/colors";
import CloseIcon from "@screens/components/icons/close";
import Styled from "./styles";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => (
  <Overlay
    isVisible={isOpen}
    onBackdropPress={onClose}
    overlayStyle={{ width: "90%", top: -100, padding: 16 }}
  >
    <>
      {children}
      <Styled.IconButton onPress={onClose}>
        <CloseIcon color={colors.Greyscale.b80} />
      </Styled.IconButton>
    </>
  </Overlay>
);

export default Modal;
