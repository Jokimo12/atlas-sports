
import { View, Text, StyleSheet, Image, TextInput, Button, Touchable, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
    const router = useRouter();

    return(
        <View style={styles.container}>
        
            <Image source = {require('../assets/images/atlas-sports-logo-crop.webp')} style={{ width: 230, height: 230 }}></Image>

            <View>
                <TextInput 
                    style={styles.emailInput}
                    keyboardType="email-address" 
                    placeholder="Enter your email"
                    placeholderTextColor="#A1A1A1" >

                </TextInput>
                <TextInput
                    style={styles.emailInput}
                    secureTextEntry={true}
                    placeholder='password'
                    placeholderTextColor="#A1A1A1"
                >

                </TextInput>
            </View>
            {/* Login button currently goes straight to home without authenticating */}
            <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/(tabs)')}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        alignItems: 'center'
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
    loginButton: {
        backgroundColor: 'black',
        padding: 16,
        alignItems: 'center',
        borderRadius: 24, 
        width: '80%'
    },
    loginText: {
        color: 'white'
    }
})

export default LoginScreen;