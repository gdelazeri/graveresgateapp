import { getFirstName, isString } from "@utils/stringHelper";
import { useUserContext } from "@context/userContext";
import Avatar from "@screens/components/avatar";
import Styled from "./styles";
import { Alert } from "react-native";

const Header = () => {
  const { userData, signOut } = useUserContext();

  const onSignOut = () => {
    Alert.alert(
      'Sair do Aplicativo',
      'Tem certeza que deseja sair? Você precisará informar seu e-mail e senha para acessar o aplicativo novamente.',
      [
        { text: 'Não' },
        { text: 'Sim, desejo sair', onPress: signOut }
      ]
    )
  }

  return (
    <Styled.Header>
      <Styled.TitleContainer>
        <Avatar imageUrl={userData?.imageUrl} />
        {isString(userData?.name) && (
          <Styled.Title>Olá, {getFirstName(userData?.name)}</Styled.Title>
        )}
      </Styled.TitleContainer>
      <Styled.SignOutIcon onPress={onSignOut} />
    </Styled.Header>
  );
};

export default Header;
