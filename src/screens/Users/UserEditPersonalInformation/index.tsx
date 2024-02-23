import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import Input from "@screens/components/input";
import Button from "@screens/components/button";
import { useUserEditPersonalInformation } from "./useUserEditPersonalInformation";
import { INPUT_TYPE } from "@screens/components/input/types";
import Styled from "./styles";
import Loader from "@screens/components/loader";

interface UserEditPersonalInformationProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      id: string;
    }
  }
}

const UserEditPersonalInformation = ({ navigation, route }: UserEditPersonalInformationProps) => {
  const { id } = route.params
  const {
    isLoading,
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    registrationId,
    setRegistrationId,
    isProcessing,
    isFullNameValid,
    isEmailValid,
    isPhoneValid,
    isRegistrationIdValid,
    isFormValid,
    save,
  } = useUserEditPersonalInformation(id);

  const onPressSave = async () => {
    const success = await save();
    if (success) {
      navigation.goBack();
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      <Styled.Form>
        <Input
          label="Nome completo"
          placeholder="Nome completo do voluntário"
          value={fullName}
          onChangeText={setFullName}
          type={INPUT_TYPE.NAME}
          testID="full-name-input"
          invalid={!isFullNameValid}
          invalidText="Nome inválido"
        />
        <Styled.Divider />
        <Input
          label="E-mail"
          placeholder="E-mail do voluntário"
          value={email}
          onChangeText={setEmail}
          type={INPUT_TYPE.EMAIL}
          testID="email-input"
          invalid={!isEmailValid}
          invalidText="E-mail inválido"
        />
        <Styled.Divider />
        <Input
          label="Celular"
          placeholder="Número de celular do voluntário"
          value={phone}
          onChangeText={setPhone}
          type={INPUT_TYPE.PHONE}
          testID="phone-input"
          invalid={!isPhoneValid}
          invalidText="Número de celular inválido"
        />
        <Styled.Divider />
        <Input
          label="Matricula"
          placeholder="G-XXXX"
          value={registrationId}
          onChangeText={setRegistrationId}
          type={INPUT_TYPE.DEFAULT}
          testID="registration-input"
          invalid={!isRegistrationIdValid}
          invalidText="Número de matrícula inválido"
        />
      </Styled.Form>
      <Button
        testID="save-btn"
        title="Salvar"
        onPress={onPressSave}
        disabled={!isFormValid}
        loading={isProcessing}
      />
    </Styled.Container>
  );
};

export default UserEditPersonalInformation;

export const NavHeader = ({ navigation }: UserEditPersonalInformationProps) => (
  <Header title="Editar Dados Pessoais" onBackPress={navigation.goBack} />
);
