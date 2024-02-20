import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useUserContext } from "@context/userContext";
import Styled from "./styles";
import Header from "./components/header";
import Card from "./components/card";
import routeMap from "@routes/routeMap";

interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

// Plantões (Marcação de plantão e escalas)
// Formulários (Ficha de atendimento e checklists)
// Livros (Liro on-line e livro de deslocamento)
// Voluntários ()

const Home = ({ navigation }: HomeProps) => {
  const { clearTokens } = useUserContext();

  return (
    <Styled.Container>
      <Card
        icon={'insert-invitation'}
        title="Plantões"
        subtitle="Marcação de plantão e escalas"
        onPress={() => { clearTokens() }}
      />
      <Card
        icon={'list-alt'}
        title="Formulários"
        subtitle="Fichas, livros e checklists"
        onPress={() => { clearTokens() }}
      />
      <Card
        icon={'group'}
        title="Equipe"
        subtitle="Voluntários e carga horária"
        onPress={() => { 
          navigation.navigate(routeMap.LoggedInRoutes.USER_LIST)
        }}
      />
      <Card
        icon={'local-activity'}
        title="Eventos"
        subtitle="Informações sobre eventos e fotos"
        onPress={() => { clearTokens() }}
      />
    </Styled.Container>
  );
};

export default Home;

export const NavHeader = () => <Header />;
