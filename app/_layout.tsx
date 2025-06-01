import { AuthProvider } from '@/contexts/AuthContent';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import M_StartScreen from './StartScreen'; // Your mobile start/splash screen

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(Platform.OS !== 'web');

  useEffect(() => {
    if (Platform.OS !== 'web') {
      // Hide splash after 2 seconds (customize as needed)
      const timer = setTimeout(() => setShowSplash(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AuthProvider>
      {showSplash ? <M_StartScreen /> : <Slot />}
    </AuthProvider>
  );
}