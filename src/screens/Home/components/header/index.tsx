import { getFirstName, isString } from "@utils/stringHelper";
import { useUserContext } from "@context/userContext";
import Avatar from "@screens/components/avatar";
import Styled from "./styles";

const Header = () => {
  const { userData, clearTokens } = useUserContext();

  return (
    <Styled.Header>
      <Styled.TitleContainer>
        <Avatar imageUrl={userData?.imageUrl} />
        {isString(userData?.name) && (
          <Styled.Title>Olá, {getFirstName(userData?.name)}</Styled.Title>
        )}
      </Styled.TitleContainer>
      <Styled.SignOutIcon onPress={clearTokens} />
    </Styled.Header>
  );
};

export default Header;
