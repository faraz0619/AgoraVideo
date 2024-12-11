import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = `http://192.168.100.126:3000/api`;

const PostAPI = async (endpoint, params, requireToken = true) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    };
    if (requireToken) {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        throw new Error(
          'Authentication token is missing. Please log in again.',
        );
      }
    }
    const response = await axios.post(`${BASE_URL}/${endpoint}`, params, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('API POST Error:', error.response?.data || error.message);
    throw (
      error.response?.data?.error || 'Something went wrong. Please try again.'
    );
  }
};

export default PostAPI;
