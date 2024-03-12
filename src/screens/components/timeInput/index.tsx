import moment from "moment";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Label from "@screens/components/label";
import { isString } from "@utils/stringHelper";
import Styled from "./styles";
import { View } from "react-native";

interface TimeInputProps {
  label: string;
  value: string;
  onChangeValue: (newValue: string) => void;
}

const TimeInput = ({
  label,
  value,
  onChangeValue,
}: TimeInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = (date: Date) => {
    onChangeValue(moment(date).format('HH:mm'));
    setIsVisible(false);
  };

  const date = value ? moment(value, 'HH:mm').toDate() : new Date();

  return (
    <View>
      <Label size={'small'}>{label}</Label>
      <Styled.Container isFocused={isVisible} onPress={() => setIsVisible(!isVisible)}>
        {isString(value) && <Styled.TextDate>{value}</Styled.TextDate>}
        {!isString(value) && <Styled.TextDatePlaceholder>-</Styled.TextDatePlaceholder>}
      </Styled.Container>
      <DateTimePickerModal
        locale={'pt'}
        isVisible={isVisible}
        mode={'time'}
        onConfirm={handleConfirm}
        onCancel={() => setIsVisible(false)}
        minuteInterval={5}
        date={date}
      />
    </View>
  );
};

export default TimeInput;
