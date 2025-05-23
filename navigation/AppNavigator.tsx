import StartScreen from '@/app/StartScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';

export type RootStackParamList = {
    Home: undefined;
    StartScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name='StartScreen' component={StartScreen}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;