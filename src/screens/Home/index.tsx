import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Styled from "./styles";
import Header from "./components/header";
import Card from "@screens/components/cardListItem";
import routeMap from "@routes/routeMap";
import { useUserContext } from "@context/userContext";
import { UserPermission } from "@api/user/types";

interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

// Plantões (Marcação de plantão e escalas)
// Formulários (Ficha de atendimento e checklists)
// Livros (Liro on-line e livro de deslocamento)
// Voluntários ()

const Home = ({ navigation }: HomeProps) => {
  const { userData } = useUserContext();

  return (
    <Styled.Container>
      <Card
        icon={'insert-invitation'}
        title="Plantões"
        subtitle="Marcação de plantão e escalas"
        onPress={() => { 
          navigation.navigate(routeMap.DutyRoutes.STACK)
        }}
      />
      <Card
        icon={'list-alt'}
        title="Formulários"
        subtitle="Fichas, livros e checklists"
        onPress={() => { }}
      />
      <Card
        icon={'group'}
        title="Equipe"
        subtitle="Voluntários e carga horária"
        onPress={() => { 
          navigation.navigate(routeMap.UserRoutes.STACK)
        }}
      />
      <Card
        icon={'local-activity'}
        title="Eventos"
        subtitle="Informações sobre eventos e fotos"
        onPress={() => { }}
      />
      {userData?.permission === UserPermission.ADMIN && (
        <Card
          icon={'settings'}
          title="Configurações"
          subtitle="Ajuste as configurações do aplicativo"
          onPress={() => { }}
        />
      )}
    </Styled.Container>
  );
};

export default Home;

export const NavHeader = () => <Header />;
