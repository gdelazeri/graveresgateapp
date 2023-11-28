import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "../../components/header";
import Label from "../../components/label";
import Input, { INPUT_TYPE } from "../../components/input";
import Button from "../../components/button";
import useSignUp from "./useSignUp";
import Styled from "./styles";

interface SignUpProps {
  navigation: NavigationProp<ParamListBase>;
}

const SignUp = ({ navigation }: SignUpProps) => {
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    isProcessing,
    isFullNameValid,
    isEmailValid,
    isPhoneValid,
    isPasswordValid,
    isPasswordsEqual,
    isFormValid,
    register,
  } = useSignUp();

  const onPressContinue = async () => {
    await register();
  };

  return (
    <Styled.Container>
      <Styled.Form>
        <Label size={"medium"}>Preencha seus dados nos campos abaixo:</Label>
        <Styled.Divider />
        <Input
          label="Nome completo"
          placeholder="Seu nome completo"
          value={fullName}
          onChangeText={setFullName}
          type={INPUT_TYPE.NAME}
          testID="full-name-input"
          invalid={!isFullNameValid}
          invalidText="Informe seu nome completo"
        />
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
          label="Celular"
          placeholder="Seu número de celular"
          value={phone}
          onChangeText={setPhone}
          type={INPUT_TYPE.PHONE}
          testID="phone-input"
          invalid={!isPhoneValid}
          invalidText="Número de celular incompleto"
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
        <Styled.Divider />
        <Input
          label="Confirmar senha"
          placeholder="Confirme sua senha de acesso"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          type={INPUT_TYPE.PASSWORD}
          testID="password-confirm-input"
          invalid={!isPasswordsEqual}
          invalidText="As senhas precisam ser iguais"
        />
      </Styled.Form>
      <Button
        testID="continue-btn"
        title="Continuar"
        onPress={onPressContinue}
        disabled={!isFormValid}
        loading={isProcessing}
      />
    </Styled.Container>
  );
};

export default SignUp;

export const NavHeader = ({ navigation }: SignUpProps) => (
  <Header title="Criar conta" onBackPress={navigation.goBack} />
);
