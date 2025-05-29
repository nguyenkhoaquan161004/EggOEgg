import { AuthProvider } from '@/contexts/AuthContent'; // hoặc AuthContext nếu đúng tên file bạn tạo
import { Slot } from 'expo-router';
import { Platform } from 'react-native';
import W_StartScreen from './W_StartScreen';

export default Platform.OS === 'web' ? W_StartScreen : (
  function RootLayout() {
    return (
      <AuthProvider>
        <Slot />
      </AuthProvider>
    );
  }
);

