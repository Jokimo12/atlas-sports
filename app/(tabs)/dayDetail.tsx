import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { exampleEvents } from '../../data/exampleEvents';
import { format, parseISO } from 'date-fns';
import Event from '../event';

const DayDetail = () => {
    const { date } = useLocalSearchParams();
    const parsedDate = parseISO(date as string);
    const formattedDate = format(parsedDate, 'EEEE, MMMM d, yyyy');
    const events = exampleEvents[date as string] || [];

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <ScrollView style={styles.eventsContainer}>
                {events.length === 0 ? (
                    <Text style={styles.noEventsText}>No events scheduled for this day</Text>
                ) : (
                    events.map((event) => (
                        <View key={event.id} style={styles.eventContainer}>
                            <Event
                                {...event}
                                isPast={new Date(event.date) < new Date()}
                            />
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B2B2B2',
        padding: 16,
    },
    dateText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    eventsContainer: {
        flex: 1,
    },
    eventContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    noEventsText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default DayDetail; 