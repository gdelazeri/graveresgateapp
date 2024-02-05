import { Avatar, Icon } from "react-native-elements";
import Styled from "./styles";
import { isString } from "@utils/stringHelper";
import { useUserContext } from "@context/userContext";

const Header = () => {
  const { userData } = useUserContext();

  return (
    <Styled.Header>
        {isString(userData?.imageUrl) ? (
          <Styled.AvatarContainer>
            <Avatar source={{ uri: userData?.imageUrl }} size={48} />
          </Styled.AvatarContainer>
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
