import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import CardListItem from "@screens/components/cardListItem";
import routeMap from "@routes/routeMap";
import Styled from "./styles";

interface FormsHomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const FormsHome = ({ navigation }: FormsHomeProps) => (
  <Styled.Container>
    <CardListItem
      title="Ficha de atendimento"
      icon="hospital-box-outline"
      iconType="material-community"
      onPress={() => { navigation.navigate(routeMap.SettingsRoutes.VEHICLE_LIST) }}
    />
    <CardListItem
      title="Livro de deslocamento"
      icon="edit-road"
      onPress={() => { navigation.navigate(routeMap.FormsRoutes.FORM_VEHICLE_TRIP) }}
    />
    <CardListItem
      title="Checklist Condutor"
      icon="truck-plus"
      iconType="material-community"
      onPress={() => { navigation.navigate(routeMap.SettingsRoutes.VEHICLE_LIST) }}
    />
    <CardListItem
      title="Checklist Socorrista"
      icon="doctor"
      iconType="material-community"
      onPress={() => { navigation.navigate(routeMap.SettingsRoutes.VEHICLE_LIST) }}
    />
    <CardListItem
      title="Checklist Radio Operador"
      icon="radio-handheld"
      iconType="material-community"
      onPress={() => { navigation.navigate(routeMap.SettingsRoutes.VEHICLE_LIST) }}
    />
  </Styled.Container>
);

export default FormsHome;

export const NavHeader = ({ navigation }: FormsHomeProps) => (
  <Header title="Formulários" onBackPress={navigation.goBack} />
);
