import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RecipesIndexScreen from "../screens/recipesTab/recipesIndexScreen";

const Stack = createNativeStackNavigator();

const RecipesTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recipes" component={RecipesIndexScreen} />
    </Stack.Navigator>
  );
};

export default RecipesTabNavigator;