import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { account } from '../AppwriteConfig';
import { getCurrentUser } from '../getCurrentUser';

export default function SignoutScreen({ navigation }) {
  const [userName, setUserName] = useState('');

  // Fetch the logged-in user's name
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await getCurrentUser();
        setUserName(user.name || ''); // Adjust this based on your actual user object
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    fetchUserName();
  }, []);

  const Signout = async () => {
    try {
      await account.deleteSessions('current');
      console.log('Signed Out');
      // Navigate to login screen or another screen after signing out
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {userName ? `You are logged in as ${userName}` : 'Please log in'}
      </Text>
      <Button title="Sign Out" onPress={Signout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
