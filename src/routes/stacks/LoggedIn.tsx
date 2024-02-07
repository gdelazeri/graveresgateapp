import { createStackNavigator } from "@react-navigation/stack";
import * as HomeScreen from "@screens/Home";
import * as UserListScreen from "@screens/UserList";
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
      name={routeMap.LoggedInRoutes.USER_LIST}
      component={UserListScreen.default}
      options={{ header: UserListScreen.NavHeader }}
    />
  </Stack.Navigator>
);

export default LoggedIn;
