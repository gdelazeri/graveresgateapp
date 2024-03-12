import moment from "moment";
import TouchableScale from 'react-native-touchable-scale'; 
import { ListItem } from "react-native-elements";
import { DutyShiftLabel } from "@api/dutyRequest/types";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { LabelSizeValue } from "@screens/components/label/types";
import { Duty } from "@api/duty/types";
import Label from "@screens/components/label";

interface DutyItemProps {
  item: Duty;
  onPress: () => void
  disabled?: boolean
}

const DutyItem = ({ item, onPress, disabled }: DutyItemProps) => (
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
    disabled={disabled}
  >
    <ListItem.Content>
      <ListItem.Title style={{ fontFamily: fonts.bold, fontSize: LabelSizeValue.medium }}>
        {moment(item.date).format('ddd')}, {moment(item.date).format('LL')} - {DutyShiftLabel[item.shift]}
      </ListItem.Title>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }} numberOfLines={1}>
        Líder: {item.leaderName || <Label color={colors.green} bold>VAGO</Label>}
      </ListItem.Subtitle>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }} numberOfLines={1}>
        Condutor: {item.driverName || <Label color={colors.green} bold>VAGO</Label>}
      </ListItem.Subtitle>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }} numberOfLines={1}>
        1º Socorrista: {item.firstRescuerName || <Label color={colors.green} bold>VAGO</Label>}
      </ListItem.Subtitle>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }} numberOfLines={1}>
        2º Socorrista: {item.secondRescuerName || <Label color={colors.green} bold>VAGO</Label>} 
      </ListItem.Subtitle>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }} numberOfLines={1}>
        Auxiliar de S.O: {item.assistantRadioOperatorName || <Label color={colors.green} bold>VAGO</Label>}
      </ListItem.Subtitle>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }} numberOfLines={1}>
        S.O: {item.radioOperatorName || <Label color={colors.green} bold>VAGO</Label>}
      </ListItem.Subtitle>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }} numberOfLines={1}>
        Estágio: {item.traineeName || <Label color={colors.green} bold>VAGO</Label>}
      </ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
);

export default DutyItem;
