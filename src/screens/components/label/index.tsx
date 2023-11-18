import fonts from '../../../theme/fonts';
import Styled from './styles';
import colors from '../../../theme/colors';

type LabelSizeType = 'small' | 'medium' | 'large'

enum LabelSizeValue {
  small = 14,
  medium = 16,
  large = 18,
}

type LabelProps = React.PropsWithChildren<{
  onPress?: () => void
  size?: LabelSizeType
  color?: string
  bold?: boolean
}>

const Label = ({
  children,
  onPress,
  size = 'small',
  color = colors.black,
  bold = false,
}: LabelProps) => {
  const fontSize = LabelSizeValue[size]
  const fontFamily = bold ? fonts.bold : fonts.regular

  return (
    <Styled.Text onPress={onPress} fontSize={fontSize} fontFamily={fontFamily} color={color}>
      {children}
    </Styled.Text>
  )
};

export default Label;