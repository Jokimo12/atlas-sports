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
  const [expanded, setExpanded] = React.useState(false);

  //TO-DO: handle 'in' button press
  const handleInButtonPress = () => {

  }

  //TO-DO: handle 'out' button press
  const handleOutButtonPress = () => {

  }

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

      {expanded && (
        <View style={styles.attendanceButtonsContainer}>
          <TouchableOpacity style={styles.inButton} onPress={() => handleInButtonPress()}>
            <Ionicons name={'checkmark'}></Ionicons>
            <Text>In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outButton} onPress={() => handleOutButtonPress()}>
            <Ionicons name={'close'}></Ionicons>
            <Text>Out</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.expandArrowButton} onPress={() => setExpanded(!expanded)}>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={24}></Ionicons>
      </TouchableOpacity>
    
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
  attendanceButtonsContainer: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  inButton: {
    backgroundColor: '#90EE90',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }, 
  outButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  expandArrowButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    padding: 4
  }
});

export default Event;