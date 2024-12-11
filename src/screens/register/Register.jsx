import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles';
import {useAuth} from '../../contextAPI/AuthContext';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const {register} = useAuth();
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    try {
      const message = await register(username, email, password);
      console.log('Success', message || 'User registered successfully');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration Failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Username Field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Email Field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Field */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconButton}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="#007BFF"
          />
        </TouchableOpacity>
      </View>

      {/* Register Button */}
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      {/* Already have an account? Login */}
      <TouchableOpacity
        onPress={() => navigation?.navigate('Login')}
        style={styles.loginRedirect}>
        <Text style={styles.loginRedirectText}>
          Already have an account?{' '}
          <Text style={styles.loginRedirectLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
