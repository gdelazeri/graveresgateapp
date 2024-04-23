import React from "react";
import { isString } from "@utils/stringHelper";
import { Icon } from "react-native-elements";
import Label from "../label";
import Styled from "./styles";
import colors from "@theme/colors";
import { TouchableOpacity } from "react-native";

interface CardInfoProps {
  title?: string
  onPressEdit?: () => void
  borderColor?: string
}

const CardInfo = ({ children, title, onPressEdit, borderColor }: React.PropsWithChildren<CardInfoProps>) => {
  const hasTitle = isString(title)
  const hasOnPressEdit = onPressEdit !== undefined

  return (
    <Styled.Container borderColor={borderColor}>
      {(hasTitle || hasOnPressEdit) && (
        <Styled.LabelContainer>
          {hasTitle && <Label size="large" bold>{title}</Label>}
          {hasOnPressEdit && <TouchableOpacity onPress={onPressEdit}>
            <Icon name="edit" size={24} color={colors.Greyscale.b50} />
          </TouchableOpacity>}
        </Styled.LabelContainer>
      )}
      {children}
    </Styled.Container>
  )
}

export default CardInfo;