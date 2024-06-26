import colors from "@theme/colors";
import fonts from "@theme/fonts";

export const calendarTheme = {
  backgroundColor: colors.Greyscale.b100,
  calendarBackground: colors.Greyscale.b100,
  textSectionTitleColor: colors.Greyscale.b50,
  textSectionTitleDisabledColor: colors.Greyscale.b50,
  selectedDayBackgroundColor: colors.red,
  selectedDayTextColor: colors.Greyscale.b100,
  todayTextColor: colors.red,
  dayTextColor: colors.Greyscale.b50,
  textDisabledColor: colors.Greyscale.b90,
  dotColor: colors.red,
  selectedDotColor: colors.red,
  arrowColor: colors.black,
  disabledArrowColor: colors.Greyscale.b90,
  monthTextColor: colors.black,
  indicatorColor: colors.red,
  textDayFontFamily: fonts.regular,
  textMonthFontFamily: fonts.regular,
  textDayHeaderFontFamily: fonts.regular,
  textDayFontWeight: "400" as const,
  textMonthFontWeight: "700" as const,
  textDayHeaderFontWeight: "400" as const,
  textDayFontSize: 16,
  textMonthFontSize: 18,
  textDayHeaderFontSize: 12,
  markColor: colors.red,
  markTextColor: colors.Greyscale.b100,
};
