import React from 'react';
import { enableScreens } from 'react-native-screens';
import MainNavigation from './app/main-nav';
enableScreens();

export default function App() {
    return (
        <MainNavigation />
    );
}