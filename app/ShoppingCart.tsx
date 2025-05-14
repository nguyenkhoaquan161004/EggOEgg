import globalStyles from '@/assets/styles/GlobalStyle';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
const ShoppingCart = () => {
    const navigation = useNavigation();

    const [selectAll, setSelectAll] = useState(false);
    const [items, setItems] = useState([
        { id: 1, name: '6 of Duck eggs', price: 0.89, quantity: 5, oldPrice: 1.09, image: require('../assets/images/logoNormal.png'), checked: false },
        { id: 2, name: '6 of Duck eggs', price: 0.89, quantity: 5, oldPrice: 1.09, image: require('../assets/images/logoNormal.png'), checked: false },
        { id: 3, name: '6 of Duck eggs', price: 0.89, quantity: 5, oldPrice: 1.09, image: require('../assets/images/logoNormal.png'), checked: false },
    ]);
    const checkedItems = items.filter(item => item.checked);

    const router = useRouter();
    const handleChangeToTransactionInformation = () => {
        router.push({
            pathname: '/TransactionInformationScreen'
            , params: {
                selectedItems: JSON.stringify(checkedItems),
                quantity: JSON.stringify(checkedItems.map(item => item.quantity))
            } // Chuyển đổi checkedItems thành chuỗi JSON
        });
    }

    const handleQuantityChange = (index: number, change: number) => {
        const newItems = [...items];
        newItems[index].quantity += change;

        if (newItems[index].quantity <= 0) {
            handleRemoveItem(index) // Đảm bảo số lượng không âm
        } else {
            setItems(newItems);
        }
    };

    const handleRemoveItem = (index: number) => {
        const newItems = [...items]; // Update to use items directly
        newItems.splice(index, 1); // Xóa mục tại chỉ số index
        setItems(newItems); // Cần thêm state cho items
    };

    const handleCheckboxChange = (index: number) => {
        const newItems = [...items];
        newItems[index].checked = !newItems[index].checked;
        setItems(newItems);
    }

    const handleSelectAll = () => {
        const newItems = items.map(item => ({ ...item, checked: !selectAll }));
        setItems(newItems);
        setSelectAll(!selectAll);
    };

    const totalPrice = checkedItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <View style={styles.container}>
            <SafeAreaView style={{
                backgroundColor: '#006D5B',
                paddingVertical: 20,
                paddingHorizontal: 16,
                zIndex: 10,
                elevation: 10,
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='caret-back-outline' size={24} color='#fff' />
                    </TouchableOpacity>
                    <Text style={StyleSheet.flatten([globalStyles.h4, { color: '#fff' }])}>Shopping cart ({items.length})</Text>
                </View>
            </SafeAreaView >
            <ScrollView style={{
                paddingHorizontal: 15,
                marginTop: 10,
                backgroundColor: '#fff',
                width: 'auto'
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'center',
                }}>
                    <Checkbox
                        status={selectAll ? 'checked' : 'unchecked'}
                        onPress={() => handleSelectAll()}
                        color='#006D5B' />
                    <Text>Select all</Text>
                </View>

                {
                    items.map((item, index) => (
                        <View key={item.id} style={styles.item}>
                            <Checkbox
                                status={selectAll || item.checked ? 'checked' : 'unchecked'}
                                color='#006D5B'
                                onPress={() => { handleCheckboxChange(index) }} />
                            <Image source={item.image} style={styles.image} />
                            <View style={styles.details}>
                                <Text>{item.name}</Text>
                                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                                <Text style={styles.oldPrice}>${item.oldPrice.toFixed(2)}</Text>
                            </View>
                            <View style={styles.quantity}>
                                <TouchableOpacity onPress={() => handleQuantityChange(index, -1)}>
                                    <Text style={styles.button}>-</Text>
                                </TouchableOpacity>
                                <Text>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => handleQuantityChange(index, 1)}>
                                    <Text style={styles.button}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                                <Ionicons name='trash-outline' size={24} color='#006D5B' />
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.total}>Total ${totalPrice.toFixed(2)}</Text>
                <TouchableOpacity style={styles.buyNowBtn} onPress={() => handleChangeToTransactionInformation()}>
                    <Text style={styles.buyNowText}>Buy now</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        gap: 8,
    },
    image: {
        width: 66,
        height: 66,
        borderRadius: 5
    },
    details: {
        flex: 1,
    },
    price: {
        color: 'red',
    },
    oldPrice: {
        textDecorationLine: 'line-through',
    },
    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        fontSize: 24,
        paddingHorizontal: 8,
    },
    trash: {
        fontSize: 24,
        color: 'gray',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 120,
    },

    bottomBar: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: 'white', flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 12, paddingVertical: 12, borderTopWidth: 1, borderColor: '#ddd',
        display: 'flex', justifyContent: 'space-between',
    },
    circleBtn: {
        width: 42, height: 42, borderRadius: 21, borderWidth: 1,
        borderColor: '#006D5B', justifyContent: 'center', alignItems: 'center', marginRight: 12,
    },
    buyNowBtn: {
        backgroundColor: '#C22727', borderRadius: 16, paddingVertical: 10,
        justifyContent: 'center', alignItems: 'center',
        width: "60%", height: 60,
    },
    buyNowText: {
        color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center',
    },
});

export default ShoppingCart;