import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShoppingCart from "../screens/shoppingCartTab/shoppingCart";

const Stack = createNativeStackNavigator();

const ShopingCartTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Shopping Cart" component={ShoppingCart} />
    </Stack.Navigator>
  );
};

export default ShopingCartTabNavigator;