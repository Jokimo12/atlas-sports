import { Text, Image, StyleSheet, Platform, View, TextInput, TouchableOpacity, Button } from 'react-native';
import Header from '../header';
import React, { useMemo } from 'react';
import Event from '../event';
import { exampleEvents } from '../../data/exampleEvents';
import { parse, isAfter } from 'date-fns';

const HomeScreen = () => {
  // Get  events and sort them by date
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return Object.values(exampleEvents)
      .flat()
      .filter(event => {
        const eventDate = parse(event.date, 'EEE, MMM d, yyyy', new Date());
        return isAfter(eventDate, now);
      })
      .sort((a, b) => {
        const dateA = parse(a.date, 'EEE, MMM d, yyyy', new Date());
        const dateB = parse(b.date, 'EEE, MMM d, yyyy', new Date());
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 2); // Show only the next 2 upcoming events
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.upNext}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Up Next: </Text>
        </View>
        <View style={styles.events}>
          {upcomingEvents.length === 0 ? (
            <Text style={styles.noEventsText}>No upcoming events scheduled</Text>
          ) : (
            upcomingEvents.map((event) => (
              <Event
                key={event.id}
                date={event.date}
                opponent={event.opponent}
                location={event.location}
                checkIn={event.checkIn}
                checkOut={event.checkOut}
                time={event.time}
                coachesNotes={event.coachesNotes}
                isPast={false}
              />
            ))
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: '#B2B2B2',
    alignItems: 'center',
    gap: 2,
  },
  upNext: {
    flex: 1,
    backgroundColor: '#B2B2B2',
    width: '100%',
    padding: 16,
  },
  titleContainer: {
    alignItems: 'flex-start'
  },
  title: {
    marginRight: 8,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  events: {
    gap: 30,
    width: '100%',
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default HomeScreen;