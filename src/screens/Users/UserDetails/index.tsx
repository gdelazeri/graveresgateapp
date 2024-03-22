import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Loader from "@screens/components/loader";
import { useUserDetails } from "./useUserDetails";
import Styled from "./styles";
import Label from "@screens/components/label";
import Avatar from "@screens/components/avatar";
import CardInfo from "@screens/components/cardInfo";
import colors from "@theme/colors";
import UserDetailsStatus from "./components/status";
import UserDetailsPermission from "./components/permission";
import UserDetailsDriver from "./components/driver";
import routeMap from "@routes/routeMap";
import UserDetailsLeader from "./components/leader";
import FooterContainer from "@screens/components/footerContainer";
import Button from "@screens/components/button";
import { Alert } from "react-native";
import { UserStatus } from "@api/user/types";

interface UserDetailsProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      id: string;
    }
  }
}

const UserDetails = ({ navigation, route }: UserDetailsProps) => {
  const { id } = route.params
  const { isLoading, user, deleteUser, updateUserStatus } = useUserDetails(id)

  const onPressEditPersonalInformation = () => {
    navigation.navigate(routeMap.UserRoutes.USER_EDIT_PERSONAL_INFO, { user });
  }

  const onPressEditProfile = () => {
    navigation.navigate(routeMap.UserRoutes.USER_EDIT_PROFILE, { user });
  }

  const onPressDelete = () => {
    Alert.alert(
      'Excluir voluntário',
      'Tem certeza que deseja excluir este voluntário?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sim, desejo excluir',
          style: 'destructive',
          onPress: () => {
            deleteUser()
            navigation.goBack()
          }
        }
      ])
  }

  const onPressApprove = () => {
    Alert.alert(
      'Aprovar voluntário',
      'Tem certeza que deseja aprovar este voluntário?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sim, desejo aprovar',
          onPress: () => {
            updateUserStatus(UserStatus.ACTIVE)
          }
        }
      ])
  }

  const onPressSuspend = () => {
    Alert.alert(
      'Suspender voluntário',
      'Tem certeza que deseja suspender este voluntário? Ao suspender, este usuário não poderá marcar novos plantões até que seu status seja alterado para ATIVO novamente.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sim, desejo suspender',
          onPress: () => {
            updateUserStatus(UserStatus.SUSPENDED)
          }
        }
      ])
  }

  const onPressActive = () => {
    Alert.alert(
      'Ativar voluntário',
      'Tem certeza que deseja ativar este voluntário? Ao ativar, este usuário poderá marcar novos plantões.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sim, desejo ativar',
          onPress: () => {
            updateUserStatus(UserStatus.ACTIVE)
          }
        }
      ])
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      <Styled.ScrollView>
        <Styled.ContainerAvatar>
          <Avatar imageUrl={user?.imageUrl} size={144} />
        </Styled.ContainerAvatar>

        <Styled.Divider />

        <CardInfo title="Dados Pessoais" onPressEdit={onPressEditPersonalInformation}>
          <Label size='small' color={colors.Greyscale.b50}>Nome</Label>
          <Label size='medium'>{user?.name}</Label>
          <Styled.Divider />
          <Label size='small' color={colors.Greyscale.b50}>Email</Label>
          <Label size='medium'>{user?.email}</Label>
          <Styled.Divider />
          <Label size='small' color={colors.Greyscale.b50}>Telefone</Label>
          <Label size='medium'>{user?.phone}</Label>
          <Styled.Divider />
          <Label size='small' color={colors.Greyscale.b50}>Matrícula</Label>
          <Label size='medium'>{user?.registrationId || '-'}</Label>
        </CardInfo>

        <Styled.Divider />

        <CardInfo title="Perfil" onPressEdit={onPressEditProfile}>
          <Label size='small' color={colors.Greyscale.b50}>Status</Label>
          <UserDetailsStatus status={user!.status} />
          <Styled.Divider />
          <Label size='small' color={colors.Greyscale.b50}>Permissão</Label>
          <UserDetailsPermission permission={user!.permission} />
          <Styled.Divider />
          <Label size='small' color={colors.Greyscale.b50}>Condutor</Label>
          <UserDetailsDriver isDriver={user!.isDriver} />
          <Styled.Divider />
          <Label size='small' color={colors.Greyscale.b50}>Líder</Label>
          <UserDetailsLeader isLeader={user!.isLeader} />
        </CardInfo>

        <Styled.Divider />
        <Styled.Divider />
      </Styled.ScrollView>
      <FooterContainer>
        {user?.status === UserStatus.PENDING && <>
          <Button
            title="Aprovar voluntário"
            onPress={onPressApprove}
          />
        </>}
        {user?.status === UserStatus.ACTIVE && <>
          <Button
            title="Suspender voluntário"
            onPress={onPressSuspend}
          />
        </>}
        {user?.status === UserStatus.SUSPENDED && <>
          <Button
            title="Ativar voluntário"
            onPress={onPressActive}
          />
        </>}
        <Styled.Divider />
        <Button
          title="Excluir voluntário"
          onPress={onPressDelete}
          secondary
        />
      </FooterContainer>
    </Styled.Container>
  );
};

export default UserDetails;

export const NavHeader = ({ navigation }: UserDetailsProps) => (
  <Header onBackPress={navigation.goBack} title="Voluntário" />
);
