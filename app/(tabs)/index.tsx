import { Text,Image, StyleSheet, Platform, View, TextInput, TouchableOpacity, Pressable, ScrollView, SafeAreaView } from 'react-native';
import Header from '../header';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import Event from '../event'

const HomeScreen = () => {
  const events = [
    {
      activityType: 'Skate',
      activityName: 'Open Public Skate',
      dateTime: 'Today, 7:00 PM - 9:00 PM',
      location: 'Community Ice Rink'
    },
    {
      activityType: 'Clinic',
      activityName: 'Beginner Hockey Clinic',
      dateTime: 'Sat, 10:00 AM - 12:00 PM',
      location: 'Twin Oaks Arena'
    },
    {
      activityType: 'Game',
      activityName: 'Friendly Pickup Game',
      dateTime: 'Sun, 2:00 PM',
      location: 'Mennen Sports Arena'
    }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Get in the Game</Text>
      <ScrollView>
        <View style={styles.eventsContainer}>
          <Text style={styles.subheaderText}>Nearby Activities and Events</Text>
          <View style={styles.eventListContainer}>
            {events.map((event) => (
              <View key={event.activityName} style={styles.eventContainer}>
                <Text>{event.activityName}</Text>
                <Text>{event.dateTime}</Text>
                <Text>{event.location}</Text>
                <Pressable 
                  style={styles.geminiButton} 
                  onPress={() => console.log('Gemini output here')}
                >
                  <Text style={styles.geminiButtonText}>Get Details & Tips</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
        <View>
          <Text style={styles.subheaderText}>Train at Home</Text>
        </View>
        <View>
          <Text style={styles.subheaderText}>Find Your Gear</Text>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  eventContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 8
  },
  eventListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  eventsContainer: {

  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 32,
    padding: 16
  },
  subheaderText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    padding: 12
  },
  geminiButton: {
    backgroundColor: '#4b8bfa',
    padding: 8,
    borderRadius: 8
  },
  geminiButtonText: {
    color: 'white',
    textAlign: 'center'
  }
  
});

export default HomeScreen;