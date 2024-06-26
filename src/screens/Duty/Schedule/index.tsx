import { useEffect, useRef } from "react";
import moment from "moment";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { FlatList, RefreshControl } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import Header from "@screens/components/header";
import DutyItem from "./components/dutyItem";
import routeMap from "@routes/routeMap";
import Styled from "./styles";
import useSchedule from "./useSchedule";
import Loader from "@screens/components/loader";
import { LabelSizeValue } from "@screens/components/label/types";
import EmptyList from "@screens/components/emptyList";
import { useUserContext } from "@context/userContext";
import { UserPermission } from "@api/user/types";

interface ScheduleProps {
  navigation: NavigationProp<ParamListBase>;
}

const Schedule = ({ navigation }: ScheduleProps) => {
  const { userData } = useUserContext();
  const {
    isLoading,
    isRefreshing,
    refresh,
    list,
    periodOptions,
    period,
    onChangePeriod,
    onEndReached,
  } = useSchedule();
  const ref = useRef<FlatList>(null);

  useEffect(() => {
    if (!isLoading) {
      if (ref.current) {
        const date = moment().format("YYYY-MM-DD");
        const index = list.findIndex((item) => item.date >= date);
        if (index !== -1) {
          ref.current.scrollToIndex({ index, animated: true });
        }
      }
    }
  }, [isLoading]);

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
          onChangePeriod(
            periodOptions[event.nativeEvent.selectedSegmentIndex].value,
          );
        }}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <FlatList
          ref={ref}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
          }
          data={list}
          contentContainerStyle={{ padding: 16, paddingTop: 0 }}
          keyExtractor={(item) => `${item.date}_${item.shift}`}
          ItemSeparatorComponent={() => <Styled.Divider />}
          renderItem={({ item }) => (
            <DutyItem
              item={item}
              onPress={() => {
                navigation.navigate(routeMap.DutyRoutes.DUTY_DETAILS, {
                  duty: item,
                });
              }}
              disabled={userData?.permission !== UserPermission.ADMIN}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyList text="Nenhum plantão encontrado" />
          )}
          onEndReached={onEndReached}
          onScrollToIndexFailed={({ index }) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              ref.current?.scrollToIndex({ index, animated: true });
            });
          }}
        />
      )}
    </>
  );
};

export default Schedule;

export const NavHeader = ({ navigation }: ScheduleProps) => (
  <Header title="Escala de plantão" onBackPress={navigation.goBack} />
);
