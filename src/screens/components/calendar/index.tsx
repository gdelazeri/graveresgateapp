import XDate from "xdate";
import { Calendar as RNCalendar, LocaleConfig } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";
import moment from "moment";
import { calendarTheme } from "./types";

LocaleConfig.locales["default"] = {
  monthNames: moment
    .months()
    .map((month) => month.charAt(0).toUpperCase() + month.slice(1)),
  monthNamesShort: moment.monthsShort(),
  dayNames: moment.weekdays(),
  dayNamesShort: moment.weekdaysShort(),
};

LocaleConfig.defaultLocale = "default";

type MarkedDatesType = {
  [key: string]: {
    disabled: boolean;
    disableTouchEvent: boolean;
  };
};

interface CalendarProps {
  visible: boolean;
  value: string;
  onChangeValue: (newValue: string) => void;
  onClose: () => void;
  markedDates?: MarkedDatesType;
  onVisibleMonthsChange?: (months: DateData[]) => void;
}

const Calendar = ({
  visible,
  value,
  onChangeValue,
  onClose,
  markedDates,
  onVisibleMonthsChange,
}: CalendarProps) => {
  if (!visible) return null;

  return (
    <RNCalendar
      current={value ? new XDate(value) : undefined}
      onDayPress={(day) => {
        onClose();
        onChangeValue(day.dateString);
      }}
      enableSwipeMonths={true}
      theme={calendarTheme}
      testID="calendar"
      onVisibleMonthsChange={onVisibleMonthsChange}
      markedDates={markedDates}
    />
  );
};

export default Calendar;
