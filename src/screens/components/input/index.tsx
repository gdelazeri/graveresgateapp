import { TextInput } from "react-native-paper";
import TextInputMask, { TextInputMaskProps } from 'react-native-text-input-mask';
import { LabelSizeValue } from "../../../screens/components/label";
import fonts from "../../../theme/fonts";
import colors from "../../../theme/colors";


interface InputProps {
  placeholder: string
  label: string
  value: string
  onChangeText: (newValue: string) => void
  isPassword?: boolean
}

const Input = ({
  placeholder,
  label,
  value,
  onChangeText,
  isPassword = false,
}: InputProps) => (
  <TextInput
    placeholder={placeholder}
    label={label}
    value={value}
    onChangeText={onChangeText}
    mode={'outlined'}
    style={{ backgroundColor: colors.Greyscale.b100, fontSize: LabelSizeValue.medium, fontFamily: fonts.regular }}
    outlineColor={colors.Greyscale.b80}
    activeOutlineColor={colors.Greyscale.b50}
  />
);

export default Input;