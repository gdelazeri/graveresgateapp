import { FlatList } from 'react-native';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import { DutyPosition } from "@api/dutyRequest/types";
import useSelectUser from './useSelectUser';
import Loader from '@screens/components/loader';
import { User } from '@api/user/types';
import Styled from './styles';
import EmptyList from '@screens/components/emptyList';
import SearchBar from '@screens/components/searchBar';
import UserListItem from '@screens/components/userListItem';

interface SelectUserProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      title: string;
      position: DutyPosition;
      onSelect: (user: User) => void;
    }
  }
}

const SelectUser = ({ navigation, route }: SelectUserProps) => {
  const { position, onSelect } = route.params;

  const {
    isLoading,
    searchValue,
    setSearchValue,
    list,
  } = useSelectUser({ position });

  const onPressSelect = (user: User) => {
    onSelect(user);
    navigation.goBack();
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <SearchBar
        placeholder="Pesquisar..."
        onChangeText={setSearchValue}
        value={searchValue}
      />
      <FlatList
        data={list}
        renderItem={({ item }) => <UserListItem user={item} onPress={() => onPressSelect(item)} />}
        ItemSeparatorComponent={() => <Styled.DividerItem />}
        ListEmptyComponent={() => <EmptyList text='Nenhum voluntário encontrado' />}
      />
    </>
  );
};

export default SelectUser;

export const NavHeader = ({ navigation, route }: SelectUserProps) => {
  const { title } = route.params
  return <Header title={title} onBackPress={navigation.goBack} />
};
