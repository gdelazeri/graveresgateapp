import { useState } from "react";
import RNPickerSelect from 'react-native-picker-select';
import Label from "@screens/components/label";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import Styled from "./styles";
import { isString } from "@utils/stringHelper";

interface SelectProps {
  placeholder: string;
  items: { label: string; value: string }[];
  label: string;
  value: string | null;
  onChangeValue: (newValue: string | null) => void;
  invalid?: boolean;
  invalidText?: string;
}

const Select = ({
  placeholder,
  items,
  label,
  value,
  onChangeValue,
  invalid = false,
  invalidText,
}: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <Label size={'small'}>{label}</Label>
      <Styled.Container>
        <RNPickerSelect
          onOpen={() => setIsFocused(true)}
          onClose={() => setIsFocused(false)}
          placeholder={{ label: placeholder, value: null }}
          value={value}
          onValueChange={(value) => onChangeValue(value)}
          items={items}
          style={{
            inputIOS: {
              backgroundColor: colors.Greyscale.b100,
              fontSize: 16,
              fontFamily: fonts.regular,
              color: colors.black,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: isFocused ? colors.Greyscale.b50 : colors.Greyscale.b80,
              height: 50,
              padding: 12,
            },
            inputAndroid: {
              backgroundColor: colors.Greyscale.b100,
              fontSize: 16,
              fontFamily: fonts.regular,
              color: colors.black,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: isFocused ? colors.Greyscale.b50 : colors.Greyscale.b80,
              height: 50,
              padding: 12,
            },
            placeholder: {
              fontSize: 16,
              fontFamily: fonts.regular,
              color: colors.Greyscale.b60
            }
          }}
        />
      {invalid && isString(invalidText) && (
        <Styled.ErrorText>{invalidText}</Styled.ErrorText>
      )}
      </Styled.Container>
    </>
  );
};

export default Select;
