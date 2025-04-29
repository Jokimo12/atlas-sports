import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EventProps {
  date: string;
  opponent: string;
  location: string;
  time: string;
  checkIn?: string;  // Optional
  checkOut?: string; // Optional
  coachesNotes?: string; // Optional
  isPast?: boolean;  // Optional prop, default will be 'false'
}

const Event: React.FC<EventProps> = ({ date, opponent, location, time, checkIn, checkOut, coachesNotes, isPast = false }) => {
  return (
    <View style={[styles.container, isPast && styles.pastEvent]}>
      <View style={styles.info}>
        <View style={styles.timeContainer}>
          <Text>{time}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text>{date}</Text>
          <Text style={styles.title}>Vs. {opponent}</Text>
          <Text>{location}</Text>
        </View>
      </View>

      <View style={styles.noteContainer}>
        <Text>Coach's Notes: {coachesNotes}</Text>
      </View>
      <View style={styles.playerInfoContainer}>
        <Text style={styles.checkInText}>In: {checkIn} </Text>
        <Text style={styles.checkOutText}>Out: {checkOut} </Text>
      </View>

      {/* Optional - Show a message for past events */}
      {isPast && <Text style={styles.pastText}>Score 27-17 Blue Angels Win! .</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 5,
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  pastEvent: {
    backgroundColor: '#f0f0f0', // Different background for past events
    borderColor: '#d3d3d3', // Lighter border for past events
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    width: '100%',
  },
  detailContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  noteContainer: {
    justifyContent: 'flex-start',
  },
  playerInfoContainer: {
    flexDirection: 'row',
    margin: 8,
    padding: 8,
  },
  checkInText: {
    color: 'green',
  },
  checkOutText: {
    color: 'red',
  },
  pastText: {
    color: 'gray',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

export default Event;
