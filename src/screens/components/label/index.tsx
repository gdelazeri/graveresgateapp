import fonts from "@theme/fonts";
import Styled from "./styles";
import colors from "@theme/colors";
import { LabelSizeValue } from "./types";

type LabelSizeType = "small" | "medium" | "large";

type LabelProps = React.PropsWithChildren<{
  onPress?: () => void;
  size?: LabelSizeType;
  color?: string;
  bold?: boolean;
  numberOfLines?: number;
  noMarginBottom?: boolean;
  underline?: boolean;
}>;

const Label = ({
  children,
  onPress,
  size = "small",
  color = colors.black,
  bold = false,
  numberOfLines,
  noMarginBottom = false,
  underline = false,
}: LabelProps) => {
  const fontSize = LabelSizeValue[size];
  const fontFamily = bold ? fonts.bold : fonts.regular;

  return (
    <Styled.Text
      onPress={onPress}
      fontSize={fontSize}
      fontFamily={fontFamily}
      color={color}
      numberOfLines={numberOfLines}
      noMarginBottom={noMarginBottom}
      underline={underline}
    >
      {children}
    </Styled.Text>
  );
};

export default Label;
