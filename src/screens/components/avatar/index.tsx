import { Avatar as RNEAvatar } from "react-native-elements";
import { isString } from "@utils/stringHelper";
import Styled from "./styles";
import UserIcon from "../icons/user";

interface AvatarProps {
  imageUrl?: string;
  size?: number;
}

const Avatar = ({ imageUrl, size = 48 }: AvatarProps) => {
  if (isString(imageUrl)) {
    return (
      <Styled.AvatarContainer size={size}>
        <RNEAvatar
          source={{ uri: imageUrl }}
          size={size}
          avatarStyle={{ borderRadius: size }}
        />
      </Styled.AvatarContainer>
    );
  }

  return <UserIcon size={size} />;
};

export default Avatar;
