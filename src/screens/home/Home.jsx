import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {useAuth} from '../../contextAPI/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const {logout} = useAuth();
  const [getUser, setGetUser] = useState('');
  const loadUserData = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');

      if (userInfoString) {
        const user = JSON.parse(userInfoString);
        setGetUser(user);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };
  useEffect(() => {
    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Logout Failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {getUser.username}!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
