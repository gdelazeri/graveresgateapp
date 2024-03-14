import { SectionList } from 'react-native';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Label from "@screens/components/label";
import { DutyPosition, DutyRequest } from "@api/dutyRequest/types";
import useDutySelectUser from './useDutySelectUser';
import Loader from '@screens/components/loader';
import { User } from '@api/user/types';
import UserListItem from '@screens/Users/UserList/components/UserListItem';

interface DutySelectUserProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      dutyRequests: DutyRequest[];
      position: DutyPosition;
      onSelect: (user: User) => void;
    }
  }
}

const DutySelectUser = ({ navigation, route }: DutySelectUserProps) => {
  const { dutyRequests, position, onSelect } = route.params;

  const {
    isLoading,
    sectionList,
  } = useDutySelectUser({ position, dutyRequests });

  const onPressSelect = (user: User) => {
    onSelect(user);
    navigation.goBack();
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <SectionList
      sections={sectionList}
      renderSectionHeader={({ section: { title } }) => <Label>{title}</Label>}
      renderItem={({ item }) => <UserListItem user={item} onPress={() => onPressSelect(item)} />}
    />
  );
};

export default DutySelectUser;

export const NavHeader = ({ navigation }: DutySelectUserProps) => {
  return <Header title="Selecione o voluntário" onBackPress={navigation.goBack} />
};
