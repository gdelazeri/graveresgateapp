import { Overlay } from "react-native-elements";
import colors from "@theme/colors";
import Styled from "./styles";
import ClearIcon from "../icons/clear";

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
        <ClearIcon color={colors.Greyscale.b50} />
      </Styled.IconButton>
    </>
  </Overlay>
);

export default Modal;
