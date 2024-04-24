import moment from "moment";
import TouchableScale from "react-native-touchable-scale";
import { ListItem } from "react-native-elements";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { LabelSizeValue } from "@screens/components/label/types";
import { RescuerChecklist } from "@api/rescuerChecklist/types";
import { DutyShiftLabel } from "@api/dutyRequest/types";

interface RescuerChecklistItemProps {
  item: RescuerChecklist;
  onPress: () => void;
}

const RescuerChecklistItem = ({ item, onPress }: RescuerChecklistItemProps) => (
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
    }}
    onPress={onPress}
    containerStyle={{ borderRadius: 8 }}
  >
    <ListItem.Content>
      <ListItem.Title
        style={{ fontFamily: fonts.bold, fontSize: LabelSizeValue.medium }}
      >
        {moment(item.duty.date).format("LL")} - {DutyShiftLabel[item.duty.shift]} - {item.vehicle.name}
      </ListItem.Title>
      <ListItem.Subtitle
        style={{
          fontFamily: fonts.regular,
          fontSize: LabelSizeValue.small,
          marginTop: 4,
        }}
      >
        {item.createdByUser.name}
      </ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
);

export default RescuerChecklistItem;
