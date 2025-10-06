import { Text,Image, StyleSheet, Platform, View, TextInput, TouchableOpacity, Pressable, ScrollView, SafeAreaView } from 'react-native';
import Header from '../header';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import Event from '../event'
import { Ionicons } from '@expo/vector-icons';

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
  ];

  const trainings = [
    {
      trainingType: 'Stickhandling',
      trainingName: 'Master Your Dangles',
      description: 'Improve puck control. 15 mins'
    },
    {
      trainingType: 'Shooting',
      trainingName: 'Sniper School',
      description: 'Increase shot power. 20 mins.'
    },
    {
      trainingType: 'Strength',
      trainingName: 'Hockey Core Power',
      description: 'Build stability. 15 mins.'
    }
  ];

  const gear = [
    {
      title: 'Youth Sports Drive', 
      type: 'Donation Center',
      location: '123 Main St'
    },
    {
      title: 'Hockey Pro Shop',
      type: 'Retail Store',
      location: '456 Rink Ave.'
    },
    {
      title: 'Bauer Skates Size 8',
      type: 'User Donation',
      location: 'J. Doe'
    }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Get in the Game</Text>
      <ScrollView>
        <View style={styles.eventsContainer}>
          <Text style={styles.subheaderText}>Nearby Activities and Events</Text>
          <View style={styles.cardListContainer}>
            {events.map((event) => (
              <View key={event.activityName} style={styles.card}>
                <Text style={styles.cardTitleText}>{event.activityName}</Text>
                <View style={styles.calendarContainer}>
                  <Ionicons name='calendar-outline' size={16}/>
                  <Text style={styles.calendarText}>{event.dateTime}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <Ionicons name='location-sharp' size={16} />
                  <Text style={styles.locationText}>{event.location}</Text>
                </View>
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
          <View style={styles.cardListContainer}>
            {trainings.map((training) => (
              <View key={training.trainingName} style={styles.card}>
                <Text style={styles.cardTitleText}>{training.trainingName}</Text>
                <Text>{training.description}</Text>
                <Text style={styles.label}>{training.trainingType}</Text>
                <Pressable 
                  style={styles.geminiButton}
                  onPress={() => console.log('Gemini output here')}
                >
                  <Text style={styles.geminiButtonText}>Customize Drill</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
        <View>
          <View style={styles.gearHeadingContainer}>
              <Text style={styles.subheaderText}>Find Your Gear</Text>
              <Pressable 
                style={styles.geminiButton}
                onPress={() => console.log('Gemini output here')}
              >
                <Text style={styles.geminiButtonText}>What Gear Do I Need?</Text>
              </Pressable>
          </View>
          <View style={styles.cardListContainer}>
            {gear.map((gear) => (
              <View key={gear.title} style={styles.card}>
                <Text style={styles.cardTitleText}>{gear.title}</Text>
                <View style={styles.locationContainer}>
                  <Ionicons name='location-sharp' size={16} />
                  <Text style={styles.locationText}>{gear.location}</Text>
                </View>
                <Text style={styles.label}>{gear.type}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 8
  },
  cardListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cardTitleText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  label: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 8,
    marginTop: 8,
    backgroundColor: '#4b8bfa',
    color: 'white',
    borderRadius: 4
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  calendarText: {
    padding: 8
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationText: {
    padding: 8
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
    borderRadius: 8,
    justifyContent: 'center'
  },
  geminiButtonText: {
    color: 'white',
    textAlign: 'center'
  },
  gearHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  }
  
});

export default HomeScreen;