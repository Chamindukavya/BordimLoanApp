import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { databases } from '../AppwriteConfig';
import { getCurrentUser } from '../getCurrentUser'; // Import your authentication service

export default function DataScreen() {
  const [data, setData] = useState([]);
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

  const fetchData = async () => {
    try {
      const response = await databases.listDocuments('66c181690007b4d01c42', '66c181910037dc07645d');
      const filteredData = response.documents.filter(doc => 
        doc.amount > 0 && (doc.name1 === userName || doc.name2 === userName)
      );
      setData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userName]); // Fetch data when userName changes

  const handleDelete = async (documentId) => {
    try {
      await databases.deleteDocument('66c181690007b4d01c42', '66c181910037dc07645d', documentId);
      Alert.alert('Success', 'Data deleted successfully!');
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <View style={styles.refreshButton}>
        <Button title="Refresh" onPress={fetchData} color="#007BFF" />
      </View>
      <View>
        <Text style={styles.description}>Here are the transaction that you made with your friend</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>From: {item.name1}</Text>
            <Text style={styles.cardSubtitle}>To: {item.name2}</Text>
            <Text style={styles.cardDate}>{item.dateTime}</Text>
            <Text style={styles.cardAmount}>Amount: ${item.amount}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.$id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343A40',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    color: '#0000cd',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow effect
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343A40',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#495057',
    marginVertical: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#6C757D',
    marginVertical: 4,
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
    marginTop: 8,
  },
  deleteButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#DC3545',
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  refreshButton: {
    marginBottom: 16,
  },
});
