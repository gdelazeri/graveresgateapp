import { isString } from "@utils/stringHelper";
import { useUserContext } from "@context/userContext";
import Avatar from "@screens/components/avatar";
import Styled from "./styles";

const Header = () => {
  const { userData } = useUserContext();

  return (
    <Styled.Header>
     <Avatar imageUrl={userData?.imageUrl} />
      {isString(userData?.name) && (
        <Styled.Title>Olá, {userData?.name}</Styled.Title>
      )}
    </Styled.Header>
  );
};

export default Header;
