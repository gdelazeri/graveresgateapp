import React from "react";
import Styled from "./styles";

const CardInfo = ({ children }: React.PropsWithChildren<{}>) => (
  <Styled.Container>
    {children}
  </Styled.Container>
)

export default CardInfo;