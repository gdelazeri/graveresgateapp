import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { FlatList, RefreshControl } from "react-native";

import Header from "@screens/components/header";
import useDutyRequestList from "./useDutyRequestList";
import DutyRequestItem from "./components/dutyRequestItem";
import routeMap from "@routes/routeMap";
import Styled from "./styles";
import Loader from "@screens/components/loader";
import EmptyList from "@screens/components/emptyList";

interface DutyRequestListProps {
  navigation: NavigationProp<ParamListBase>;
}

const DutyRequestList = ({ navigation }: DutyRequestListProps) => {
  const { isLoading, isRefreshing, list, onRefresh } = useDutyRequestList();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      data={list}
      contentContainerStyle={{ padding: 16 }}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Styled.Divider />}
      ListEmptyComponent={
        <EmptyList text="Você não possui solicitações de plantão" />
      }
      renderItem={({ item }) => (
        <DutyRequestItem
          item={item}
          onPress={() => {
            navigation.navigate(routeMap.DutyRoutes.DUTY_REQUEST_DETAILS, {
              id: item.id,
            });
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
