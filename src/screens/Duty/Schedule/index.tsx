import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { FlatList, RefreshControl } from "react-native";
import SegmentedControl from '@react-native-segmented-control/segmented-control'

import Header from "@screens/components/header";
import DutyItem from "./components/dutyItem";
import routeMap from "@routes/routeMap";
import Styled from "./styles";
import useSchedule from "./useSchedule";
import Loader from "@screens/components/loader";
import { LabelSizeValue } from "@screens/components/label/types";
import EmptyList from "@screens/components/emptyList";

interface ScheduleProps {
  navigation: NavigationProp<ParamListBase>;
}

const Schedule = ({ navigation }: ScheduleProps) => {
  const {
    isLoading,
    isRefreshing,
    refresh,
    list,
    periodOptions,
    period,
    setPeriod
  } = useSchedule();

  return (
    <>
      <SegmentedControl
        style={{ margin: 16 }}
        testID="segmentedPickerTestId"
        values={periodOptions.map((item) => item.label)}
        selectedIndex={periodOptions.findIndex((item) => item.value === period)}
        fontStyle={{ fontSize: LabelSizeValue.small }}
        activeFontStyle={{ fontSize: LabelSizeValue.small }}
        onChange={(event) => {
          setPeriod(periodOptions[event.nativeEvent.selectedSegmentIndex].value)
        }}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <FlatList
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
          data={list}
          contentContainerStyle={{ padding: 16, paddingTop: 0 }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Styled.Divider />}
          renderItem={({ item }) => (
            <DutyItem
              item={item}
              onPress={() => {
                navigation.navigate(routeMap.DutyRoutes.DUTY_REQUEST_DETAILS, { id: item.id })
              }}
            />
          )}
          ListEmptyComponent={() => <EmptyList text="Nenhum plantão encontrado" />}
        />
      )}
    </>
  );
};

export default Schedule;

export const NavHeader = ({ navigation }: ScheduleProps) => (
  <Header title="Escala de plantão" onBackPress={navigation.goBack} />
);
