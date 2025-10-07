import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import Header from '../header';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [currentTeam, setCurrentTeam] = useState('New York Yankees');

  const handleTeamChange = (team: string) => {
    setCurrentTeam(team);
    console.log('Team changed to:', team);
  };

  return (
    <Tabs screenOptions={{
      tabBarStyle: { backgroundColor: "#fff", height: 80 },
      tabBarActiveTintColor: "#a684fa", 
      tabBarInactiveTintColor: "#c4b0f5",
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          // headerShown: true,
          // header: () => <Header currentTeam={currentTeam} onTeamChange={handleTeamChange} />,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          href: null,
          title: "Products",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
          href: null,
        }}
      />
    </Tabs>
  );
}
