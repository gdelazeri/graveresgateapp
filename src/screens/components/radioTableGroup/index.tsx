import { isString } from "@utils/stringHelper";
import Label from "../label";
import Styled from "./styles";
import ButtonGroup from "../buttonGroup";

interface RadioTableGroupProps {
  label: string;
  items: string[];
  options: string[];
  selectedValue?: { item: string; option: string }[];
  onChangeValue: (item: string, option: string) => void;
  testID?: string;
  invalid?: boolean;
  invalidText?: string;
}

const RadioTableGroup = ({
  label,
  items,
  options,
  selectedValue,
  onChangeValue,
  testID,
  invalid = false,
  invalidText,
}: RadioTableGroupProps) => {
  return (
    <Styled.Container testID={testID}>
      <Label size={"small"}>{label}</Label>
      {items.map((item) => (
        <Styled.Item key={item}>
          <Styled.ItemLabel>
            <Label size={"medium"} noMarginBottom>
              {item}
            </Label>
          </Styled.ItemLabel>
          <ButtonGroup
            options={options}
            selectedOption={
              selectedValue?.find((value) => value.item === item)?.option
            }
            onPressItem={(index: number) => onChangeValue(item, options[index])}
          />
        </Styled.Item>
      ))}
      {invalid && isString(invalidText) && (
        <Styled.ErrorText>{invalidText}</Styled.ErrorText>
      )}
    </Styled.Container>
  );
};

export default RadioTableGroup;
