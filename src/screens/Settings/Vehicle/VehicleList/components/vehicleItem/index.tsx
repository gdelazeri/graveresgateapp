import TouchableScale from 'react-native-touchable-scale'; 
import { ListItem } from "react-native-elements";
import colors from "@theme/colors";
import fonts from "@theme/fonts";
import { LabelSizeValue } from "@screens/components/label/types";
import { Vehicle } from "@api/vehicle/types";
import Chip from '@screens/components/chip';

interface VehicleItemProps {
  item: Vehicle;
  onPress: () => void
}

const VehicleItem = ({ item, onPress }: VehicleItemProps) => (
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
        {item.name}
      </ListItem.Title>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 4 }}>
        {item.brand} - {item.model}
      </ListItem.Subtitle>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 2 }}>
        Ano: {item.year}
      </ListItem.Subtitle>
      <ListItem.Subtitle style={{ fontFamily: fonts.regular, fontSize: LabelSizeValue.small, marginTop: 2 }}>
        Placa: {item.licensePlate}
      </ListItem.Subtitle>
    </ListItem.Content>
    <Chip
      label={item.isAvailable ? 'Disponível' : 'Indisponível'}
      labelColor={colors.Greyscale.b100}
      backgroundColor={item.isAvailable ? colors.green : colors.red}
    />
  </ListItem>
);

export default VehicleItem;
