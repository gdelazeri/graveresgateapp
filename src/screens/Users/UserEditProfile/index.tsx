import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import Button from "@screens/components/button";
import { useUserEditProfile } from "./useUserEditProfile";
import Styled from "./styles";
import Label from "@screens/components/label";
import { User, UserPermission, UserPermissionLabel, UserStatus, UserStatusLabel } from "@api/user/types";
import Select from "@screens/components/select";
import { Switch } from "react-native-elements";
import colors from "@theme/colors";

interface UserEditProfileProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      user: User;
    }
  }
}

const UserEditProfile = ({ navigation, route }: UserEditProfileProps) => {
  const { user } = route.params
  const {
    isProcessing,
    permission,
    setPermission,
    isDriver,
    setIsDriver,
    isLeader,
    setIsLeader,
    isPermissionValid,
    save,
  } = useUserEditProfile(user);

  const onPressSave = async () => {
    const success = await save();
    if (success) {
      navigation.goBack();
    }
  }

  const permissionItems = Object
    .keys(UserPermission)
    .map((permission) => ({
      key: permission,
      label: UserPermissionLabel[permission as UserPermission],
      value: permission
    }));

  return (
    <>
      <Styled.Container>
        <Select
          label="Permissão"
          placeholder="Selecione uma permissão"
          value={permission ? permission.toString() : null}
          onChangeValue={(value) => setPermission(value as UserPermission)}
          items={permissionItems}
          invalid={!isPermissionValid}
          invalidText="Informe a permissão"
        />
        
        <Styled.Divider />

        <Label size={'small'}>Condutor</Label>
        <Styled.ContainerSwitch>
          <Switch value={isDriver} onValueChange={(value) => setIsDriver(value)} trackColor={{ true: colors.green }} />
        </Styled.ContainerSwitch>
        
        <Styled.Divider />

        <Label size={'small'}>Líder</Label>
        <Styled.ContainerSwitch>
          <Switch value={isLeader} onValueChange={(value) => setIsLeader(value)} trackColor={{ true: colors.green }} />
        </Styled.ContainerSwitch>
      </Styled.Container>
      <Styled.Footer>
        <Button
          testID="save-btn"
          title="Salvar"
          onPress={onPressSave}
          disabled={!isPermissionValid}
          loading={isProcessing}
        />
      </Styled.Footer>
    </>
  );
};

export default UserEditProfile;

export const NavHeader = ({ navigation }: UserEditProfileProps) => (
  <Header title="Editar Dados Pessoais" onBackPress={navigation.goBack} />
);
