import { Text,Image, StyleSheet, Platform, View, TextInput, TouchableOpacity, Button } from 'react-native';
declare module 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Feather';
import {useState } from 'react';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';




export default function HomeScreen() {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  
  return (
    <View style={styles.firstpage}>
      <View style={styles.logo}>
        <Image source = {require('../../assets/images/atlas-sports-logo-crop.webp')} style={{ width: 230, height: 230 }}></Image>
      </View>
      <View>
        <Text style={styles.header}>Sign Up</Text>
      </View>
      <View>
        <Text style={styles.instructions}>Please enter your valid data{"\n"}</Text>
      </View>
      <View>
        <TextInput 
          style={styles.emailInput}
          keyboardType="email-address" 
          placeholder="Enter your email"
          placeholderTextColor="#A1A1A1" ></TextInput>

          
        {/* Password Input with Eye Icon */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.pwInput}
            placeholder="Enter your password"
            placeholderTextColor="#A1A1A1"
            secureTextEntry={!isPasswordVisible} // Toggles visibility
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setIsAgreed(!isAgreed)} style={styles.checkbox}>
          <Icon
            name={isAgreed ? 'check-square' : 'square'}
            size={24}
            color={isAgreed ? 'green' : 'gray'}
          />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>I agree to terms and conditions</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.contButton} onPress={() => console.log('Continue')}>
          
          {/* Button Text */}
          <Text style={styles.contButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.between}>
        <Text >OR</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Google Sign Up')}>
        {/* Google Icon */}
        <Image
          source={require('../../assets/images/google-icon.webp')} // Ensure the image is in your assets folder
          style={styles.icon}
        />
        {/* Button Text */}
        <Text style={styles.buttonText}>Sign Up with Google</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.alt} onPress={() => router.push('/login')}>
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  firstpage: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 2,
  },
  logo: {
    marginTop: 65,
    marginBottom: 0,
  },
  header: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emailInput: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pwInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  iconContainer: {
    padding: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom:40
  },
  checkbox: {
    marginRight: 10,
    borderRadius:20,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000',
  },
  contButton: {
    flexDirection: 'row', // Align icon and text
    alignItems: 'center',
    backgroundColor: 'black', // Red background
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30, // Rounded edges
    width: 300,
    justifyContent: 'center',
    marginBottom: 15,
  },
  
  contButtonText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
  between: {
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row', // Align icon and text
    alignItems: 'center',
    backgroundColor: '#FF6B6B', // Red background
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30, // Rounded edges
    width: 300,
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10, // Space between icon and text
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
  

  
  alt: {

  }
  
});
