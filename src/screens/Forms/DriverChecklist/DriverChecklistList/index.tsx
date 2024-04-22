import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import { useDriverChecklist } from "./useDriverChecklist";
import Loader from "@screens/components/loader";
import { FlatList, RefreshControl } from "react-native";
import EmptyList from "@screens/components/emptyList";
import routeMap from "@routes/routeMap";
import FooterContainer from "@screens/components/footerContainer";
import Button from "@screens/components/button";
import DriverChecklistItem from "./components/driverChecklistItem";
import Styled from "./styles";

interface DutyCareListProps {
  navigation: NavigationProp<ParamListBase>;
}

const DutyCareList = ({ navigation }: DutyCareListProps) => {
  const {
    isLoading,
    isRefreshing,
    list,
    onEndReached,
    onRefresh
  } = useDriverChecklist();

  const onPressAdd = () => {
    navigation.navigate(routeMap.FormsRoutes.DRIVER_CHECKLIST_FORM)
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
          <DriverChecklistItem item={item} onPress={() => navigation.navigate(routeMap.FormsRoutes.DRIVER_CHECKLIST_DETAILS, { id: item.id })} />
        )}
        ListEmptyComponent={() => <EmptyList text="Nenhum checklist encontrado" />}
        onEndReached={onEndReached}
      />
      <FooterContainer>
        <Button
          title="Novo checklist"
          onPress={onPressAdd}
        />
      </FooterContainer>
    </Styled.Container>
  );
};

export default DutyCareList;

export const NavHeader = ({ navigation }: DutyCareListProps) => (
  <Header onBackPress={navigation.goBack} title="Checklists Condutor" />
);
