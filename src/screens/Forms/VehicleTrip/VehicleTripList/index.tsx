import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Styled from "./styles";
import { useVehicleTripList } from "./useVehicleTripList";
import Loader from "@screens/components/loader";
import { FlatList, RefreshControl } from "react-native";
import EmptyList from "@screens/components/emptyList";
import routeMap from "@routes/routeMap";
import VehicleTripListItem from "./components/vehicleTripListItem";
import FooterContainer from "@screens/components/footerContainer";
import Button from "@screens/components/button";

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

  const onPressAdd = () => {
    navigation.navigate(routeMap.FormsRoutes.VEHICLE_TRIP_FORM)
  }

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <Styled.Container>
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
      <FooterContainer>
        <Button
          title="Novo deslocamento"
          onPress={onPressAdd}
        />
      </FooterContainer>
    </Styled.Container>
  );
};

export default VehicleTripList;

export const NavHeader = ({ navigation }: VehicleTripListProps) => (
  <Header onBackPress={navigation.goBack} title="Livro de deslocamento" />
);
