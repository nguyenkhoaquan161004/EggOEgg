import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PickupLocationScreen() {
    const router = useRouter();
    const locations = [
        {
            id: 1,
            name: 'Điểm nhận hàng A',
            address: '12/302, đường Nguyễn Tri Phương, Phố Hòa Khánh, quận Tân Bình, thành phố Hồ Chí Minh',
            distance: '3km from you',
            image: require('../assets/images/logoNormal.png'),
            note: 'Giao hàng tận nơi',
        },
        {
            id: 2,
            name: 'Điểm nhận hàng B',
            address: '45/678, đường Lê Văn Sỹ, quận 3, thành phố Hồ Chí Minh',
            distance: '5km from you',
            image: require('../assets/images/logoNormal.png'),
            note: 'Giao hàng tận nơi',
        },
        {
            id: 3,
            name: 'Điểm nhận hàng C',
            address: '123/456, đường Lê Thánh Tôn, quận 1, thành phố Hồ Chí Minh',
            distance: '2km from you',
            image: require('../assets/images/logoNormal.png'),
            note: 'Giao hàng tận nơi',
        },
        // Add more locations as needed
    ];

    const { callbackKey } = useLocalSearchParams(); // Use useLocalSearchParams to get query params
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filteredLocations, setFilteredLocations] = React.useState(locations);

    const handleLocationSelect = (location: { name: string; address: string; note: string }) => {
        if (callbackKey) {
            router.replace({
                pathname: '/TransactionInformationScreen',
                params: { selectedLocation: JSON.stringify(location) },
            });
        } else {
            router.back();
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredLocations(locations);
        } else {
            const filtered = locations.filter(location =>
                location.name.toLowerCase().includes(query.toLowerCase()) ||
                location.address.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredLocations(filtered);
        }
    }

    const renderLocationItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.locationItem} onPress={() => handleLocationSelect(item)}>
            <Image source={item.image} style={styles.locationImage} />
            <View style={styles.locationDetails}>
                <Text style={styles.locationName}>{item.name}</Text>
                <Text style={styles.locationAddress}>{item.address}</Text>
                <Text style={styles.locationDistance}>{item.distance}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header with Search Bar */}
            <View style={styles.header}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for your location"
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            <FlatList
                data={filteredLocations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderLocationItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    header: {
        backgroundColor: '#006D5B',
        padding: 16,
    },
    searchBar: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
        color: '#333',
    },
    listContainer: {
        padding: 16,
    },
    locationItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    locationImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    locationDetails: {
        flex: 1,
        marginLeft: 12,
    },
    locationName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    locationAddress: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    locationDistance: {
        fontSize: 12,
        color: '#999',
    },
});