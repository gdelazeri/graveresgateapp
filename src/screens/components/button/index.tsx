import { ReactElement } from 'react';
import { Button as RNEButton } from 'react-native-elements';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

interface ButtonProps {
  title: string
  secondary?: boolean
  loading?: boolean
  icon?: ReactElement
}

const Button = ({
  title,
  secondary = false,
  loading = false,
  icon,
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
        fontFamily: fonts.medium,
        fontSize: 14,
        color: secondary ? colors.red : colors.Greyscale.b100,
      }}
    />
  )
}

export default Button