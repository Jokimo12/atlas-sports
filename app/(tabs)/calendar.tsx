import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CalendarScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calendar</Text>
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
}); 