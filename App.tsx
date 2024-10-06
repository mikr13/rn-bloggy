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
        {/* <Stack.Navigator screenOptions={{ headerTitle: "Blogs" }}> // NOTE: can also do this way to avoid having to create custom header component, but mine is better!
          <Stack.Screen
            name="Index"
            component={IndexScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Create")}>
                  <Feather name="plus" size={30} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Show"
            component={ShowScreen}
            options={({ route, navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Edit", { id: route.params.id })
                  }
                >
                  <EvilIcons name="pencil" size={35} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Create" component={CreateScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator> */}
      </ReactQueryProvider>
    </NavigationContainer>
  );
}

