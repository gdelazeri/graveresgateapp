import { isString } from "@utils/stringHelper";
import RadioButtonChecked from "../icons/radioChecked";
import colors from "@theme/colors";
import Label from "../label";
import Styled from "./styles";
import RadioButtonUnchecked from "../icons/radioUnchecked";

interface RadioGroupProps {
  label: string;
  items: { label: string; value: string }[];
  selectedValue?: string | string[];
  onChangeValue: (newValue: string | string[]) => void;
  testID?: string;
  invalid?: boolean;
  invalidText?: string;
  multiple?: boolean;
}

const RadioGroup = ({
  label,
  items,
  selectedValue,
  onChangeValue,
  testID,
  invalid = false,
  invalidText,
  multiple = false,
}: RadioGroupProps) => {
  const onSelectValue = (value: string) => {
    if (multiple && Array.isArray(selectedValue)) {
      if (selectedValue.includes(value)) {
        onChangeValue(selectedValue.filter((item) => item !== value));
      } else {
        onChangeValue([...selectedValue, value]);
      }
    } else {
      onChangeValue(value);
    }
  }

  const isChecked = (value: string) => {
    if (multiple && Array.isArray(selectedValue)) {
      return selectedValue.includes(value);
    } else {
      return selectedValue === value;
    }
  }

  return (
    <Styled.Container testID={testID}>
      <Label size={'small'}>{label}</Label>
      {items.map((item) => (
        <Styled.Item key={item.value} onPress={() => onSelectValue(item.value)}>
          {isChecked(item.value) ? <RadioButtonChecked size={20} color={colors.red} /> : <RadioButtonUnchecked size={20} color={colors.red} />}
          <Styled.ItemLabel>
            <Label size={'medium'}>{item.label}</Label>
          </Styled.ItemLabel>
        </Styled.Item>
      ))}
      {invalid && isString(invalidText) && (
        <Styled.ErrorText>{invalidText}</Styled.ErrorText>
      )}
    </Styled.Container>
  )
}

export default RadioGroup;