import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Styled from "./styles";
import Header from "./components/header";
import Card from "@screens/components/cardListItem";
import routeMap from "@routes/routeMap";

interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

// Plantões (Marcação de plantão e escalas)
// Formulários (Ficha de atendimento e checklists)
// Livros (Liro on-line e livro de deslocamento)
// Voluntários ()

const Home = ({ navigation }: HomeProps) => {
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
    </Styled.Container>
  );
};

export default Home;

export const NavHeader = () => <Header />;
