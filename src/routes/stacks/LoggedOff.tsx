import WelcomeScreen from '../../screens/loggedOff/Welcome';
import { createStackNavigator } from '@react-navigation/stack';

export enum LoggedOffRoutes {
  STACK = 'LoggedOff',
  WELCOME = 'Welcome'
}

const Stack = createStackNavigator();

const LoggedOff = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={LoggedOffRoutes.WELCOME}
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default LoggedOff;
