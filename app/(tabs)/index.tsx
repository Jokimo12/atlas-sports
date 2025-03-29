import { Text,Image, StyleSheet, Platform, View, TextInput, TouchableOpacity, Button } from 'react-native';
import Header from '../header';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import Event from '../event'

const HomeScreen = () => {

  
  
  return (
    <View style={styles.container}>
      <View style={styles.upNext}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Up Next: </Text>
        </View>
        <View style={styles.events}>
          <Event
            date = "Fri, Feb 24"
            opponent='Rockaway Rockets'
            location='Zeek Field'
            checkIn='20'
            checkOut='2'
            time='6:45 PM'
          />
          <Event
            date = "Thurs, Mar 2"
            opponent='Par-Hill Rams'
            location='Zeek Field'
            checkIn='20'
            checkOut='2'
            time='6:45 PM'
          />
          
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor:'#B2B2B2',
    alignItems: 'center',
    gap: 2,
  },
  upNext: {
    flex: 1,
    backgroundColor:'#B2B2B2',
    width: '100%',
  },
  titleContainer: {
    alignItems: 'flex-start'
  },
  title: {
    marginRight: 8,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  events: {
    gap: 30,
    width: '100%',
    alignItems: 'center',
    
    
  }
  
});

export default HomeScreen;