import { createStackNavigator } from "@react-navigation/stack";
import * as UserListScreen from "@screens/Users/UserList";
import * as UserDetailsScreen from "@screens/Users/UserDetails";
import routeMap from "@routes/routeMap";

const Stack = createStackNavigator();

const LoggedIn = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routeMap.UserRoutes.USER_LIST}
      component={UserListScreen.default}
      options={{ header: UserListScreen.NavHeader }}
    />
    <Stack.Screen
      name={routeMap.UserRoutes.USER_DETAILS}
      // @ts-ignore
      component={UserDetailsScreen.default}
      // @ts-ignore
      options={{ header: UserDetailsScreen.NavHeader }}
    />
  </Stack.Navigator>
);

export default LoggedIn;
