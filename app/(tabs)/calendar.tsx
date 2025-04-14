import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'; /*added icon to navigate to schedule page*/
import { useRouter } from 'expo-router';

export default function CalendarScreen() {
    const router = useRouter(); /*to navigate to schedulel page*/
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calendar</Text>
            {/*makes icon interactable in order to navigate to schedule page*/}
            <TouchableOpacity
            style={styles.scheduleIcon} 
            onPress={() =>{router.push('../schedule')}}>
                <FontAwesome5 name="clipboard-list" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
    },
    scheduleIcon: {
        position: 'absolute',
        right: 24,
        padding: 8,
    },
}); 