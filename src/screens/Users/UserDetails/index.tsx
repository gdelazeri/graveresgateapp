import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Loader from "@screens/components/loader";
import { useUserDetails } from "./useUserDetails";
import Styled from "./styles";
import Label from "@screens/components/label";
import Avatar from "@screens/components/avatar";
import CardInfo from "@screens/components/cardInfo";
import colors from "@theme/colors";
import Chip from "@screens/components/chip";
import UserDetailsStatus from "./components/status";
import UserDetailsPermission from "./components/permission";
import UserDetailsDriver from "./components/driver";

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
  const { isLoading, user } = useUserDetails(id)

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      <Avatar imageUrl={user?.imageUrl} size={96} />

      <Styled.Divider />

      <CardInfo title="Dados Pessoais">
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

      <CardInfo title="Perfil de Acesso">
        <Label size='small' color={colors.Greyscale.b50}>Status</Label>
        <UserDetailsStatus status={user!.status} />
        <Styled.Divider />
        <Label size='small' color={colors.Greyscale.b50}>Permissão</Label>
        <UserDetailsPermission permission={user!.permission} />
        <Styled.Divider />
        <Label size='small' color={colors.Greyscale.b50}>Condutor</Label>
        <UserDetailsDriver isDriver={user!.isDriver} />
      </CardInfo>
    </Styled.Container>
  );
};

export default UserDetails;

export const NavHeader = ({ navigation }: UserDetailsProps) => (
  <Header onBackPress={navigation.goBack} title="Voluntário" />
);
