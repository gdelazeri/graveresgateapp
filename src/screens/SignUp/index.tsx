import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import Label from "@screens/components/label";
import Input from "@screens/components/input";
import Button from "@screens/components/button";
import useSignUp from "./useSignUp";
import Styled from "./styles";
import { INPUT_TYPE } from "@screens/components/input/types";
import FooterContainer from "@screens/components/footerContainer";
import Select from "@screens/components/select";

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
    birthDate,
    setBirthDate,
    courseEdition,
    setCourseEdition,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    isProcessing,
    isFullNameValid,
    isEmailValid,
    isPhoneValid,
    isBirthDateValid,
    isPasswordValid,
    isPasswordsEqual,
    isFormValid,
    register,
  } = useSignUp();

  return (
    <Styled.Container>
      <Styled.Form>
        <Label size={"medium"}>Preencha seus dados nos campos abaixo:</Label>
        <Styled.Divider />
        <Input
          label="Nome completo*"
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
          label="E-mail*"
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
          label="Celular*"
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
          label="Data de nascimento*"
          placeholder="Sua data de nascimento"
          value={birthDate}
          onChangeText={setBirthDate}
          type={INPUT_TYPE.DATE}
          testID="birth-date-input"
          invalid={!isBirthDateValid}
          invalidText="Data de nascimento incompleta"
        />
        <Styled.Divider />
        <Input
          label="Edição do curso de APH"
          placeholder="Informe a edição do curso"
          value={courseEdition ? courseEdition.toString() : ''}
          onChangeText={(value) => setCourseEdition(value ? parseInt(value) : null)}
          type={INPUT_TYPE.DEFAULT}
          testID="course-edition-input"
        />
        <Styled.Divider />
        <Input
          label="Senha*"
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
          label="Confirmar senha*"
          placeholder="Confirme sua senha de acesso"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          type={INPUT_TYPE.PASSWORD}
          testID="password-confirm-input"
          invalid={!isPasswordsEqual}
          invalidText="As senhas precisam ser iguais"
        />
      </Styled.Form>
      <FooterContainer>
        <Button
          testID="continue-btn"
          title="Continuar"
          onPress={register}
          disabled={!isFormValid}
          loading={isProcessing}
        />
      </FooterContainer>
    </Styled.Container>
  );
};

export default SignUp;

export const NavHeader = ({ navigation }: SignUpProps) => (
  <Header title="Criar conta" onBackPress={navigation.goBack} />
);
