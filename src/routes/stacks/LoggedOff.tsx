import * as WelcomeScreen from "@screens/loggedOff/Welcome";
import * as SignUpScreen from "@screens/loggedOff/SignUp";
import * as SignInScreen from "@screens/loggedOff/SignIn";
import { createStackNavigator } from "@react-navigation/stack";
import routeMap from "@routes/routeMap";

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
    <Stack.Screen
      name={routeMap.LoggedOffRoutes.SIGN_IN}
      component={SignInScreen.default}
      options={{ header: SignInScreen.NavHeader }}
    />
  </Stack.Navigator>
);

export default LoggedOff;
