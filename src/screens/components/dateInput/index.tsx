import moment from "moment";
import { useState } from "react";
import Label from "@screens/components/label";
import Styled from "./styles";
import { isString } from "@utils/stringHelper";
import DutyCalendar from "../dutyCalendar";
import Calendar from "../calendar";

interface DateInputProps {
  placeholder: string;
  label: string;
  value: string;
  onChangeValue: (newValue: string) => void;
  type: 'duty' | 'normal';
}

const DateInput = ({
  placeholder,
  label,
  value,
  onChangeValue,
  type,
}: DateInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const CalendarComponent = type === 'duty' ? DutyCalendar : Calendar;

  return (
    <>
      <Label size={'small'}>{label}</Label>
      <Styled.Container isFocused={isVisible} onPress={() => setIsVisible(!isVisible)}>
        {isString(value) && <Styled.TextDate>{moment(value).format('LL')}</Styled.TextDate>}
        {!isString(value) && <Styled.TextDatePlaceholder>{placeholder}</Styled.TextDatePlaceholder>}
      </Styled.Container>
      <CalendarComponent
        visible={isVisible}
        onChangeValue={onChangeValue}
        value={value}
        onClose={() => setIsVisible(false)}
      />
    </>
  );
};

export default DateInput;
