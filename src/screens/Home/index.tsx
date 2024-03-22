import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Styled from "./styles";
import Header from "./components/header";
import CardListItem from "@screens/components/cardListItem";
import routeMap from "@routes/routeMap";
import { useUserContext } from "@context/userContext";
import { UserPermission, UserStatus } from "@api/user/types";

interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const Home = ({ navigation }: HomeProps) => {
  const { permission, userData } = useUserContext();
  const isNavigationDisabled = userData?.status !== UserStatus.ACTIVE;

  return (
    <Styled.Container>
      <CardListItem
        icon={'insert-invitation'}
        title="Plantões"
        subtitle="Marcação de plantão e escalas"
        onPress={() => { 
          navigation.navigate(routeMap.DutyRoutes.STACK)
        }}
        disabled={isNavigationDisabled}
      />
      <CardListItem
        icon={'list-alt'}
        title="Formulários"
        subtitle="Fichas, livros e checklists"
        onPress={() => { }}
        disabled={isNavigationDisabled}
      />
      <CardListItem
        icon={'group'}
        title="Equipe"
        subtitle="Voluntários e carga horária"
        onPress={() => { 
          navigation.navigate(routeMap.UserRoutes.STACK)
        }}
        disabled={isNavigationDisabled}
      />
      <CardListItem
        icon={'local-activity'}
        title="Eventos"
        subtitle="Informações sobre eventos e fotos"
        onPress={() => { }}
        disabled={isNavigationDisabled}
      />
      {permission === UserPermission.ADMIN && (
        <CardListItem
          icon={'settings'}
          title="Configurações"
          subtitle="Ajuste as configurações do aplicativo"
          onPress={() => {
            navigation.navigate(routeMap.SettingsRoutes.STACK)
          }}
          disabled={isNavigationDisabled}
        />
      )}
    </Styled.Container>
  );
};

export default Home;

export const NavHeader = () => <Header />;
