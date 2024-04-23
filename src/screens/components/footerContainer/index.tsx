import React from "react";
import Styled from "./styles";

type FooterContainerProps = React.PropsWithChildren<{}>;

const FooterContainer = ({ children }: FooterContainerProps) => {
  return <Styled.Footer>{children}</Styled.Footer>;
};

export default FooterContainer;
