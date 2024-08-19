
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DataScreen from './screens/DataScreen';
import SignupScreen from './screens/SignupScreen';
import SignoutScreen from './screens/SignoutScreen';

// Create the stack navigator
const Stack = createStackNavigator();

// Create the tab navigator
const Tab = createBottomTabNavigator();

function HomeTabs() {

  const [userName, setUserName] = useState('');

  // Fetch the logged-in user's name
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await getCurrentUser();
        setUserName(user.name); // Adjust this based on your actual user object
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    fetchUserName();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transactions" component={DataScreen} />

      
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Signout" component={SignoutScreen} />
    

      
    </Tab.Navigator>
  );
}

export default function App() {

  


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
