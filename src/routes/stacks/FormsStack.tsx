import { createStackNavigator } from "@react-navigation/stack";
import * as FormsHomeScreen from "@screens/Forms/FormsHome";
import * as VehicleTripFormScreen from "@screens/Forms/VehicleTrip/VehicleTripForm";
import * as VehicleTripDetailsScreen from "@screens/Forms/VehicleTrip/VehicleTripDetails";
import * as VehicleTripListScreen from "@screens/Forms/VehicleTrip/VehicleTripList";
import * as SelectUserScreen from "@screens/Forms/SelectUser";
import * as DutyCareListScreen from "@screens/Forms/DutyCare/DutyCareList";
import * as DutyCareDetailsScreen from "@screens/Forms/DutyCare/DutyCareDetails";
import * as DutyCareFormScreen from "@screens/Forms/DutyCare/DutyCareForm";
import * as DriverChecklistFormScreen from "@screens/Forms/DriverChecklist/DriverChecklistForm";
import * as DriverChecklistListScreen from "@screens/Forms/DriverChecklist/DriverChecklistList";
import * as DriverChecklistDetailsScreen from "@screens/Forms/DriverChecklist/DriverChecklistDetails";
import * as RescuerChecklistFormScreen from "@screens/Forms/RescuerChecklist/RescuerChecklistForm";
import * as RescuerChecklistListScreen from "@screens/Forms/RescuerChecklist/RescuerChecklistList";
import * as RescuerChecklistDetailsScreen from "@screens/Forms/RescuerChecklist/RescuerChecklistDetails";
import * as RadioOperatorChecklistFormScreen from "@screens/Forms/RadioOperatorChecklist/RadioOperatorChecklistForm";
import * as RadioOperatorChecklistListScreen from "@screens/Forms/RadioOperatorChecklist/RadioOperatorChecklistList";
import * as RadioOperatorChecklistDetailsScreen from "@screens/Forms/RadioOperatorChecklist/RadioOperatorChecklistDetails";
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
      component={DutyCareListScreen.default}
      options={{ header: DutyCareListScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.DUTY_CARE_DETAILS}
      // @ts-ignore
      component={DutyCareDetailsScreen.default}
      // @ts-ignore
      options={{ header: DutyCareDetailsScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.DUTY_CARE_FORM}
      // @ts-ignore
      component={DutyCareFormScreen.default}
      // @ts-ignore
      options={{ header: DutyCareFormScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.DRIVER_CHECKLIST_FORM}
      component={DriverChecklistFormScreen.default}
      options={{ header: DriverChecklistFormScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.DRIVER_CHECKLIST_LIST}
      component={DriverChecklistListScreen.default}
      options={{ header: DriverChecklistListScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.DRIVER_CHECKLIST_DETAILS}
      // @ts-ignore
      component={DriverChecklistDetailsScreen.default}
      // @ts-ignore
      options={{ header: DriverChecklistDetailsScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.RESCUER_CHECKLIST_FORM}
      component={RescuerChecklistFormScreen.default}
      options={{ header: RescuerChecklistFormScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.RESCUER_CHECKLIST_LIST}
      component={RescuerChecklistListScreen.default}
      options={{ header: RescuerChecklistListScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.RESCUER_CHECKLIST_DETAILS}
      // @ts-ignore
      component={RescuerChecklistDetailsScreen.default}
      // @ts-ignore
      options={{ header: RescuerChecklistDetailsScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.RADIO_OPERATOR_CHECKLIST_FORM}
      component={RadioOperatorChecklistFormScreen.default}
      options={{ header: RadioOperatorChecklistFormScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.RADIO_OPERATOR_CHECKLIST_LIST}
      component={RadioOperatorChecklistListScreen.default}
      options={{ header: RadioOperatorChecklistListScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.FormsRoutes.RADIO_OPERATOR_CHECKLIST_DETAILS}
      // @ts-ignore
      component={RadioOperatorChecklistDetailsScreen.default}
      // @ts-ignore
      options={{ header: RadioOperatorChecklistDetailsScreen.NavHeader }}
    />
  </Stack.Navigator>
);

export default FormsStack;
