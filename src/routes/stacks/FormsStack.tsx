import { createStackNavigator } from "@react-navigation/stack";
import * as FormsHomeScreen from "@screens/Forms/FormsHome";
import routeMap from "@routes/routeMap";

const Stack = createStackNavigator();

const FormsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routeMap.FormsRoutes.FORMS_HOME}
      component={FormsHomeScreen.default}
      options={{ header: FormsHomeScreen.NavHeader }}
    />
  </Stack.Navigator>
);

export default FormsStack;
