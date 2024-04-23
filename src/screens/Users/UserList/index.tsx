import { FlatList, RefreshControl } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import SearchBar from "@screens/components/searchBar";
import Loader from "@screens/components/loader";
import UserListItem from "@screens/components/userListItem";
import { useUserList } from "./useUserList";
import Styled from "./styles";
import routeMap from "@routes/routeMap";
import { useUserContext } from "@context/userContext";
import { UserPermission } from "@api/user/types";

interface UserListProps {
  navigation: NavigationProp<ParamListBase>;
}

const UserList = ({ navigation }: UserListProps) => {
  const { permission } = useUserContext();
  const {
    isLoading,
    isRefreshing,
    searchQuery,
    setSearchQuery,
    list,
    refresh,
  } = useUserList();

  const onPressItem = (id: string) => {
    navigation.navigate(routeMap.UserRoutes.USER_DETAILS, { id });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      <SearchBar
        placeholder={"Pesquisar..."}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={list}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
        renderItem={({ item }) => (
          <UserListItem
            user={item}
            onPress={
              permission === UserPermission.ADMIN
                ? () => onPressItem(item.id)
                : undefined
            }
          />
        )}
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
