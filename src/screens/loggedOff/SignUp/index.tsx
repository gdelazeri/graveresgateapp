import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useState } from "react";

import Header from "../../components/header";
import Label from "../../components/label";
import Styled from "./styles";
import Input, { INPUT_TYPE } from "../../components/input";
import Button from "../../components/button";
import { isEmail } from "../../../utils/validators";
import routeMap from "../../../routes/routeMap";

interface SignUpProps {
  navigation: NavigationProp<ParamListBase>;
}

const SignUp = ({ navigation }: SignUpProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const validateInputs = () =>
    fullName.length > 3 &&
    isEmail(email) &&
    phone.length === 15 &&
    password.length >= 8 &&
    password === passwordConfirm;

  const onPressContinue = () => {
    const payload = {
      fullName,
      email,
      phone: phone.replace(/\D+/g, ""),
      password,
    };

    navigation.navigate(routeMap.LoggedOffRoutes.SIGN_UP_VERIFICATION, {
      ...payload,
    });
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
        />
        <Styled.Divider />
        <Input
          label="E-mail"
          placeholder="Seu e-mail"
          value={email}
          onChangeText={setEmail}
          type={INPUT_TYPE.EMAIL}
          testID="email-input"
        />
        <Styled.Divider />
        <Input
          label="Celular"
          placeholder="Seu número de celular"
          value={phone}
          onChangeText={setPhone}
          type={INPUT_TYPE.PHONE}
          testID="phone-input"
        />
        <Styled.Divider />
        <Input
          label="Senha"
          placeholder="Sua senha de acesso"
          value={password}
          onChangeText={setPassword}
          type={INPUT_TYPE.PASSWORD}
          testID="password-input"
        />
        <Styled.Divider />
        <Input
          label="Confirmar senha"
          placeholder="Confirme sua senha de acesso"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          type={INPUT_TYPE.PASSWORD}
          testID="password-confirm-input"
        />
      </Styled.Form>
      <Button
        testID="continue-btn"
        title="Continuar"
        onPress={onPressContinue}
        disabled={!validateInputs()}
      />
    </Styled.Container>
  );
};

export default SignUp;

export const NavHeader = ({ navigation }: SignUpProps) => (
  <Header title="Criar conta" onBackPress={navigation.goBack} />
);
