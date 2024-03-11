import { DutyRequestListItem, DutyRequestStatus, DutyRequestStatusLabel, DutyShiftLabel } from "@api/dutyRequest/types";
import TouchableScale from 'react-native-touchable-scale'; 
import { ListItem } from "react-native-elements";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { LabelSizeValue } from "@screens/components/label/types";
import moment from "moment";
import Chip from "@screens/components/chip";
import { isString } from "@utils/stringHelper";
import DutyRequestPositions from "@screens/components/dutyRequestPositions";

interface DutyRequestItemProps {
  item: DutyRequestListItem;
  onPress: () => void
}

const DutyRequestItem = ({ item, onPress }: DutyRequestItemProps) => (
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
    containerStyle={{ borderRadius: 8 }}
  >
    <ListItem.Content>
      <ListItem.Title style={{ fontFamily: fonts.bold, fontSize: LabelSizeValue.medium }}>
        {moment(item.date).format('DD/MM/YYYY')} - {DutyShiftLabel[item.shift]}
      </ListItem.Title>
      <DutyRequestPositions id={item.id} positions={item.positions} />
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }}>
        Das {item.startAt.substring(0, 5)} às {item.endAt.substring(0, 5)}
      </ListItem.Subtitle>
      {isString(item.note) && (
        <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }}>
          {item.note}
        </ListItem.Subtitle>
      )}
    </ListItem.Content>
    <Chip
      label={DutyRequestStatusLabel[item.status]}
      labelColor={item.status === DutyRequestStatus.APPROVED ? colors.Greyscale.b100 : colors.black}
      backgroundColor={item.status === DutyRequestStatus.APPROVED ? colors.green : colors.yellow}
    />
  </ListItem>
);

export default DutyRequestItem;
