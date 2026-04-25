import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { COLORS } from '../../globals/colors';

const Stack = createStackNavigator();

const opcionesHeader = {
  headerStyle: { backgroundColor: COLORS.card },
  headerTintColor: COLORS.white,
  headerTitleStyle: { fontWeight: 'bold' },
  headerBackTitleVisible: false,
};

export default function AppNavigator() {
  const { usuario } = useSelector((s) => s.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={opcionesHeader}>
        {usuario ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: '🌤 ClimaApp', headerLeft: () => null }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ title: '🔍 Buscar ciudad' }}
            />
            <Stack.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{ title: '⭐ Mis favoritos' }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}