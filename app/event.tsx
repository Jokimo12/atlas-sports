import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

interface EventProps {
  date: string;
  opponent: string;
  location: string;
  time: string;
  checkIn?: string;  // Optional
  checkOut?: string; // Optional
  coachesNotes?: string; // Optional
}

const Event: React.FC<EventProps> = ({ date, opponent, location, time, checkIn, checkOut, coachesNotes }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.timeContainer}>
          <Text >{time}</Text>
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
      
      
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
    elevation: 3, // Android shadow
    // flexDirection: 'row'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    
  },
  info: {
    width: '100%'
  },
  detailContainer: {
    alignItems: 'flex-start',
    width: '100%'

  },
  timeContainer: {
    alignItems: 'flex-end'

  },
  noteContainer: {
    justifyContent: 'flex-start'
  },
  playerInfoContainer: {
    flexDirection: 'row',
    margin: 8,
    padding: 8
    
  },
  checkInText: {
    color: 'green'
  },
  checkOutText: {
    color: 'red'
  },
});

export default Event;