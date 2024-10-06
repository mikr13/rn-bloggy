import { ReactQueryProvider } from "@/providers/react-query";
import { CreateScreen } from "@/screens/CreateScreen";
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
          <Stack.Screen name="Create" component={CreateScreen} />
        </Stack.Navigator>
      </ReactQueryProvider>
    </NavigationContainer>
  );
}

