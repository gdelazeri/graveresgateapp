import { useState } from "react";
import { TextInput } from "react-native-paper";
import { KeyboardType } from "react-native";
import { mask } from "react-native-mask-text";
import { LabelSizeValue } from "@screens/components/label";
import fonts from "@theme/fonts";
import colors from "@theme/colors";
import { isString } from "@utils/stringHelper";
import Styled from "./styles";

export enum INPUT_TYPE {
  DEFAULT,
  NAME,
  EMAIL,
  PHONE,
  PASSWORD,
}

interface InputProps {
  placeholder: string;
  label: string;
  value: string;
  onChangeText: (newValue: string) => void;
  type?: INPUT_TYPE;
  testID?: string;
  invalid?: boolean;
  invalidText?: string;
}

const Input = ({
  placeholder,
  label,
  value,
  onChangeText,
  type = INPUT_TYPE.DEFAULT,
  testID,
  invalid = false,
  invalidText,
}: InputProps) => {
  const [isSecureTextEnabled, setIsSecureTextEnabled] = useState(true);
  const [isFocused, setIsFocused] = useState(true);

  const secureTextEntry = type === INPUT_TYPE.PASSWORD && isSecureTextEnabled;
  const isInvalid = invalid && !isFocused;

  let keyboardType: KeyboardType = "default";
  switch (type) {
    case INPUT_TYPE.EMAIL:
      keyboardType = "email-address";
      break;
    case INPUT_TYPE.PHONE:
      keyboardType = "phone-pad";
      break;
  }

  return (
    <>
      <TextInput
        testID={testID}
        placeholder={placeholder}
        label={label}
        value={
          type === INPUT_TYPE.PHONE ? mask(value, "(99) 99999-9999") : value
        }
        onChangeText={onChangeText}
        mode={"outlined"}
        style={{
          backgroundColor: colors.Greyscale.b100,
          fontSize: LabelSizeValue.medium,
          fontFamily: fonts.regular,
        }}
        outlineColor={isInvalid ? colors.red : colors.Greyscale.b80}
        activeOutlineColor={isInvalid ? colors.red : colors.Greyscale.b50}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={
          type === INPUT_TYPE.EMAIL || type === INPUT_TYPE.PASSWORD
            ? "none"
            : "sentences"
        }
        right={
          type === INPUT_TYPE.PASSWORD && (
            <TextInput.Icon
              onPress={() => setIsSecureTextEnabled(!isSecureTextEnabled)}
              icon={secureTextEntry ? "eye-outline" : "eye-off-outline"}
              color={colors.Greyscale.b50}
              testID="icon-secure-entry"
            />
          )
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isInvalid && isString(invalidText) && (
        <Styled.ErrorText>{invalidText}</Styled.ErrorText>
      )}
    </>
  );
};

export default Input;
