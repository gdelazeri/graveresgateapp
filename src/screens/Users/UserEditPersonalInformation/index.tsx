import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Input from "@screens/components/input";
import Button from "@screens/components/button";
import { INPUT_TYPE } from "@screens/components/input/types";
import { User } from "@api/user/types";
import { useUserEditPersonalInformation } from "./useUserEditPersonalInformation";
import Styled from "./styles";

interface UserEditPersonalInformationProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      user: User;
    }
  }
}

const UserEditPersonalInformation = ({ navigation, route }: UserEditPersonalInformationProps) => {
  const { user } = route.params
  const {
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
  } = useUserEditPersonalInformation(user);

  const onPressSave = async () => {
    const success = await save();
    if (success) {
      navigation.goBack();
    }
  }

  return (
    <>
      <Styled.Container>
        <Input
          label="Nome completo*"
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
          label="E-mail*"
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
          label="Celular*"
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
      </Styled.Container>
      <Styled.Footer>
        <Button
          testID="save-btn"
          title="Salvar"
          onPress={onPressSave}
          disabled={!isFormValid}
          loading={isProcessing}
        />
      </Styled.Footer>
      </>
  );
};

export default UserEditPersonalInformation;

export const NavHeader = ({ navigation }: UserEditPersonalInformationProps) => (
  <Header title="Editar Dados Pessoais" onBackPress={navigation.goBack} />
);
