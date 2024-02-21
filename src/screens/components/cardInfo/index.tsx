import React from "react";
import Styled from "./styles";
import Label from "../label";
import { isString } from "@utils/stringHelper";

const CardInfo = ({ children, title }: React.PropsWithChildren<{ title?: string }>) => (
  <Styled.Container>
    {isString(title) && (
      <Styled.LabelContainer>
        <Label size="medium" bold>{title}</Label>
      </Styled.LabelContainer>
    )}
    {children}
  </Styled.Container>
)

export default CardInfo;