import { SectionList } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import { DutyPosition, DutyRequest } from "@api/dutyRequest/types";
import useDutySelectUser from "./useDutySelectUser";
import Loader from "@screens/components/loader";
import { User } from "@api/user/types";
import UserSelectListItem from "./components/UserListItem";
import ListHeader from "./components/ListHeader";
import Styled from "./styles";
import EmptyList from "@screens/components/emptyList";
import SearchBar from "@screens/components/searchBar";

interface DutySelectUserProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      title: string;
      dutyRequests: DutyRequest[];
      position: DutyPosition;
      usersAlreadySelected: string[];
      onSelect: (user: User) => void;
    };
  };
}

const DutySelectUser = ({ navigation, route }: DutySelectUserProps) => {
  const { dutyRequests, position, onSelect, usersAlreadySelected } =
    route.params;

  const { isLoading, searchValue, setSearchValue, sectionList } =
    useDutySelectUser({ position, dutyRequests, usersAlreadySelected });

  const onPressSelect = (user: User) => {
    onSelect(user);
    navigation.goBack();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <SearchBar
        placeholder="Pesquisar..."
        onChangeText={setSearchValue}
        value={searchValue}
      />
      <SectionList
        sections={sectionList}
        renderSectionHeader={({ section: { title, data } }) => (
          <ListHeader title={title} isEmpty={data.length === 0} />
        )}
        renderItem={({ item }) => (
          <UserSelectListItem user={item} onPress={() => onPressSelect(item)} />
        )}
        ItemSeparatorComponent={() => <Styled.DividerItem />}
        ListEmptyComponent={() => <EmptyList text="Nenhum" />}
      />
    </>
  );
};

export default DutySelectUser;

export const NavHeader = ({ navigation, route }: DutySelectUserProps) => {
  const { title } = route.params;
  return <Header title={title} onBackPress={navigation.goBack} />;
};
