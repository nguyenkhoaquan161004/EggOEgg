import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="caret-back" size={32} color="#A86A5A" />
            </TouchableOpacity>
            <View style={styles.logoRow}>
                <Image source={require('../assets/images/logoNormal.png')} style={styles.logo} />
                <Text style={styles.logoText}>EggOEgg</Text>
            </View>
            <Text style={styles.title}>LOGIN</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity onPress={() => { }}>
                <Text style={styles.forgot}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => router.replace('/Tabs')}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.bottomRow}>
                <Text style={styles.bottomText}>Don’t have a account? </Text>
                <TouchableOpacity onPress={() => router.push('/SignUpScreen')}>
                    <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 40 },
    backBtn: { position: 'absolute', left: 24, top: 48, zIndex: 2 },
    logoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 40 },
    logo: { width: 80, height: 80, marginRight: 10 },
    logoText: { fontSize: 36, fontWeight: 'bold', color: '#A86A5A' },
    title: { fontSize: 40, fontWeight: 'bold', color: '#A86A5A', marginTop: 40, marginBottom: 30 },
    input: {
        width: '85%',
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 20,
        padding: 16,
        fontSize: 18,
        marginBottom: 18,
        backgroundColor: '#fff',
        shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2,
    },
    forgot: { color: '#0B5C60', fontStyle: 'italic', alignSelf: 'center', marginBottom: 30, fontSize: 18 },
    loginBtn: {
        backgroundColor: '#BC7269',
        borderRadius: 28,
        paddingVertical: 14,
        paddingHorizontal: 60,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 4, elevation: 2,
    },
    loginText: { color: '#fff', fontWeight: 'bold', fontSize: 28 },
    bottomRow: { flexDirection: 'row', position: 'absolute', bottom: 40, alignSelf: 'center' },
    bottomText: { color: '#222', fontSize: 18 },
    signupText: { color: '#0B5C60', fontWeight: 'bold', fontSize: 18 },
});