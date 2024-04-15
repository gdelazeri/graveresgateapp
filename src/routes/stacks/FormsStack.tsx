import { createStackNavigator } from "@react-navigation/stack";
import * as FormsHomeScreen from "@screens/Forms/FormsHome";
import * as VehicleTripFormScreen from "@screens/Forms/VehicleTrip/VehicleTripForm";
import * as VehicleTripDetailsScreen from "@screens/Forms/VehicleTrip/VehicleTripDetails";
import * as VehicleTripListScreen from "@screens/Forms/VehicleTrip/VehicleTripList";
import * as SelectUserScreen from "@screens/Forms/SelectUser";
import * as DutyCareListScreen from "@screens/Forms/DutyCare/DutyCareList";
import * as DutyCareFormScreen from "@screens/Forms/DutyCare/DutyCareForm";
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
      name={routeMap.FormsRoutes.VEHICLE_TRIP_LIST}
      // @ts-ignore
      component={VehicleTripListScreen.default}
      // @ts-ignore
      options={{ header: VehicleTripListScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.SELECT_USER}
      // @ts-ignore
      component={SelectUserScreen.default}
      // @ts-ignore
      options={{ header: SelectUserScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.DUTY_CARE_LIST}
      // @ts-ignore
      component={DutyCareListScreen.default}
      // @ts-ignore
      options={{ header: DutyCareListScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.DUTY_CARE_FORM}
      // @ts-ignore
      component={DutyCareFormScreen.default}
      // @ts-ignore
      options={{ header: DutyCareFormScreen.NavHeader }}
    />
  </Stack.Navigator>
);

export default FormsStack;
