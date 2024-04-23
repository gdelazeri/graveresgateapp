import { useMemo, useState } from "react";
import { KeyboardType } from "react-native";
import { mask } from "react-native-mask-text";
import { Icon } from "react-native-elements";
import Label from "@screens/components/label";
import colors from "@theme/colors";
import { isString } from "@utils/stringHelper";
import Styled from "./styles";
import { INPUT_TYPE } from "./types";

interface InputProps {
  placeholder?: string;
  label?: string;
  value: string | null | undefined;
  onChangeText: (newValue: string) => void;
  type?: INPUT_TYPE;
  testID?: string;
  invalid?: boolean;
  invalidText?: string;
  maxLength?: number;
  autoFocus?: boolean;
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
  maxLength,
  autoFocus = false,
}: InputProps) => {
  const [isSecureTextEnabled, setIsSecureTextEnabled] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const secureTextEntry = type === INPUT_TYPE.PASSWORD && isSecureTextEnabled;
  const isInvalid = invalid && !isFocused;

  let keyboardType: KeyboardType = "default";
  switch (type) {
    case INPUT_TYPE.EMAIL:
      keyboardType = "email-address";
      break;
    case INPUT_TYPE.PHONE:
    case INPUT_TYPE.DATE:
      keyboardType = "phone-pad";
      break;
    case INPUT_TYPE.NUMERIC:
      keyboardType = "numeric";
      break;
  }

  const textInputValue = useMemo(() => {
    if (!isString(value)) return "";

    switch (type) {
      case INPUT_TYPE.PHONE:
        return mask(String(value), "(99) 99999-9999");
      case INPUT_TYPE.DATE:
        return mask(String(value), "99/99/9999");
      default:
        return value;
    }

  }, [value, type])

  return (
    <>
      {isString(label) && <Label size={'small'}>{label}</Label>}
      <Styled.Container>
        <Styled.TextInput
          testID={testID}
          placeholder={placeholder}
          placeholderTextColor={colors.Greyscale.b60}
          value={textInputValue}
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
          multiline={type === INPUT_TYPE.TEXT}
          maxLength={maxLength}
          autoFocus={autoFocus}
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
