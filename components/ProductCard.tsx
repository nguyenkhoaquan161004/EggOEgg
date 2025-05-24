import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

<<<<<<< HEAD
export default function ProductCard({ id, image, title, oldPrice, newPrice, sold }: { id: number, image: any, title: string, oldPrice: number, newPrice: number, sold: number }) {
=======
export default function ProductCard({ id, image, title, oldPrice, newPrice, sold }: { id: string, image: any, title: string, oldPrice: number, newPrice: number, sold: number }) {
>>>>>>> ad4e3fa7a2a80e2c7cd7bdce2e3c4d3ab14dbe56
    const router = useRouter();

    const handlePress = () => {
        router.push({ pathname: '/ProductDetail', params: { id } });
    };
    return (
        <TouchableOpacity style={{
            width: '48%',
            backgroundColor: 'white',
            borderRadius: 12,
            marginBottom: 16,
            overflow: 'hidden',

        }} onPress={handlePress}>
            <Image
<<<<<<< HEAD
                source={{uri:image}}
=======
                source={image}
>>>>>>> ad4e3fa7a2a80e2c7cd7bdce2e3c4d3ab14dbe56
                style={{ width: '100%', height: 120 }}
                defaultSource={require('../assets/images/logoNormal.png')}
            />
            <View style={{ padding: 8 }}>
                <Text style={{ fontWeight: '500' }}>{title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#C22727' }}>${newPrice}</Text>
                    <Text style={{ textDecorationLine: 'line-through', marginLeft: 8, color: '#999' }}>${oldPrice}</Text>
                    <Text style={{ marginLeft: 'auto', color: '#666' }}>Sold {sold}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
