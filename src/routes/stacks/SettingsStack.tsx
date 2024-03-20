import { createStackNavigator } from "@react-navigation/stack";
import * as SettingsHomeScreen from "@screens/Settings/SettingsHome";
import * as VehicleListScreen from "@screens/Settings/Vehicle/VehicleList";
import * as VehicleFormScreen from "@screens/Settings/Vehicle/VehicleForm";
import routeMap from "@routes/routeMap";

const Stack = createStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routeMap.SettingsRoutes.SETTINGS_HOME}
      component={SettingsHomeScreen.default}
      options={{ header: SettingsHomeScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.SettingsRoutes.VEHICLE_LIST}
      component={VehicleListScreen.default}
      options={{ header: VehicleListScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.SettingsRoutes.VEHICLE_FORM}
      // @ts-ignore
      component={VehicleFormScreen.default}
      // @ts-ignore
      options={{ header: VehicleFormScreen.NavHeader }}
    />
  </Stack.Navigator>
);

export default SettingsStack;
