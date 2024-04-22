import moment from "moment";
import TouchableScale from 'react-native-touchable-scale';
import { ListItem } from "react-native-elements";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { LabelSizeValue } from "@screens/components/label/types";
import { DriverChecklist } from "@api/driverChecklist/types";
import { DutyShiftLabel } from "@api/dutyRequest/types";

interface DriverChecklistItemProps {
  item: DriverChecklist;
  onPress: () => void
}

const DriverChecklistItem = ({ item, onPress }: DriverChecklistItemProps) => (
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
      <ListItem.Title style={{ fontFamily: fonts.bold, fontSize: LabelSizeValue.medium }}>
        {item.vehicle.name}
      </ListItem.Title>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }}>
        {moment(item.duty.date).format('LL')} - {DutyShiftLabel[item.duty.shift]}
      </ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
);

export default DriverChecklistItem;
