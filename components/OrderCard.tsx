import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderCard({ order }) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {order.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.orderRow}>
                    <Image source={item.image} style={styles.productImage} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.textBold}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textPrice}>${item.price}</Text>
                            <Text style={styles.textOldPrice}>${item.oldPrice}</Text>
                        </View>
                        <Text style={styles.textGray}>Quantity: {item.quantity}</Text>
                        {order.otherItemsCount > 0 && itemIndex === 0 && (
                            <Text style={styles.textGray}>And {order.otherItemsCount} other items</Text>
                        )}
                    </View>
                </View>
            ))}
<<<<<<< HEAD
            <View style={styles.orderDetails}>
                <Text style={styles.textGray}>Payment time: {order.paymentTime}</Text>
                <Text style={styles.textGray}>Payment method: {order.paymentMethod}</Text>
                <Text style={styles.textGray}>Total: ${order.total.toFixed(2)}</Text>
            </View>
            {order.status === 'DELIVERED' && (
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton}
                        onPress={() =>
                            router.push({
                                pathname: `/ExchangeAndReturnScreen`,
                                params: { order: JSON.stringify(order) },
                            })
                        }>
                        <Text style={styles.actionButtonText}>Exchange/Return</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.reviewButton]}
                        onPress={() =>
                            router.push({
                                pathname: `/ReviewProductScreen`,
                                params: { order: JSON.stringify(order) },
                            })
                        }>
                        <Text style={[styles.actionButtonText, { color: '#006D5B' }]}>Review</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
=======
            {(order.status === 'DIS-DELIVERED' && order.customer) || (order.status === 'RETURNED' && order.customer) ? (
                <>
                    <View style={styles.customerInfo}>
                        <Text style={styles.customerTitle}>Customer Information</Text>
                        <Text style={styles.textGray}>Name: {order.customer.name}</Text>
                        <Text style={styles.textGray}>Phone: {order.customer.phone}</Text>
                        <Text style={styles.textGray}>Address: {order.customer.address}</Text>
                    </View>

                    {order.status === 'RETURNED' && (
                        <View style={styles.orderDetails} >
                            <Text style={styles.textGray}>Type: {order.type}</Text>
                            <Text style={styles.textGray}>Reasons: {order.reason}</Text>
                            <Text style={styles.textGray}>Payment method: {order.paymentMethod}</Text>
                        </View>
                    )}
                </>
            ) : (

                <View style={styles.orderDetails} >
                    <Text style={styles.textGray}>Payment time: {order.paymentTime}</Text>
                    <Text style={styles.textGray}>Payment method: {order.paymentMethod}</Text>
                    <Text style={styles.textGray}>Total: ${order.total.toFixed(2)}</Text>
                </View>

            )}

            <View style={styles.actionButtons}>
                {order.status === 'DIS-DELIVERED' ? (
                    <TouchableOpacity style={[styles.actionButton, styles.reviewButton]}>
                        <Text style={[styles.actionButtonText, { color: '#006D5B' }]}>Complete</Text>
                    </TouchableOpacity>
                ) : (order.status === 'RETURNED' ? (
                    <TouchableOpacity style={[styles.actionButton, styles.reviewButton]}>
                        <Text style={[styles.actionButtonText, { color: '#006D5B' }]}>Send back to Seller</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity style={styles.actionButton}
                            onPress={() =>
                                router.push({
                                    pathname: `/ExchangeAndReturnScreen`,
                                    params: { order: JSON.stringify(order) },
                                })
                            }>
                            <Text style={styles.actionButtonText}>Exchange/Return</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionButton, styles.reviewButton]}
                            onPress={() =>
                                router.push({
                                    pathname: `/ReviewProductScreen`,
                                    params: { order: JSON.stringify(order) },
                                })
                            }>
                            <Text style={[styles.actionButtonText, { color: '#006D5B' }]}>Review</Text>
                        </TouchableOpacity>
                    </>
                )
                )}
            </View>
        </View >
>>>>>>> ad4e3fa7a2a80e2c7cd7bdce2e3c4d3ab14dbe56
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    orderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    textBold: {
        fontWeight: 'bold',
        color: '#333',
    },
    textPrice: {
        color: '#C22727',
        fontWeight: 'bold',
        marginRight: 8,
    },
    textOldPrice: {
        color: '#999',
        textDecorationLine: 'line-through',
    },
    textGray: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
<<<<<<< HEAD
=======
    customerInfo: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#F4F4F4',
        borderRadius: 8,
    },
    customerTitle: {
        fontWeight: 'bold',
        color: '#034C53',
        marginBottom: 4,
    },
>>>>>>> ad4e3fa7a2a80e2c7cd7bdce2e3c4d3ab14dbe56
    orderDetails: {
        marginTop: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#C22727',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    actionButtonText: {
        color: '#C22727',
        fontWeight: 'bold',
    },
    reviewButton: {
        borderColor: '#006D5B',
    },
});