import { useEffect, useState } from "react";
import { isString } from "@utils/stringHelper";
import RadioButtonChecked from "../icons/radioChecked";
import colors from "@theme/colors";
import Label from "../label";
import Styled from "./styles";
import RadioButtonUnchecked from "../icons/radioUnchecked";

interface RadioGroupProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValue?: string | string[];
  onChangeValue: (newValue: string | string[]) => void;
  testID?: string;
  invalid?: boolean;
  invalidText?: string;
  multiple?: boolean;
  hasOtherOption?: boolean;
}

const RadioGroup = ({
  label,
  options,
  selectedValue,
  onChangeValue,
  testID,
  invalid = false,
  invalidText,
  multiple = false,
  hasOtherOption = false
}: RadioGroupProps) => {
  const [isOtherSelected, setIsOrderSelected] = useState(false)
  const [otherText, setOtherText] = useState('')

  const onSelectValue = (value: string) => {
    if (multiple && Array.isArray(selectedValue)) {
      if (selectedValue.includes(value)) {
        onChangeValue(selectedValue.filter((item) => item !== value));
      } else {
        onChangeValue([...selectedValue, value]);
      }
    } else {
      if (!multiple && isOtherSelected) {
        setIsOrderSelected(false);
        setOtherText('')
      }
      onChangeValue(value);
    }
  }

  const isChecked = (value: string) => {
    if (multiple && Array.isArray(selectedValue)) {
      return selectedValue.includes(value);
    } else if (!isOtherSelected) {
      return selectedValue === value;
    }
    return false;
  }

  useEffect(() => {
    if (!hasOtherOption) return;

    if (multiple && Array.isArray(selectedValue)) {
      const allowedValues = selectedValue
        .map((item) => options.map((option) => option.value).includes(item) ? item : null)
        .filter((item) => item !== null) as string[];
      if (isString(otherText)) {
        onChangeValue([...allowedValues, otherText]);
      } else {
        onChangeValue([...allowedValues]);
      }
    } else {
      onChangeValue(otherText);
    }
  }, [otherText, isOtherSelected])

  useEffect(() => {
    setIsOrderSelected(isString(otherText))
  }, [otherText])

  return (
    <Styled.Container testID={testID}>
      <Label size={'small'}>{label}</Label>
      {options.map((item) => (
        <Styled.Item key={item.value} onPress={() => onSelectValue(item.value)}>
          {isChecked(item.value) ? <RadioButtonChecked size={20} color={colors.red} /> : <RadioButtonUnchecked size={20} color={colors.red} />}
          <Styled.ItemLabel>
            <Label size={'medium'}>{item.label}</Label>
          </Styled.ItemLabel>
        </Styled.Item>
      ))}
      {hasOtherOption && (
        <Styled.Item onPress={() => { setIsOrderSelected(!isOtherSelected); setOtherText("") }}>
          {isOtherSelected ? <RadioButtonChecked size={20} color={colors.red} /> : <RadioButtonUnchecked size={20} color={colors.red} />}
          <Styled.ItemLabel>
            <Label size={'medium'}>Outro:</Label>
            <Styled.InputOther
              placeholder="Digite aqui..."
              value={otherText}
              onChangeText={(text: string) => setOtherText(text)}
            />
          </Styled.ItemLabel>
        </Styled.Item>
      )}
      {invalid && isString(invalidText) && (
        <Styled.ErrorText>{invalidText}</Styled.ErrorText>
      )}
    </Styled.Container>
  )
}

export default RadioGroup;