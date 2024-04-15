import moment from "moment";
import TouchableScale from 'react-native-touchable-scale';
import { ListItem } from "react-native-elements";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { LabelSizeValue } from "@screens/components/label/types";
import { DutyCareChecklist } from "@api/dutyCareChecklist/types";
import { DutyShiftLabel } from "@api/dutyRequest/types";
import { formatAddress } from "@utils/stringHelper";

interface DutyCareListItemProps {
  item: DutyCareChecklist;
  onPress: () => void
}

const DutyCareListItem = ({ item, onPress }: DutyCareListItemProps) => (
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
        {moment(item.date).format('LL')} às {item.time.substring(0, 5)}
      </ListItem.Title>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }}>
        Motivo: {item.reason}
      </ListItem.Subtitle>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }}>
        {formatAddress({ address: item.incidentAddress, district: item.incidentAddressDistrict, city: item.incidentAddressCity })}
      </ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
);

export default DutyCareListItem;
