import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useUserContext } from "@context/userContext";
import Button from "@screens/components/button";
import Styled from "./styles";

interface WelcomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const Home = ({ navigation }: WelcomeProps) => {
  const { clearTokens } = useUserContext()

  return (
    <Styled.Container>
      <Styled.ImageLogo />
      <Button
        title="Fazer logout"
        onPress={clearTokens}
      />
    </Styled.Container>
  );
};

export default Home;
