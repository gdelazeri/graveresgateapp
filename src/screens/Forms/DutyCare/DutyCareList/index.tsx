import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Styled from "./styles";
import { useDutyCareList } from "./useDutyCareList";
import Loader from "@screens/components/loader";
import { FlatList, RefreshControl } from "react-native";
import EmptyList from "@screens/components/emptyList";
import routeMap from "@routes/routeMap";
import DutyCareListItem from "./components/dutyCareListItem";
import FooterContainer from "@screens/components/footerContainer";
import Button from "@screens/components/button";

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
  } = useDutyCareList();

  const onPressAdd = () => {
    navigation.navigate(routeMap.FormsRoutes.DUTY_CARE_FORM)
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
          <DutyCareListItem
            onPress={() => navigation.navigate(routeMap.FormsRoutes.DUTY_CARE_FORM, { id: item.id })}
            item={item}
          />
        )}
        ListEmptyComponent={() => <EmptyList text="Nenhum atendimento encontrado" />}
        onEndReached={onEndReached}
      />
      <FooterContainer>
        <Button
          title="Novo atendimento"
          onPress={onPressAdd}
        />
      </FooterContainer>
    </Styled.Container>
  );
};

export default DutyCareList;

export const NavHeader = ({ navigation }: DutyCareListProps) => (
  <Header onBackPress={navigation.goBack} title="Fichas de atendimento" />
);
