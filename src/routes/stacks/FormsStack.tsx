import { createStackNavigator } from "@react-navigation/stack";
import * as FormsHomeScreen from "@screens/Forms/FormsHome";
import * as FormVehicleTripScreen from "@screens/Forms/FormVehicleTrip";
import * as VehicleTripScreen from "@screens/Forms/VehicleTrip";
import * as SelectUserScreen from "@screens/Forms/SelectUser";
import routeMap from "@routes/routeMap";

const Stack = createStackNavigator();

const FormsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routeMap.FormsRoutes.FORMS_HOME}
      component={FormsHomeScreen.default}
      options={{ header: FormsHomeScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.FORM_VEHICLE_TRIP}
      // @ts-ignore
      component={FormVehicleTripScreen.default}
      // @ts-ignore
      options={{ header: FormVehicleTripScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.VEHICLE_TRIP}
      // @ts-ignore
      component={VehicleTripScreen.default}
      // @ts-ignore
      options={{ header: VehicleTripScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.SELECT_USER}
      // @ts-ignore
      component={SelectUserScreen.default}
      // @ts-ignore
      options={{ header: SelectUserScreen.NavHeader }}
    />
  </Stack.Navigator>
);

export default FormsStack;
