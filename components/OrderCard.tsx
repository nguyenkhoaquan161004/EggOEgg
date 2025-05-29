import useAccount from '@/hooks/useAccount';
import { Order } from '@/types/Order';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderCard({ order, role }: { order: Order; role: string; }) {
    const router = useRouter();
    const { account, loading } = useAccount(order.buyerId); // Fetch account details based on buyerId
    if (loading) { };
    // Assuming useAccount is a hook to fetch account details
    return (
        <View style={styles.container}>
            {order.orderDetails.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.orderRow}>
                    <Image source={{ uri: item.eggImageURL }} style={styles.productImage} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.textBold}>{item.eggName}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textPrice}>${item.unitPrice}</Text>
                            <Text style={styles.textOldPrice}>${item.unitPrice * 2}</Text>
                        </View>
                        <Text style={styles.textGray}>Quantity: {item.quantity}</Text>
                        {order.orderDetails.length - 1 > 0 && itemIndex === 0 && (
                            <Text style={styles.textGray}>And {order.orderDetails.length - 1} other items</Text>
                        )}
                    </View>
                </View>
            ))}

            {(order.status === 'DISDELIVERED' && role === "Buyer") || (order.status === 'SHIPPING' && role === "Buyer") ? (
                <>
                    <View style={styles.customerInfo}>
                        <Text style={styles.customerTitle}>Customer Information</Text>
                        <Text style={styles.textGray}>Name: {account?.name||""}</Text>
                        <Text style={styles.textGray}>Phone: {account?.phone}</Text>
                        <Text style={styles.textGray}>Address: {account?.address}</Text>
                    </View>
 
                </>
            ) : (
                <View style={styles.orderDetails}>
                    <Text style={styles.textGray}>Payment time: {order.payment.paymentDate}</Text>
                    <Text style={styles.textGray}>Payment method: {order.payment.method}</Text>
                    <Text style={styles.textGray}>Total: ${order.payment.amount}</Text>
                </View>
            )}

            <View style={styles.actionButtons}>
                {order.status === 'DISDELIVERED' ||order.status === 'SHIPPING'? (
                    <TouchableOpacity style={[styles.actionButton, styles.reviewButton]}>
                        <Text style={[styles.actionButtonText, { color: '#006D5B' }]}>Complete</Text>
                    </TouchableOpacity>
                ) : (order.status === 'RETURN' ? (
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
        </View>
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