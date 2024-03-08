import { createStackNavigator } from "@react-navigation/stack";
import * as DutyHomeScreen from "@screens/Duty/DutyHome";
import * as DutyRequestScreen from "@screens/Duty/DutyRequest";
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
  </Stack.Navigator>
);

export default DutyStack;
