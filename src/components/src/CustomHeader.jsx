import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomHeader = ({username = 'Guest', showLogout = false, onLogout}) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{uri: 'https://via.placeholder.com/50'}}
        style={styles.profileImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.usernameText}>{username}!</Text>
      </View>
      {showLogout && (
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Icon name="logout" size={30} color="#333" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    color: '#888',
  },
  usernameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 5,
    marginLeft: 10,
  },
});
