import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StartScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.logoRow}>
                <Image source={require('../assets/images/logoNormal.png')} style={styles.logo} />
                <View>
                    <Text style={styles.logoText}>EggOEgg</Text>
                    <Text style={styles.logoSub}>From 2025</Text>
                </View>
            </View>
            <View style={styles.slogan}>
                <Text style={styles.sloganMain}>Fresh eggs <Text style={styles.sloganSub}>each day</Text></Text>
                <Text style={styles.sloganMain2}>Love in <Text style={styles.sloganSub2}>every way.</Text></Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/LoginScreen')}>
                <Text style={styles.buttonText}>Shop now!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.policyBtn}>
                <Text style={styles.policyText}>User Policy</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    logoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 60 },
    logo: { width: 80, height: 80, marginRight: 10 },
    logoText: { fontSize: 40, fontWeight: 'bold', color: '#A86A5A' },
    logoSub: { color: '#F7A496', fontStyle: 'italic', marginLeft: 4 },
    slogan: { marginTop: 60, alignItems: 'center' },
    sloganMain: { fontSize: 36, fontWeight: 'bold', color: '#FFC1B4' },
    sloganSub: { color: '#C25B4B', fontWeight: 'bold', fontSize: 24 },
    sloganMain2: { fontSize: 36, fontWeight: 'bold', color: '#F7A496' },
    sloganSub2: { color: '#A86A5A', fontWeight: 'bold', fontSize: 24 },
    button: { marginTop: 120, backgroundColor: '#BC7269', borderRadius: 40, paddingVertical: 18, paddingHorizontal: 60 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 28 },
    policyBtn: { position: 'absolute', right: 30, bottom: 30 },
    policyText: { color: '#0B5C60', fontStyle: 'italic', fontSize: 18 },
});