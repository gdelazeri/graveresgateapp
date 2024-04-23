import { Icon } from "react-native-elements";
import Label from "@screens/components/label";
import colors from "@theme/colors";
import Styled from "./styles";

interface SettingItemProps {
  value: string;
  onPressDelete: () => void;
}

const SettingItem = ({ value, onPressDelete }: SettingItemProps) => (
  <Styled.Touchable
    onPress={onPressDelete}
    activeOpacity={typeof onPressDelete === "function" ? 0.7 : 1}
  >
    <Label size={"medium"}>{value}</Label>
    <Styled.IconButton onPress={onPressDelete}>
      <Icon name="delete" size={24} color={colors.red} />
    </Styled.IconButton>
  </Styled.Touchable>
);

export default SettingItem;
