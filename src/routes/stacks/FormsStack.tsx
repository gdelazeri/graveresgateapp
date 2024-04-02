import { createStackNavigator } from "@react-navigation/stack";
import * as FormsHomeScreen from "@screens/Forms/FormsHome";
import * as VehicleTripFormScreen from "@screens/Forms/VehicleTrip/VehicleTripForm";
import * as VehicleTripDetailsScreen from "@screens/Forms/VehicleTrip/VehicleTripDetails";
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
      name={routeMap.FormsRoutes.VEHICLE_TRIP_FORM}
      // @ts-ignore
      component={VehicleTripFormScreen.default}
      // @ts-ignore
      options={{ header: VehicleTripFormScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.VEHICLE_TRIP_DETAILS}
      // @ts-ignore
      component={VehicleTripDetailsScreen.default}
      // @ts-ignore
      options={{ header: VehicleTripDetailsScreen.NavHeader }}
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
