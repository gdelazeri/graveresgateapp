import { Avatar } from "react-native-elements";
import Styled from "./styles";
import { isString } from "@utils/stringHelper";
import { useUserContext } from "@context/userContext";

const Header = () => {
  const { userData } = useUserContext();
  console.log(userData?.name);

  return (
    <Styled.Header>
      {isString(userData?.imageUrl) ? (
        <Avatar source={{ uri: userData?.imageUrl }} size={48} />
      ) : (
        <Styled.UserIcon />
      )}
      {isString(userData?.name) && (
        <Styled.Title>Olá, {userData?.name}</Styled.Title>
      )}
    </Styled.Header>
  );
};

export default Header;
