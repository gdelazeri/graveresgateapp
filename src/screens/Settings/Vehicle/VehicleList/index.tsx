import { FlatList, RefreshControl } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Loader from "@screens/components/loader";
import routeMap from "@routes/routeMap";
import Button from "@screens/components/button";
import VehicleItem from "./components/vehicleItem";

import useVehicleList from "./useVehicleList";
import Styled from "./styles";

interface VehicleListProps {
  navigation: NavigationProp<ParamListBase>;
}

const VehicleList = ({ navigation }: VehicleListProps) => {
  const {
    isLoading,
    isRefreshing,
    list,
    onRefresh
  } = useVehicleList()

  const onPressItem = (id: string) => {
    navigation.navigate(routeMap.UserRoutes.USER_DETAILS, { id })
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      <FlatList
        data={list}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <VehicleItem
            item={item}
            onPress={() => onPressItem(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Styled.Divider />}
      />
      <Styled.Footer>
        <Button
          title="Adicionar viatura"
          onPress={() => navigation.navigate('')}
        />
      </Styled.Footer>
    </Styled.Container>
  );
};

export default VehicleList;

export const NavHeader = ({ navigation }: VehicleListProps) => (
  <Header onBackPress={navigation.goBack} title="Viaturas" />
);
