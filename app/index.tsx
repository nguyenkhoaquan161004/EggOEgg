import { Platform } from 'react-native';
import W_StartScreen from './W_StartScreen';

export default function IndexPage() {
    if (Platform.OS === 'web') {
        return <W_StartScreen />;
    }
    // Render mobile start screen or main content
}