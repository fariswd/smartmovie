import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TvScreen from '../screens/TvScreen'
import MovieScreen from '../screens/MovieScreen'
import WatchlistScreen from '../screens/WatchlistScreen'
import ListShowScreen from '../screens/ListShowScreen'
import DetailScreen from '../screens/DetailScreen'

import colors from '../constants/colors'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function tabNav(){
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Movie') {
            iconName = focused
              ? 'videocam'
              : 'videocam-outline';
          } else if (route.name === 'Tv') {
            iconName = focused ? 'tv' : 'tv-outline';
          } else if (route.name === 'Watchlist') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.blood,
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Movie" component={MovieScreen} />
      <Tab.Screen name="Tv" component={TvScreen} />
      <Tab.Screen name="Watchlist" component={WatchlistScreen} />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={tabNav} options={{headerTitleAlign: 'center', title: 'smartmovie'}} />
        <Stack.Screen name="ListShow" component={ListShowScreen} options={{title: ''}} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{title: ''}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

