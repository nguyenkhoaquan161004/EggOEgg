import React from 'react';
<<<<<<< HEAD
import AppNavigator from './navigation/AppNavigator';

export default function App() {
    return (
        <AppNavigator />
=======
import { enableScreens } from 'react-native-screens';
import MainNavigation from './app/main-nav';
enableScreens();

export default function App() {
    return (
        <MainNavigation />
>>>>>>> ad4e3fa7a2a80e2c7cd7bdce2e3c4d3ab14dbe56
    );
}