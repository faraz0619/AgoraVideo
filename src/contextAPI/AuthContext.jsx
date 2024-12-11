import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PostAPI from '../components/src/APIRequest';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);
  const login = async (email, password) => {
    try {
      const response = await PostAPI('login', {email, password}, false);
      console.log('Login Success:', response);
      if (response) {
        const {token, user} = response;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(user));

        setToken(token);
        setUser(user);
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      const response = await axios.post(
        'http://192.168.100.126:3000/api/register',
        {username, email, password},
      );
      if (response.status === 200) {
        return response.data.message;
      }
    } catch (error) {
      console.error('Register error:', error.response?.data || error.message);
      throw (
        error.response?.data?.error || 'Registration failed. Please try again.'
      );
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userInfo');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error.message);
      throw 'Logout failed. Please try again.';
    }
  };

  return (
    <AuthContext.Provider value={{token, user, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
