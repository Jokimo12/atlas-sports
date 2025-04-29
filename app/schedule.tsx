import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Event from './event';
import { useLocalSearchParams } from 'expo-router';
import ScheduleHeader from './schedule-header';
import ScheduleTabNavigator from './scheduleTabNavigator';
import { exampleEvents } from '../data/exampleEvents';
import { format, parse, isAfter, isBefore } from 'date-fns';

export default function UpcomingGamesScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [refresh, setRefresh] = useState(false);

  // grab events from data
  const allEvents = useMemo(() => {
    return Object.values(exampleEvents).flat();
  }, []);

  // Separate events into upcoming and past based on current date
  const { upcomingGames, pastGames } = useMemo(() => {
    const now = new Date();
    return allEvents.reduce((acc, event) => {
      const eventDate = parse(event.date, 'EEE, MMM d, yyyy', new Date());
      if (isAfter(eventDate, now)) {
        acc.upcomingGames.push(event);
      } else {
        acc.pastGames.push(event);
      }
      return acc;
    }, { upcomingGames: [] as typeof allEvents, pastGames: [] as typeof allEvents });
  }, [allEvents]);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const handleTabChange = (tab: 'upcoming' | 'past') => {
    setActiveTab(tab);
  };

  const currentGames = activeTab === 'upcoming' ? upcomingGames : pastGames;

  return (
    <View style={styles.container}>
      <ScheduleHeader/>
      <View style={styles.tabContainer}>
        <ScheduleTabNavigator activeTab={activeTab} onTabChange={handleTabChange} />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
        >
          {currentGames.length === 0 ? (
            <Text style={styles.noGamesText}>
              No {activeTab} games scheduled
            </Text>
          ) : (
            currentGames.map((game) => (
              <View key={game.id} style={styles.eventContainer}>
                <Event
                  {...game}
                  isPast={activeTab === 'past'}
                />
              </View>
            ))
          )}
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
  },
  noGamesText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  }
});
