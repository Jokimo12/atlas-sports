import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Event from './event';
import ScheduleHeader from './schedule-header';
import ScheduleTabNavigator from './scheduleTabNavigator';

export default function UpcomingGamesScreen() {


  const MOCK_UPCOMING_GAMES = [
    {
      id: '1',
      opponent: 'Red Dragons',
      date: 'Sat, Mar 15, 2025',
      time: '2:00 PM',
      location: 'Central Park Courts',
      coachesNotes: 'Bring both home and away jerseys',
      checkIn: '1:00 PM',
      checkOut: '4:00 PM',
    },
    {
      id: '2',
      opponent: 'Blue Eagles',
      date: 'Sun, Mar 16, 2025',
      time: '3:30 PM',
      location: 'Riverside Fields',
      coachesNotes: 'Pre-game meeting at 2:45 PM',
      checkIn: '2:30 PM',
      checkOut: '5:30 PM',
    },
    {
      id: '3',
      opponent: 'Green Sharks',
      date: 'Sat, Mar 22, 2025',
      time: '1:00 PM',
      location: 'Sandy Beach',
      coachesNotes: 'Bring water and sunscreen',
      checkIn: '12:00 PM',
      checkOut: '3:00 PM',
    },
  ];

  const MOCK_PAST_GAMES = [
    {
      id: '4',
      opponent: 'Yellow Tigers',
      date: 'Mar 1, 2025',
      time: '10:00 AM',
      location: 'Tennis Center',
      coachesNotes: 'Great game everyone!',
      checkIn: '9:00 AM',
      checkOut: '12:00 PM',
    },
    {
      id: '5',
      opponent: 'Purple Bears',
      date: 'Mar 8, 2025',
      time: '4:00 PM',
      location: 'Memorial Park',
      coachesNotes: 'Review game footage next practice',
      checkIn: '3:00 PM',
      checkOut: '6:00 PM',
    },
  ];

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [refresh, setRefresh] = useState(false);
  const [games, setGames] = useState(MOCK_UPCOMING_GAMES);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const handleTabChange = (tab: 'upcoming' | 'past') => {
    setActiveTab(tab);
    setGames(tab === 'upcoming' ? MOCK_UPCOMING_GAMES : MOCK_PAST_GAMES);
  };

  return (
    <View style={styles.container}>
      <ScheduleHeader/>
      <View style={styles.tabContainer}>
        <ScheduleTabNavigator activeTab={activeTab} onTabChange={handleTabChange} />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
        >
          {games.map((game) => (
            <View style={styles.eventContainer}>
                <Event
                key={game.id}
                {...game}
                isPast={activeTab === 'past'} // Correctly pass isPast
                />
            </View>

          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2B2B2',
  },
  tabContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  scrollContent: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  }


});
