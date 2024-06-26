import { ReactElement } from "react";
import { Button as RNEButton } from "react-native-elements";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { LabelSizeValue } from "../label/types";

interface ButtonProps {
  title: string;
  secondary?: boolean;
  loading?: boolean;
  icon?: ReactElement;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
}

const Button = ({
  title,
  secondary = false,
  loading = false,
  icon,
  onPress,
  disabled = false,
  testID,
}: ButtonProps) => {
  return (
    <RNEButton
      testID={testID}
      title={title}
      icon={icon}
      disabled={disabled}
      buttonStyle={{
        backgroundColor: secondary ? colors.Greyscale.b100 : colors.red,
        borderWidth: 1,
        borderColor: colors.red,
        width: "100%",
        borderRadius: 4,
      }}
      titleStyle={{
        fontFamily: fonts.bold,
        fontSize: LabelSizeValue.medium,
        color: secondary ? colors.red : colors.Greyscale.b100,
      }}
      onPress={onPress}
      loading={loading}
      loadingProps={{ color: secondary ? colors.red : colors.Greyscale.b100 }}
    />
  );
};

export default Button;
