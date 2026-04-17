import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductList from "../screens/ProductList";
import ProductDetail from "../screens/ProductDetail";
import Login from "../screens/Login";

const AppStack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <AppStack.Screen name="ProductList" component={ProductList} />
        <AppStack.Screen name="ProductDetail" component={ProductDetail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
