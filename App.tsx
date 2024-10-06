import { ReactQueryProvider } from "@/providers/react-query";
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
        <Stack.Navigator initialRouteName='Index'>
          <Stack.Screen name="Index" component={IndexScreen} />
        </Stack.Navigator>
      </ReactQueryProvider>
    </NavigationContainer>
  );
}

