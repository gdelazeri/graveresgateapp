import * as WelcomeScreen from "../../screens/loggedOff/Welcome";
import * as SignUpScreen from "../../screens/loggedOff/SignUp";
import { createStackNavigator } from "@react-navigation/stack";
import routeMap from "../routeMap";

const Stack = createStackNavigator();

const LoggedOff = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routeMap.LoggedOffRoutes.WELCOME}
      component={WelcomeScreen.default}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routeMap.LoggedOffRoutes.SIGN_UP}
      component={SignUpScreen.default}
      options={{ header: SignUpScreen.NavHeader }}
    />
  </Stack.Navigator>
);

export default LoggedOff;
