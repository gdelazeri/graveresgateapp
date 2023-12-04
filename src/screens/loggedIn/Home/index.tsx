import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useUserContext } from "@context/userContext";
import Button from "@screens/components/button";
import Styled from "./styles";
import Header from "./components/header";

interface WelcomeProps {
  navigation: NavigationProp<ParamListBase>;
}

// Plantões (Marcação de plantão e escalas)
// Formulários (Ficha de atendimento e checklists)
// Livros (Liro on-line e livro de deslocamento)
// Voluntários ()

const Home = ({ navigation }: WelcomeProps) => {
  const { clearTokens } = useUserContext();

  return (
    <Styled.Container>
      <Button title="Fazer logout" onPress={clearTokens} />
    </Styled.Container>
  );
};

export default Home;

export const NavHeader = () => <Header />;
