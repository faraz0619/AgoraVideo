import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Button,
} from 'react-native';
import {useAuth} from '../../contextAPI/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomHeader} from '../../components';
import notifee, {AndroidImportance} from '@notifee/react-native';

const Home = () => {
  const {logout} = useAuth();
  const [getUser, setGetUser] = useState('');

  async function onDisplayNotification() {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'default',
      vibration: true,
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Faraz Ahmed',
      body: 'How are you???',
      android: {
        channelId,
        // vibrationPattern: [500, 1000, 500],
        sound: 'default',
        pressAction: {
          id: 'default',
        },
      },
    });
  }

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
      <CustomHeader
        showLogout={true}
        onLogout={handleLogout}
        username={getUser?.username}
      />
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});