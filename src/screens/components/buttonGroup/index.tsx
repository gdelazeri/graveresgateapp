import { ButtonGroup as RNEButtonGroup } from 'react-native-elements';
import colors from "@theme/colors";
import fonts from '@theme/fonts';

interface ButtonGroupProps {
  options: string[];
  selectedOption?: string;
  onPressItem: (index: number) => void;
}

const ButtonGroup = ({
  options,
  selectedOption,
  onPressItem
}: ButtonGroupProps) => {
  return (
    <RNEButtonGroup
      buttons={options}
      selectedIndex={options.findIndex((option) => option === selectedOption)}
      onPress={(index) => { onPressItem(index) }}
      containerStyle={{ width: '40%', height: 26, padding: 0, borderColor: colors.Greyscale.b80, marginBottom: 0, marginTop: 0, marginRight: 0, marginLeft: 0 }}
      buttonStyle={{ padding: 5 }}
      buttonContainerStyle={{ padding: 0 }}
      selectedButtonStyle={{ backgroundColor: colors.red }}
      textStyle={{ fontFamily: fonts.regular, fontSize: 12, color: colors.Greyscale.b50 }}
      innerBorderStyle={{ color: colors.Greyscale.b80 }}
    />
  )
}

export default ButtonGroup