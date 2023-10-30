import SignUp from '../../screens/loggedOff/SignUp';
import { createStackNavigator } from '@react-navigation/stack';

export enum LoggedOffRoutes {
  STACK = 'LoggedOff',
  LOGGED_OFF_SIGN_UP = 'LoggedOffSignUp'
}

const Stack = createStackNavigator();

const LoggedOff = () => (
  <Stack.Navigator>
    <Stack.Screen name={LoggedOffRoutes.LOGGED_OFF_SIGN_UP} component={SignUp} />
  </Stack.Navigator>
);

export default LoggedOff;
