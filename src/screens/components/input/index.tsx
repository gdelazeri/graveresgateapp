import { useState } from "react";
import { KeyboardType } from "react-native";
import { mask } from "react-native-mask-text";
import { Icon } from "react-native-elements";
import Label from "@screens/components/label";
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
      <Label size={'small'}>{label}</Label>
      <Styled.Container>
        <Styled.TextInput
          testID={testID}
          placeholder={placeholder}
          value={
            type === INPUT_TYPE.PHONE ? mask(value, "(99) 99999-9999") : value
          }
          type={type}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={
            type === INPUT_TYPE.EMAIL || type === INPUT_TYPE.PASSWORD
              ? "none"
              : "sentences"
          }
          isInvalid={isInvalid}
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {type === INPUT_TYPE.PASSWORD && (
          <Styled.IconContainer onPress={() => setIsSecureTextEnabled(!isSecureTextEnabled)}>
            <Icon
              name={secureTextEntry ? "visibility" : "visibility-off"}
              color={colors.Greyscale.b50}
              testID="icon-secure-entry"
            />
          </Styled.IconContainer>
        )}
      </Styled.Container>
      {isInvalid && isString(invalidText) && (
        <Styled.ErrorText>{invalidText}</Styled.ErrorText>
      )}
    </>
  );
};

export default Input;
