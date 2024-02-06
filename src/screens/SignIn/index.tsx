import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import Label from "@screens/components/label";
import Input, { INPUT_TYPE } from "@screens/components/input";
import Button from "@screens/components/button";
import useSignIn from "./useSignIn";
import Styled from "./styles";

interface SignInProps {
  navigation: NavigationProp<ParamListBase>;
}

const SignIn = ({ navigation }: SignInProps) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isProcessing,
    isEmailValid,
    isPasswordValid,
    isFormValid,
    login,
  } = useSignIn();

  return (
    <Styled.Container>
      <Styled.Form>
        <Label size={"medium"}>Informe seus dados de acesso:</Label>
        <Styled.Divider />
        <Input
          label="E-mail"
          placeholder="Seu e-mail"
          value={email}
          onChangeText={setEmail}
          type={INPUT_TYPE.EMAIL}
          testID="email-input"
          invalid={!isEmailValid}
          invalidText="Informe um e-mail válido"
        />
        <Styled.Divider />
        <Input
          label="Senha"
          placeholder="Sua senha de acesso"
          value={password}
          onChangeText={setPassword}
          type={INPUT_TYPE.PASSWORD}
          testID="password-input"
          invalid={!isPasswordValid}
          invalidText="A senha precisa conter pelo menos 8 caracteres"
        />
      </Styled.Form>
      <Button
        testID="sign-in-btn"
        title="Entrar"
        onPress={login}
        disabled={!isFormValid}
        loading={isProcessing}
      />
    </Styled.Container>
  );
};

export default SignIn;

export const NavHeader = ({ navigation }: SignInProps) => (
  <Header title="Fazer login" onBackPress={navigation.goBack} />
);
