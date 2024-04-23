import { ActivityIndicator } from "react-native";
import Styled from "./styles";
import colors from "@theme/colors";

const Loader = () => (
  <Styled.Container>
    <ActivityIndicator color={colors.Greyscale.b50} size={"large"} />
  </Styled.Container>
);

export default Loader;
