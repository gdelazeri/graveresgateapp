import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Label from "@screens/components/label";
import Styled from "./styles";
import { useVehicleTripList } from "./useVehicleTripList";
import Loader from "@screens/components/loader";
import { FlatList, RefreshControl } from "react-native";
import EmptyList from "@screens/components/emptyList";
import CardHomeItem from "@screens/components/cardHomeItem";
import routeMap from "@routes/routeMap";
import VehicleTripListItem from "./components/vehicleTripListItem";

interface VehicleTripListProps {
  navigation: NavigationProp<ParamListBase>;
}

const VehicleTripList = ({ navigation }: VehicleTripListProps) => {
  const {
    isLoading,
    isRefreshing,
    list,
    onEndReached,
    onRefresh
  } = useVehicleTripList();

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      data={list}
      contentContainerStyle={{ padding: 16 }}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Styled.Divider />}
      renderItem={({ item }) => (
        <VehicleTripListItem
          onPress={() => navigation.navigate(routeMap.FormsRoutes.VEHICLE_TRIP_DETAILS, { id: item.id })}
          item={item}
        />
      )}
      ListEmptyComponent={() => <EmptyList text="Nenhum deslocamento encontrado" />}
      onEndReached={onEndReached}
    />
  );
};

export default VehicleTripList;

export const NavHeader = ({ navigation }: VehicleTripListProps) => (
  <Header onBackPress={navigation.goBack} title="Livro de deslocamento" />
);
