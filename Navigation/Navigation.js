import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../screens/LoginScreen";

import SignupScreen from "../screens/SignupScreen";
import ContactsScreen from "../screens/ContactsScreen";

import { Colors } from "../constants/styles";

import AuthContentProvider, { AuthContext } from "../store/auth-context";
import IconButton from "../components/UI/IconButton";

import AppLoading from "expo-app-loading";
import { View, Text } from "react-native";
import AddScreen from "../screens/AddScreen";
import ContactsContextProvider from "../util/contacts-context";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      })}
    >
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={({ navigation }) => ({
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              color={tintColor}
              size={24}
              onPress={() => {
                navigation.navigate("Add");
              }}
            />
          ),
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Add"
        component={AddScreen}
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "vertical",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <ContactsContextProvider>
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
    </ContactsContextProvider>
  );
}

function Root() {
  const [isTryingLogin, setisTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setisTryingLogin(false);
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    return (
      <View>
        <Text>AppLoading</Text>
      </View>
    );
  }

  return <Navigation />;
}

export default function NavigationComponent() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContentProvider>
        <Root />
      </AuthContentProvider>
    </>
  );
}
