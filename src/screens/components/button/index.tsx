import { ReactElement } from 'react';
import { Button as RNEButton } from 'react-native-elements';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

interface ButtonProps {
  title: string
  secondary?: boolean
  loading?: boolean
  icon?: ReactElement
  onPress: () => void
}

const Button = ({
  title,
  secondary = false,
  loading = false,
  icon,
  onPress
}: ButtonProps) => {
  return (
    <RNEButton
      loading={loading}
      title={title}
      icon={icon}
      buttonStyle={{
        backgroundColor: secondary ? colors.Greyscale.b100 : colors.red,
        borderWidth: 1,
        borderColor: colors.red,
        width: '100%'
      }}
      titleStyle={{
        fontFamily: fonts.bold,
        fontSize: 16,
        color: secondary ? colors.red : colors.Greyscale.b100,
      }}
      onPress={onPress}
    />
  )
}

export default Button