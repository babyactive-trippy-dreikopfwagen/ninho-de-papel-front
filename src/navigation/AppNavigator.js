import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { AllProducts } from '../screens/AllProducts';
import { ProductDetail } from '../screens/ProductDetail';
import { Cart } from '../screens/Cart';
import { CustomDrawerContent } from '../components/CustomDrawer';
import { Cadastro } from '../screens/Cadastro';
import { Login } from '../screens/Login';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

/**
 * Stack Navigator principal com todas as telas do app
 */
function MainStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }} 
      initialRouteName="HomeScreen"
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="AllProducts" component={AllProducts} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

/**
 * Navegador raiz com Drawer lateral
 */
export const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: '85%',
        },
      }}
    >
      <Drawer.Screen name="Main" component={MainStack} />
    </Drawer.Navigator>
  );
};