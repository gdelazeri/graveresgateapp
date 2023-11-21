import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useState } from "react";

import Header from "../../components/header";
import Label from "../../components/label";
import Styled from "./styles";
import Input, { INPUT_TYPE } from "../../components/input";
import Button from "../../components/button";

interface SignUpProps {
  navigation: NavigationProp<ParamListBase>;
}

const SignUp = ({ navigation }: SignUpProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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
        />
        <Styled.Divider />
        <Input
          label="E-mail"
          placeholder="Seu e-mail"
          value={email}
          onChangeText={setEmail}
          type={INPUT_TYPE.EMAIL}
        />
        <Styled.Divider />
        <Input
          label="Celular"
          placeholder="Seu número de celular"
          value={phone}
          onChangeText={setPhone}
          type={INPUT_TYPE.PHONE}
        />
        <Styled.Divider />
        <Input
          label="Senha"
          placeholder="Sua senha de acesso"
          value={password}
          onChangeText={setPassword}
          type={INPUT_TYPE.PASSWORD}
        />
        <Styled.Divider />
        <Input
          label="Confirmar senha"
          placeholder="Confirme sua senha de acesso"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          type={INPUT_TYPE.PASSWORD}
        />
      </Styled.Form>
      <Button
        title="Continuar"
        onPress={() => {}}
      />
    </Styled.Container>
  );
};

export default SignUp;

export const NavHeader = ({ navigation }: SignUpProps) => (
  <Header title="Criar conta" onBackPress={navigation.goBack} />
);
