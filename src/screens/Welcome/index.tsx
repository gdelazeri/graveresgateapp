import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Button from "@screens/components/button";
import routeMap from "@routes/routeMap";
import Styled from "./styles";

interface WelcomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const Welcome = ({ navigation }: WelcomeProps) => {
  return (
    <Styled.Container>
      <Styled.ImageLogo />
      <Styled.Buttons>
        <Button
          title="Fazer login"
          onPress={() => navigation.navigate(routeMap.LoggedOffRoutes.SIGN_IN)}
        />
        <Styled.Divider />
        <Button
          title="Criar conta"
          onPress={() => navigation.navigate(routeMap.LoggedOffRoutes.SIGN_UP)}
          secondary
        />
      </Styled.Buttons>
    </Styled.Container>
  );
};

export default Welcome;
