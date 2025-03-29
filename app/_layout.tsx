import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import 'react-native-reanimated';
import Header from './header';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [currentTeam, setCurrentTeam] = useState('New York Yankees');

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      router.replace('/signup');
    }
  }, [loaded]);

  const handleTeamChange = (team: string) => {
    setCurrentTeam(team);
    // Here you can add logic to load team-specific data
    console.log('Team changed to:', team);
  };

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          header: () => <Header currentTeam={currentTeam} onTeamChange={handleTeamChange} />,
          headerShown: true,
        }}
      >
        <Stack.Screen name="signup" options={{ title: 'Signup', headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
        <Stack.Screen name="calendar" options={{ title: 'Calendar', headerShown: true }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
