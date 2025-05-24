import { AuthProvider } from '@/contexts/AuthContent'; // hoặc AuthContext nếu đúng tên file bạn tạo
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}