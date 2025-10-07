import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TeamDropdown from './teamDropdown';
import { teams } from '@/constants/teams';

interface HeaderProps {
  currentTeam?: string;
  onTeamChange?: (team: string) => void;
}

export default function Header({ currentTeam = 'New York Yankees', onTeamChange }: HeaderProps) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const[selectedTeamName, setSelectedTeamName] = useState(currentTeam);

  const openMenu = () => {
    console.log("Testing");
  };

  const handleTeamChange = (team: string) => {
    setSelectedTeamName(team);
    if (onTeamChange) {
      onTeamChange(team);
    }
    setIsDropdownVisible(false);
  };

  const selectedTeam = teams.find(team => team.name === selectedTeamName) || teams[0];

  return (
    <View style={styles.header}>
      <Modal visible={openModal} animationType='slide'>
        <View>
          <MaterialIcons
            name='close'
            size={24}
            onPress={() => setOpenModal(false)}
          />
          <Text>Diagnostics</Text>
        </View>
      </Modal>

      <Stack.Screen options={{ headerShown: false }} />
      
      <Ionicons 
        name="menu" 
        size={24} 
        onPress={openMenu} 
        color="#a0acef" 
        style={styles.menu} 
      />

      <Ionicons
        name="calendar-outline"
        size={24}
        color="#a0acef"
        style={styles.calendar}
        onPress={() => router.push('./(tabs)/calendar')}
      />
      
      <FontAwesome6 
        name="sliders" 
        size={24} 
        color="#a0acef" 
        style={styles.sliders}
        onPress={() => setOpenModal(true)}
      />

      <View style={styles.centerContainer}>
        <TouchableOpacity
          style={styles.teamSelector}
          onPress={() => setIsDropdownVisible(true)}
        >
          <Image 
            source={selectedTeam.icon}
            style={styles.teamIcon}
            resizeMode="contain"
          />
          <View style={styles.teamTextContainer}>
            <Text style={styles.teamSelectorText}>{selectedTeamName}</Text>
            <Text style={styles.teamYearText}>{selectedTeam.year}</Text>
          </View>
          <Ionicons name="chevron-down" size={24} color="#a0acef" />
        </TouchableOpacity>
      </View>

      <TeamDropdown
        isVisible={isDropdownVisible}
        onClose={() => setIsDropdownVisible(false)}
        onSelectTeam={handleTeamChange}
        currentTeam={currentTeam}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: '#fff',
    position: 'relative',
  },
  menu: {
    position: 'absolute',
    left: 16,
    top: 24,
  },
  calendar: {
    position: 'absolute',
    right: 16,
    top: 24,
  },
  sliders: {
    position: 'absolute',
    right: 64,
    top: 24,
  },
  centerContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  teamSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  teamIcon: {
    width: 40,
    height: 40,
  },
  teamTextContainer: {
    alignItems: 'center',
  },
  teamSelectorText: {
    fontSize: 22,
    color: 'black',
    fontWeight: '700',
  },
  teamYearText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
});