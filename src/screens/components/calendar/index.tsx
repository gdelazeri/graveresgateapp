import XDate from 'xdate'
import { Calendar as RNCalendar } from 'react-native-calendars'
import { calendarTheme } from "./types";
import { DateData } from 'react-native-calendars/src/types';

type MarkedDatesType = {
  [key: string]: {
    disabled: boolean;
    disableTouchEvent: boolean;
  }
};

interface CalendarProps {
  visible: boolean;
  value: string;
  onChangeValue: (newValue: string) => void;
  onClose: () => void;
  markedDates?: MarkedDatesType;
  onVisibleMonthsChange?: (months: DateData[]) => void;
}

const Calendar = ({ visible, value, onChangeValue, onClose, markedDates, onVisibleMonthsChange }: CalendarProps) => {
  if (!visible) return null

  return (
    <RNCalendar
      current={value ? new XDate(value) : undefined}
      onDayPress={day => {
        onClose()
        onChangeValue(day.dateString)
      }}
      enableSwipeMonths={true}
      theme={calendarTheme}
      testID="calendar"
      onVisibleMonthsChange={onVisibleMonthsChange}
      markedDates={markedDates}
    />
  )
}

export default Calendar;
