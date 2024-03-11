import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import Styled from "./styles";
import CardListItem from "@screens/components/cardListItem";
import routeMap from "@routes/routeMap";

interface DutyHomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const DutyHome = ({ navigation }: DutyHomeProps) => (
  <Styled.Container>
    <CardListItem
      title="Marcar plantão"
      subtitle="Preencha o formulário para solicitar seu plantão"
      onPress={() => { navigation.navigate(routeMap.DutyRoutes.CREATE_DUTY_REQUEST) }}
    />
    <CardListItem
      title="Escala de plantão"
      subtitle="Veja as escalas disponíveis"
      onPress={() => { }}
    />
    <CardListItem
      title="Minhas solicitações"
      subtitle="Acompanhe as suas solicitações de plantão"
      onPress={() => { navigation.navigate(routeMap.DutyRoutes.LIST_DUTY_REQUEST) }}
    />
  </Styled.Container>
);

export default DutyHome;

export const NavHeader = ({ navigation }: DutyHomeProps) => (
  <Header title="Plantões" onBackPress={navigation.goBack} />
);
