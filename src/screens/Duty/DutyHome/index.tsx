import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import Styled from "./styles";
import CardHomeItem from "@screens/components/cardHomeItem";
import routeMap from "@routes/routeMap";

interface DutyHomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const DutyHome = ({ navigation }: DutyHomeProps) => (
  <Styled.Container>
    <CardHomeItem
      title="Escala de plantão"
      subtitle="Veja as escalas disponíveis"
      icon="calendar-month"
      iconType="material-community"
      onPress={() => {
        navigation.navigate(routeMap.DutyRoutes.SCHEDULE);
      }}
      size={40}
    />
    <CardHomeItem
      title="Marcação de plantão"
      subtitle="Preencha o formulário para solicitar seu plantão"
      icon="calendar-plus"
      iconType="material-community"
      onPress={() => {
        navigation.navigate(routeMap.DutyRoutes.CREATE_DUTY_REQUEST);
      }}
      size={40}
    />
    <CardHomeItem
      title="Minhas solicitações"
      subtitle="Acompanhe as suas solicitações de plantão"
      icon="calendar-account"
      iconType="material-community"
      onPress={() => {
        navigation.navigate(routeMap.DutyRoutes.LIST_DUTY_REQUEST);
      }}
      size={40}
    />
  </Styled.Container>
);

export default DutyHome;

export const NavHeader = ({ navigation }: DutyHomeProps) => (
  <Header title="Plantões" onBackPress={navigation.goBack} />
);
