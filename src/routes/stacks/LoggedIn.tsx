import { createStackNavigator } from "@react-navigation/stack";
import * as HomeScreen from "@screens/Home";
import UserStack from "@routes/stacks/UserStack";
import DutyStack from "@routes/stacks/DutyStack";
import routeMap from "@routes/routeMap";

const Stack = createStackNavigator();

const LoggedIn = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routeMap.LoggedInRoutes.HOME}
      component={HomeScreen.default}
      options={{ header: HomeScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.UserRoutes.STACK}
      component={UserStack}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routeMap.DutyRoutes.STACK}
      component={DutyStack}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default LoggedIn;
