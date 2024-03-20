import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import CardListItem from "@screens/components/cardListItem";
import routeMap from "@routes/routeMap";
import Styled from "./styles";

interface SettingsHomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const SettingsHome = ({ navigation }: SettingsHomeProps) => (
  <Styled.Container>
    <CardListItem
      title="Viaturas"
      subtitle="Gerencie os veículos da instituição"
      icon="truck-plus"
      iconType="material-community"
      onPress={() => { navigation.navigate(routeMap.SettingsRoutes.VEHICLE_LIST) }}
    />
  </Styled.Container>
);

export default SettingsHome;

export const NavHeader = ({ navigation }: SettingsHomeProps) => (
  <Header title="Configurações" onBackPress={navigation.goBack} />
);