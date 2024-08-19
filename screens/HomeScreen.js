import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { databases } from '../AppwriteConfig';
import { getCurrentUser } from '../getCurrentUser';

export default function HomeScreen({ navigation }) {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [userName, setUserName] = useState('');
  const [amount, setAmount] = useState('');
  const [dateTime, setDateTime] = useState('');

  const fetchUserName = async () => {
    try {
      const user = await getCurrentUser();
      setUserName(user.name || ''); // Ensure fallback if user.name is undefined
    } catch (error) {
      setUserName('');
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const handleSave = async () => {
    if (!name1 || !name2 || !amount || !dateTime) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      console.log(name1, name2, amount, dateTime);
      const data = {
        name1,
        name2,
        amount: parseFloat(amount),
        dateTime,
      };
      await databases.createDocument('66c181690007b4d01c42', '66c181910037dc07645d', 'unique()', data);
      Alert.alert('Success', 'Data saved successfully!');
      navigation.navigate('Transactions');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  const refreshData = () => {
    fetchUserName();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hello, {userName}</Text>
      <View style={styles.refreshButton}>      
        <Button title="Refresh" onPress={refreshData} color="#007BFF"  />
      </View>
      <View>
        <Text style={styles.description}>Add Transaction that you made with your friend</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Your Name"
          onChangeText={setName1}
          value={name1}
          style={styles.input}
        />
        <TextInput
          placeholder="Friend's Name"
          onChangeText={setName2}
          value={name2}
          style={styles.input}
        />
        <TextInput
          placeholder="Amount"
          keyboardType="numeric"
          onChangeText={setAmount}
          value={amount}
          style={styles.input}
        />
        <TextInput
          placeholder="Date/Time"
          onChangeText={setDateTime}
          value={dateTime}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} color="#28A745" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  description: {
    fontSize: 20,
    color: '#0000cd',
    marginBottom: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343A40',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderColor: '#CED4DA',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  buttonContainer: {
    marginTop: 0,
  },
  refreshButton: {
    paddingBottom: 16,
  },
});
