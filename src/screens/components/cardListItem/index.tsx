import TouchableScale from 'react-native-touchable-scale'; 
import { Icon, ListItem } from "react-native-elements";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { isString } from '@utils/stringHelper';

interface HomeCardProps {
  icon?: string;
  iconType?: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  disabled?: boolean;
}

const CardListItem = ({ icon, iconType, title, subtitle, onPress, disabled = false }: HomeCardProps) => (
  <ListItem
    Component={TouchableScale}
    // @ts-ignore
    friction={90}
    tension={100}
    activeScale={0.95}
    style={{
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      backgroundColor: colors.Greyscale.b100,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom: 24
    }}
    onPress={onPress}
    disabled={disabled}
    containerStyle={{ borderRadius: 8 }}
  >
    {icon && <Icon name={icon} size={56} color={colors.red} type={iconType} />}
    <ListItem.Content>
      <ListItem.Title style={{ fontFamily: fonts.bold }}>
        {title}
      </ListItem.Title>
      {isString(subtitle) && <ListItem.Subtitle style={{ fontFamily: fonts.regular, marginTop: 2 }}>
        {subtitle}
      </ListItem.Subtitle>}
    </ListItem.Content>
  </ListItem>
);

export default CardListItem;
