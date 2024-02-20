import { FlatList } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import SearchBar from "@screens/components/searchBar";
import Loader from "@screens/components/loader";
import UserListItem from "./components/UserListItem";
import { useUserList } from "./useUserList";
import Styled from "./styles";
import routeMap from "@routes/routeMap";

interface UserListProps {
  navigation: NavigationProp<ParamListBase>;
}

const UserList = ({ navigation }: UserListProps) => {
  const { isLoading, searchQuery, setSearchQuery, list } = useUserList()

  const onPressItem = (id: string) => {
    navigation.navigate(routeMap.UserRoutes.USER_DETAILS, { id })
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      <SearchBar
        placeholder={'Busque um membro da equipe...'}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={list}
        renderItem={({ item }) => <UserListItem user={item} onPress={() => onPressItem(item.id)} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Styled.Divider />}
      />
    </Styled.Container>
  );
};

export default UserList;

export const NavHeader = ({ navigation }: UserListProps) => (
  <Header onBackPress={navigation.goBack} title="Equipe" />
);
