import { Avatar as RNEAvatar } from "react-native-elements";
import { isString } from "@utils/stringHelper";
import Styled from "./styles";

interface AvatarProps {
  imageUrl?: string;
}

const Avatar = ({ imageUrl }: AvatarProps) => {
  const size = 48
  if (isString(imageUrl)) {
    return (
      <Styled.AvatarContainer size={size}>
        <RNEAvatar source={{ uri: imageUrl }} size={size} />
      </Styled.AvatarContainer>
    )
  }

  return <Styled.UserIcon size={size} />
}

export default Avatar;