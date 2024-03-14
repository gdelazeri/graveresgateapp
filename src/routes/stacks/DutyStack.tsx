import { createStackNavigator } from "@react-navigation/stack";
import * as DutyHomeScreen from "@screens/Duty/DutyHome";
import * as DutyRequestScreen from "@screens/Duty/DutyRequest";
import * as DutyRequestListScreen from "@screens/Duty/DutyRequestList";
import * as DutyRequestDetailsScreen from "@screens/Duty/DutyRequestDetails";
import * as ScheduleScreen from "@screens/Duty/Schedule";
import * as DutyFormScreen from "@screens/Duty/DutyForm";
import * as DutySelectUserScreen from "@screens/Duty/DutySelectUser";
import routeMap from "@routes/routeMap";

const Stack = createStackNavigator();

const DutyStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routeMap.DutyRoutes.DUTY_HOME}
      component={DutyHomeScreen.default}
      options={{ header: DutyHomeScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.DutyRoutes.CREATE_DUTY_REQUEST}
      component={DutyRequestScreen.default}
      options={{ header: DutyRequestScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.DutyRoutes.LIST_DUTY_REQUEST}
      component={DutyRequestListScreen.default}
      options={{ header: DutyRequestListScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.DutyRoutes.DUTY_REQUEST_DETAILS}
      // @ts-ignore
      component={DutyRequestDetailsScreen.default}
      // @ts-ignore
      options={{ header: DutyRequestDetailsScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.DutyRoutes.SCHEDULE}
      component={ScheduleScreen.default}
      options={{ header: ScheduleScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.DutyRoutes.DUTY_FORM}
      // @ts-ignore
      component={DutyFormScreen.default}
      // @ts-ignore
      options={{ header: DutyFormScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.DutyRoutes.DUTY_SELECT_USER}
      // @ts-ignore
      component={DutySelectUserScreen.default}
      // @ts-ignore
      options={{ header: DutySelectUserScreen.NavHeader }}
    />
  </Stack.Navigator>
);

export default DutyStack;
