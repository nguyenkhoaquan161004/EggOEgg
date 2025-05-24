<<<<<<< HEAD
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "../screens/HomeScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
=======
import StartScreen from '@/app/StartScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';

export type RootStackParamList = {
    Home: undefined;
    StartScreen: undefined;
>>>>>>> ad4e3fa7a2a80e2c7cd7bdce2e3c4d3ab14dbe56
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    <NavigationContainer>
<<<<<<< HEAD
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
=======
        <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name='StartScreen' component={StartScreen}></Stack.Screen>
>>>>>>> ad4e3fa7a2a80e2c7cd7bdce2e3c4d3ab14dbe56
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;