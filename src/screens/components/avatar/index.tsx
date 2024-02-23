import { Avatar as RNEAvatar } from "react-native-elements";
import { isString } from "@utils/stringHelper";
import Styled from "./styles";

interface AvatarProps {
  imageUrl?: string;
  size?: number;
}

const Avatar = ({ imageUrl, size = 48 }: AvatarProps) => {
  if (isString(imageUrl)) {
    return (
      <Styled.AvatarContainer size={size}>
        <RNEAvatar source={{ uri: imageUrl }} size={size} avatarStyle={{ borderRadius: size }} />
      </Styled.AvatarContainer>
    )
  }

  return <Styled.UserIcon size={size} />
}

export default Avatar;