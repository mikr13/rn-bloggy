import { ReactQueryProvider } from "@/providers/react-query";
import { CreateOrEditScreen } from "@/screens/CreateOrEditScreen";
import { DetailScreen } from "@/screens/DetailScreen";
import { IndexScreen } from "@/screens/IndexScreen";
import { RootStackParamList } from "@/types/routes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <ReactQueryProvider>
        <Stack.Navigator initialRouteName='Index' screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="Index" component={IndexScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="CreateOrEdit" component={CreateOrEditScreen} />
        </Stack.Navigator>
      </ReactQueryProvider>
    </NavigationContainer>
  );
}

