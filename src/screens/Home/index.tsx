import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Styled from "./styles";
import Header from "./components/header";
import CardHomeItem from "@screens/components/cardHomeItem";
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
      <CardHomeItem
        icon={'insert-invitation'}
        title="Plantões"
        subtitle="Marcação de plantão e escalas"
        onPress={() => { 
          navigation.navigate(routeMap.DutyRoutes.STACK)
        }}
        disabled={isNavigationDisabled}
      />
      <CardHomeItem
        icon={'list-alt'}
        title="Formulários"
        subtitle="Fichas, livros e checklists"
        onPress={() => {
          navigation.navigate(routeMap.FormsRoutes.STACK)
        }}
        disabled={isNavigationDisabled}
      />
      <CardHomeItem
        icon={'group'}
        title="Equipe"
        subtitle="Voluntários e carga horária"
        onPress={() => { 
          navigation.navigate(routeMap.UserRoutes.STACK)
        }}
        disabled={isNavigationDisabled}
      />
      <CardHomeItem
        icon={'local-activity'}
        title="Eventos"
        subtitle="Informações sobre eventos e fotos"
        onPress={() => { }}
        disabled={isNavigationDisabled}
      />
      {permission === UserPermission.ADMIN && (
        <CardHomeItem
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
