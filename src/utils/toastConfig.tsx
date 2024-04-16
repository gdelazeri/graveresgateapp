import { LabelSizeValue } from '@screens/components/label/types';
import colors from '@theme/colors';
import fonts from '@theme/fonts';
import Toast, { BaseToast, ErrorToast, BaseToastProps } from 'react-native-toast-message';

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.green }}
      contentContainerStyle={{ paddingHorizontal: 8 }}
      text1Style={{
        fontSize: LabelSizeValue.medium,
        fontFamily: fonts.bold
      }}
      text2Style={{
        fontSize: LabelSizeValue.small,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.red }}
      contentContainerStyle={{ paddingHorizontal: 8 }}
      text1Style={{
        fontSize: LabelSizeValue.medium,
        fontFamily: fonts.bold
      }}
      text1NumberOfLines={1}
      text2Style={{
        fontSize: LabelSizeValue.small,
      }}
      text2NumberOfLines={2}
    />
  ),
};

export default toastConfig;