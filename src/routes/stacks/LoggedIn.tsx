import { createStackNavigator } from "@react-navigation/stack";
import * as HomeScreen from "@screens/loggedIn/Home";
import routeMap from "@routes/routeMap";

const Stack = createStackNavigator();

const LoggedIn = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routeMap.LoggedInRoutes.HOME}
      component={HomeScreen.default}
      options={{ header: HomeScreen.NavHeader }}
    />
  </Stack.Navigator>
);

export default LoggedIn;
