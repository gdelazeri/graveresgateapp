import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import Header from "@screens/components/header";
import { useDutyCareList } from "./useDutyCareList";
import Loader from "@screens/components/loader";
import { FlatList, RefreshControl } from "react-native";
import EmptyList from "@screens/components/emptyList";
import routeMap from "@routes/routeMap";
import DutyCareListItem from "@screens/components/dutyCareListItem";
import FooterContainer from "@screens/components/footerContainer";
import Button from "@screens/components/button";
import colors from "@theme/colors";
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
          <ListItem
            Component={TouchableScale}
            // @ts-ignore
            friction={90}
            tension={100}
            activeScale={0.95}
            style={{
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              backgroundColor: colors.Greyscale.b100,
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => navigation.navigate(routeMap.FormsRoutes.DUTY_CARE_DETAILS, { id: item.id })}
            containerStyle={{ borderRadius: 8 }}
          >
            <ListItem.Content>
              <DutyCareListItem item={item} />
            </ListItem.Content>
          </ListItem>
        )}
        ListEmptyComponent={() => <EmptyList text="Nenhum atendimento encontrado" />}
        onEndReached={onEndReached}
      />
      <FooterContainer>
        <Button
          title="Nova ficha de atendimento"
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
