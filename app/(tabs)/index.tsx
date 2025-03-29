import { Text,Image, StyleSheet, Platform, View, TextInput, TouchableOpacity, Button } from 'react-native';
import Header from '../header';
import React, {useState, useCallback, useEffect, useRef} from 'react';

const HomeScreen = () => {

  
  
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source = {require('../../assets/images/atlas-sports-logo-crop.webp')} style={{ width: 230, height: 230 }}></Image>
      </View>
      <View>
        <Text style={styles.header}>Home</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 2,
  },
  logo: {
    marginTop: 65,
    marginBottom: 0,
  },
  header: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  
});

export default HomeScreen;