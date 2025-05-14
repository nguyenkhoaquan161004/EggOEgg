import OrderCard from '@/components/OrderCard';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function MyOrders() {
  const orders = [
    {
      id: 1,
      status: 'PROCESSING',
      items: [
        {
          id: 1,
          name: '6 of Duck eggs',
          price: 0.89,
          oldPrice: 1.09,
          quantity: 5,
          image: require('../../assets/images/logoNormal.png'),
        },
        // Add sub-items if otherItemsCount > 0
        ...Array(3).fill(null).map((_, index) => ({
          id: `1-sub-${index + 1}`,
          name: `Sub-item ${index + 1} for Duck eggs`,
          price: 0.5,
          oldPrice: 0.7,
          quantity: 1,
          image: require('../../assets/images/logoNormal.png'),
        })),
      ],
      otherItemsCount: 3,
      paymentTime: 'Mon, Aug 12th 2025',
      paymentMethod: 'VNPay',
      total: 10.0,
    },
    {
      id: 2,
      status: 'AVAILABLE',
      items: [
        {
          id: 2,
          name: '12 of Chicken eggs',
          price: 1.49,
          oldPrice: 1.89,
          quantity: 2,
          image: require('../../assets/images/logoNormal.png'),
        },
        ...Array(1).fill(null).map((_, index) => ({
          id: `2-sub-${index + 1}`,
          name: `Sub-item ${index + 1} for Chicken eggs`,
          price: 0.8,
          oldPrice: 1.0,
          quantity: 1,
          image: require('../../assets/images/logoNormal.png'),
        })),
      ],
      otherItemsCount: 1,
      paymentTime: 'Tue, Aug 13th 2025',
      paymentMethod: 'VNPay',
      total: 5.0,
    },
    {
      id: 3,
      status: 'DELIVERED',
      items: [
        {
          id: 3,
          name: 'Pack of Quail eggs',
          price: 2.99,
          oldPrice: 3.49,
          quantity: 1,
          image: require('../../assets/images/logoNormal.png'),
        },
      ],
      otherItemsCount: 0,
      paymentTime: 'Wed, Aug 14th 2025',
      paymentMethod: 'Cash on Delivery',
      total: 2.99,
    },
    {
      id: 4,
      status: 'HISTORY',
      items: [
        {
          id: 4,
          name: '6 of Duck eggs',
          price: 0.89,
          oldPrice: 1.09,
          quantity: 3,
          image: require('../../assets/images/logoNormal.png'),
        },
        ...Array(2).fill(null).map((_, index) => ({
          id: `4-sub-${index + 1}`,
          name: `Sub-item ${index + 1} for Duck eggs`,
          price: 0.6,
          oldPrice: 0.8,
          quantity: 1,
          image: require('../../assets/images/logoNormal.png'),
        })),
      ],
      otherItemsCount: 2,
      paymentTime: 'Thu, Aug 15th 2025',
      paymentMethod: 'VNPay',
      total: 7.0,
    },
    {
      id: 5,
      status: 'PROCESSING',
      items: [
        {
          id: 5,
          name: 'Pack of Organic eggs',
          price: 3.49,
          oldPrice: 4.49,
          quantity: 4,
          image: require('../../assets/images/logoNormal.png'),
        },
      ],
      otherItemsCount: 0,
      paymentTime: 'Fri, Aug 16th 2025',
      paymentMethod: 'VNPay',
      total: 15.0,
    },
    {
      id: 6,
      status: 'AVAILABLE',
      items: [
        {
          id: 6,
          name: 'Pack of Brown eggs',
          price: 2.49,
          oldPrice: 2.99,
          quantity: 2,
          image: require('../../assets/images/logoNormal.png'),
        },
      ],
      otherItemsCount: 0,
      paymentTime: 'Sat, Aug 17th 2025',
      paymentMethod: 'Credit Card',
      total: 4.98,
    },
    {
      id: 7,
      status: 'DELIVERED',
      items: [
        {
          id: 7,
          name: 'Pack of Free-range eggs',
          price: 3.99,
          oldPrice: 4.99,
          quantity: 1,
          image: require('../../assets/images/logoNormal.png'),
        },
        ...Array(4).fill(null).map((_, index) => ({
          id: `1-sub-${index + 1}`,
          name: `Sub-item ${index + 1} for Duck eggs`,
          price: 0.5,
          oldPrice: 0.7,
          quantity: 1,
          image: require('../../assets/images/logoNormal.png'),
        })),
      ],
      otherItemsCount: 3,
      paymentTime: 'Sun, Aug 18th 2025',
      paymentMethod: 'VNPay',
      total: 12.0,
    },
  ];
  const router = useRouter();
  const groupedOrders: Record<string, typeof orders> = orders.reduce((acc, order) => {
    if (!acc[order.status]) {
      acc[order.status] = [];
    }
    acc[order.status].push(order);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {Object.keys(groupedOrders).map((status) => (
          <View key={status} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{status}</Text>
              <TouchableOpacity onPress={() => router.push({
                pathname: `/OrdersByStatusScreen`,
                params: { status, orders: JSON.stringify(groupedOrders[status]) },
              })}>
                <Text style={styles.seeMore}>See more</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}>
              {groupedOrders[status].map((order, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => router.push({
                    pathname: `/OrderDetailsScreen`,
                    params: { order: JSON.stringify(order) },
                  })}>
                  <OrderCard
                    order={{
                      ...order,
                      items: [order.items[0]],
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>

          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  seeMore: {
    color: '#006D5B',
    fontWeight: 'bold',
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#006D5B',
    marginTop: 4,
  },
});