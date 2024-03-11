import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { FlatList } from "react-native";

import Header from "@screens/components/header";
import useDutyRequestList from "./useDutyRequestList";
import DutyRequestItem from "./components/dutyRequestItem";
import routeMap from "@routes/routeMap";

interface DutyRequestListProps {
  navigation: NavigationProp<ParamListBase>;
}

const DutyRequestList = ({ navigation }: DutyRequestListProps) => {
  const {
    list
  } = useDutyRequestList();

  return (
    <FlatList
      data={list}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <DutyRequestItem
          item={item}
          onPress={() => {
            navigation.navigate(routeMap.DutyRoutes.CREATE_DUTY_REQUEST, { id: item.id })
          }}
        />
      )}
    />
  );
};

export default DutyRequestList;

export const NavHeader = ({ navigation }: DutyRequestListProps) => (
  <Header title="Minhas solicitações" onBackPress={navigation.goBack} />
);
