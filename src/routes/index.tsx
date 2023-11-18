import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoggedOff from './stacks/LoggedOff';
import RouteMap from './routeMap';

const Stack = createStackNavigator();

const Navigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name={RouteMap.LoggedOffRoutes.STACK}
        component={LoggedOff}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

export default Navigator;