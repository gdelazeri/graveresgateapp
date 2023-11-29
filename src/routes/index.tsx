import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RouteMap from "@routes/routeMap";
import LoggedOff from "@routes/stacks/LoggedOff";
import LoggedIn from "@routes/stacks/LoggedIn";
import { useUserContext } from "@context/userContext";
import { isString } from "@utils/stringHelper";

const Stack = createStackNavigator();

const Navigator = () => {
  const { accessToken } = useUserContext();
  const isLoggedIn = isString(accessToken);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn && (
          <Stack.Screen
            name={RouteMap.LoggedOffRoutes.STACK}
            component={LoggedOff}
            options={{ headerShown: false }}
          />
        )}
        {isLoggedIn && (
          <Stack.Screen
            name={RouteMap.LoggedInRoutes.STACK}
            component={LoggedIn}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default Navigator;
