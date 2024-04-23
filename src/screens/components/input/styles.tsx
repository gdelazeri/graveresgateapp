import styled from "styled-components/native";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { TextInputProps } from "react-native";
import { INPUT_TYPE } from "./types";

const ErrorText = styled.Text`
  color: ${colors.red};
  font-family: ${fonts.regular};
  font-size: 14px;
  margin-top: 4px;
`;

interface CustomTextInputProps extends TextInputProps {
  isInvalid: boolean;
  isFocused: boolean;
  type: INPUT_TYPE;
}

const TextInput = styled.TextInput<CustomTextInputProps>`
  background-color: ${colors.Greyscale.b100};
  font-size: 16px;
  font-family: ${fonts.regular};
  border-width: 1px;
  border-radius: 4px;
  border-color: ${({ isInvalid, isFocused }: CustomTextInputProps) =>
    isInvalid
      ? colors.red
      : isFocused
        ? colors.Greyscale.b50
        : colors.Greyscale.b80};
  height: ${({ type }: CustomTextInputProps) =>
    type === INPUT_TYPE.TEXT ? 120 : 50}px;
  padding: 12px;
  padding-right: ${({ type }: CustomTextInputProps) =>
    type === INPUT_TYPE.PASSWORD ? 50 : 12}px;
`;

const Container = styled.View`
  margin-top: 4px;
  position: relative;
`;

const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  top: 0px;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
`;

export default {
  ErrorText,
  TextInput,
  Container,
  IconContainer,
};
