import { Appbar } from "react-native-paper";
import fonts from "../../../theme/fonts";
import colors from "../../../theme/colors";

interface HeaderProps {
  onBackPress?: () => void;
  title: string;
}

const Header = ({ onBackPress, title }: HeaderProps) => (
  <Appbar.Header style={{ backgroundColor: colors.Greyscale.b100 }} elevated>
    <Appbar.BackAction onPress={onBackPress} size={20} testID="back-action" />
    <Appbar.Content
      title={title}
      titleStyle={{
        fontFamily: fonts.regular,
        color: colors.black,
        fontSize: 18,
      }}
    />
  </Appbar.Header>
);

export default Header;
