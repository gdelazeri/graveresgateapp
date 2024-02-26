import { useEffect, useState } from 'react';
import moment from 'moment';
import { DateData } from 'react-native-calendars/src/types';
import Calendar from '../calendar';

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
}

const DutyCalendar = ({ visible, value, onChangeValue, onClose }: CalendarProps) => {
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({})
  const [month, setMonth] = useState(Number(moment().format('MM')))

  useEffect(() => {
    const date = moment().set('month', month-1).startOf('month')
    const marked: MarkedDatesType = {}

    while (date.month() === month-1) {
      if ([1,2,3].includes(date.weekday())) {
        const day = date.format('YYYY-MM-DD')
        marked[day] = { disabled: true, disableTouchEvent: true }
      }
      date.add(1, 'days')
    }
    setMarkedDates(marked)
  }, [month])

  return (
    <Calendar
      visible={visible}
      onChangeValue={onChangeValue}
      value={value}
      onClose={onClose}
      onVisibleMonthsChange={(months: DateData[]) => setMonth(months[0].month)}
      markedDates={markedDates}
    />
  )
}

export default DutyCalendar;
