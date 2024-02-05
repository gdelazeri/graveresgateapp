import TouchableScale from 'react-native-touchable-scale'; 
import { Icon, ListItem } from "react-native-elements";
import colors from "@theme/colors";
import fonts from "@theme/fonts";

interface HomeCardProps {
  icon: 'insert-invitation' | 'list-alt' | 'group' | 'local-activity';
  title: string;
  subtitle: string;
  onPress: () => void;
}

const HomeCard = ({ icon, title, subtitle, onPress }: HomeCardProps) => (
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
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom: 24
    }}
    onPress={onPress}
    containerStyle={{ borderRadius: 8 }}
  >
    <Icon name={icon} size={56} color={colors.red} />
    <ListItem.Content>
      <ListItem.Title style={{ fontFamily: fonts.bold }}>
        {title}
      </ListItem.Title>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular }}>
        {subtitle}
      </ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
);

export default HomeCard;
