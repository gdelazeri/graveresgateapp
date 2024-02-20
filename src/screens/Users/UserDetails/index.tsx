import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Loader from "@screens/components/loader";
import { useUserDetails } from "./useUserDetails";
import Styled from "./styles";
import Label from "@screens/components/label";
import Avatar from "@screens/components/avatar";
import CardInfo from "@screens/components/cardInfo";
import colors from "@theme/colors";

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
      <CardInfo>
        <Label size='small' color={colors.Greyscale.b50}>Nome</Label>
        <Label size='medium'>{user?.name}</Label>
        <Styled.Divider />
        <Label size='small' color={colors.Greyscale.b50}>Email</Label>
        <Label size='medium'>{user?.email}</Label>
        <Styled.Divider />
        <Label size='small' color={colors.Greyscale.b50}>Telefone</Label>
        <Label size='medium'>{user?.phone}</Label>
      </CardInfo>
    </Styled.Container>
  );
};

export default UserDetails;

export const NavHeader = ({ navigation }: UserDetailsProps) => (
  <Header onBackPress={navigation.goBack} title="Voluntário" />
);
