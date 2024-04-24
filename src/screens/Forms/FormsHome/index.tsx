import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import CardHomeItem from "@screens/components/cardHomeItem";
import routeMap from "@routes/routeMap";
import Styled from "./styles";

interface FormsHomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const FormsHome = ({ navigation }: FormsHomeProps) => (
  <Styled.Container>
    <CardHomeItem
      title="Ficha de atendimento"
      icon="hospital-box-outline"
      iconType="material-community"
      onPress={() => {
        navigation.navigate(routeMap.FormsRoutes.DUTY_CARE_LIST);
      }}
      size={40}
    />
    <CardHomeItem
      title="Livro de deslocamento"
      icon="edit-road"
      onPress={() => {
        navigation.navigate(routeMap.FormsRoutes.VEHICLE_TRIP_LIST);
      }}
      size={40}
    />
    <CardHomeItem
      title="Checklist Condutor"
      icon="truck-plus"
      iconType="material-community"
      onPress={() => {
        navigation.navigate(routeMap.FormsRoutes.DRIVER_CHECKLIST_LIST);
      }}
      size={40}
    />
    <CardHomeItem
      title="Checklist Socorrista"
      icon="doctor"
      iconType="material-community"
      onPress={() => {
        navigation.navigate(routeMap.FormsRoutes.RESCUER_CHECKLIST_LIST);
      }}
      size={40}
    />
    <CardHomeItem
      title="Checklist Radio Operador"
      icon="support-agent"
      onPress={() => {
        navigation.navigate(routeMap.SettingsRoutes.VEHICLE_LIST);
      }}
      size={40}
    />
  </Styled.Container>
);

export default FormsHome;

export const NavHeader = ({ navigation }: FormsHomeProps) => (
  <Header title="Formulários" onBackPress={navigation.goBack} />
);
