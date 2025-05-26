import globalStyles from '@/assets/styles/GlobalStyle';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PRODUCT_IMAGE = require('../../assets/images/logoNormal.png'); // Thay bằng ảnh sản phẩm thực tế

const mockProducts = Array(24).fill({
    id: 'egg123',
    name: 'Egg Product',
    price: 0.89,
    oldPrice: 1.09,
    unit: '6 eggs',
    sold: 234,
    image: PRODUCT_IMAGE,
});

const ProductManagement = () => {
    const router = useRouter();

    const [searchText, setSearchText] = useState('');
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        description: '',
        images: [PRODUCT_IMAGE, PRODUCT_IMAGE, PRODUCT_IMAGE], // mock images
    });


    const handleCheckProduct = (idx: number) => {
        if (selectedProducts.includes(idx)) {
            setSelectedProducts(selectedProducts.filter(i => i !== idx));
        } else {
            setSelectedProducts([...selectedProducts, idx]);
        }
    };

    const handleCheckAll = () => {
        if (selectAll) {
            setSelectedProducts([]);
            setSelectAll(false);
        } else {
            setSelectedProducts(Array.from({ length: mockProducts.length }, (_, i) => i));
            setSelectAll(true);
        }
    };

    // Lọc sản phẩm theo search
    const filteredProducts = mockProducts.filter(
        p => p.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const pickImage = async (imgIdx: number) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const newImages = [...productForm.images];
            newImages[imgIdx] = { uri: result.assets[0].uri };
            setProductForm({ ...productForm, images: newImages });
        }
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setProductForm({
            name: '',
            price: '',
            description: '',
            images: [PRODUCT_IMAGE, PRODUCT_IMAGE, PRODUCT_IMAGE], // mock images
        })
        setShowProductModal(true);
    }

    const openEditModal = (idx: number) => {
        const prod = filteredProducts[idx];
        setEditingProduct(idx);
        setProductForm({
            name: prod.name,
            price: prod.price.toString(),
            description: prod.description || '',
            images: [prod.image, prod.image, prod.image], // mock
        });
        setShowProductModal(true);
    };

    return (
        <View style={styles.bg}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>EggOEgg <Text style={styles.manager}>Manager</Text></Text>
                <View style={styles.navRow}>
                    <TouchableOpacity
                        style={styles.navBtn}
                        onPress={() => router.replace('/W_StartScreen')}>
                        <Text style={[styles.navText, { color: '#034C53' }]}>SIGNOUT</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Store Info */}
            <View style={styles.storeInfoWrapper}>
                <Image source={PRODUCT_IMAGE} style={styles.storeAvatar} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.storeTitle}>EggOEgg store’s name</Text>
                    <Text style={styles.storeDesc}>
                        Your trusted source for clean, high-quality chicken and duck eggs. Fast delivery, farm-fresh quality – because your family’s health comes first!
                    </Text>
                    <Text style={styles.storeCount}>92 products</Text>
                </View>
                <TouchableOpacity style={styles.editProfileBtn}>
                    <Text style={styles.editProfileText}>Edit store's profile</Text>
                </TouchableOpacity>
            </View>

            {/* Product List Header */}
            <View style={styles.actionRow}>
                <Text style={styles.sectionTitle}>YOUR PRODUCTS</Text>
                <View style={styles.sectionTools}>
                    <TextInput
                        style={[styles.searchBox, styles.searchText]}
                        onChangeText={setSearchText}
                        placeholder='Searching...'
                        value={searchText}
                    />
                    <View style={styles.actionBtns}>
                        <TouchableOpacity
                            style={[styles.actionBtn, { backgroundColor: '#034C53' }]}
                            onPress={openAddModal}>
                            <Text style={styles.actionBtnText}>ADD</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionBtn, { backgroundColor: selectedProducts.length > 0 ? '#034C53' : '#bbb' }]}
                            disabled={selectedProducts.length === 0}
                        >
                            <Text style={styles.actionBtnText}>DELETE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionBtn, { backgroundColor: selectedProducts.length === 1 ? '#034C53' : '#bbb' }]}
                            disabled={selectedProducts.length !== 1}
                            onPress={() => openEditModal(selectedProducts[0])}
                        >
                            <Text style={styles.actionBtnText}>EDIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            {/* Product Grid */}
            <ScrollView contentContainerStyle={styles.productGrid}>
                {filteredProducts.map((product, idx) => (
                    <TouchableOpacity
                        key={idx}
                        style={[
                            styles.productCard,
                            selectedProducts.includes(idx) && styles.productCardSelected,
                        ]}
                        onPress={() => handleCheckProduct(idx)}
                        activeOpacity={0.8}
                    >
                        <Image source={product.image} style={styles.productImage} />

                        <Text style={[globalStyles.p2Medium, styles.productName]} numberOfLines={1}>{product.name}</Text>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 2, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, }}>
                                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                                <Text style={styles.productOldPrice}>${product.oldPrice.toFixed(2)}</Text>
                            </View>
                            <Text style={styles.productSold}>Sold: {product.sold}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Modal
                visible={showProductModal}
                animationType="fade"
                transparent
                onRequestClose={() => setShowProductModal(false)}
            >
                <View style={modalStyles.overlay}>
                    <View style={modalStyles.modal}>
                        <TouchableOpacity onPress={() => setShowProductModal(false)}>
                            <Text style={modalStyles.closeBtn}><Ionicons name='caret-back' size={24}></Ionicons></Text>
                        </TouchableOpacity>
                        <Text style={modalStyles.title}>{editingProduct === null ? 'CREATE A PRODUCT' : 'EDIT PRODUCT'}</Text>
                        <Text style={modalStyles.label}>Choose product’s photos</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                            {productForm.images.map((img, i) => (
                                <TouchableOpacity key={i} onPress={() => pickImage(i)}>
                                    <Image source={img} style={modalStyles.productImg} />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={modalStyles.label}>Product’s name</Text>
                        <TextInput
                            style={modalStyles.input}
                            placeholder="Your store's name"
                            value={productForm.name}
                            onChangeText={text => setProductForm({ ...productForm, name: text })}
                        />
                        <Text style={modalStyles.label}>Product’s price</Text>
                        <TextInput
                            style={modalStyles.input}
                            placeholder="Product's price"
                            value={productForm.price}
                            keyboardType="numeric"
                            onChangeText={text => setProductForm({ ...productForm, price: text })}
                        />
                        <Text style={modalStyles.label}>Product’s description</Text>
                        <TextInput
                            style={[modalStyles.input, { height: 100 }]}
                            placeholder="Your store's description"
                            value={productForm.description}
                            multiline
                            onChangeText={text => setProductForm({ ...productForm, description: text })}
                        />
                        <TouchableOpacity
                            style={modalStyles.createBtn}
                            onPress={() => {
                                // handle add/edit here
                                setShowProductModal(false);
                            }}
                        >
                            <Text style={modalStyles.createBtnText}>{editingProduct === null ? 'Create store' : 'Save changes'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View >
    );
};

const CARD_SIZE = (Dimensions.get('window').width - 64) / 6.5;

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#ebebeb',
        padding: 12,
    },
    header: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#d17878',
    },
    manager: {
        fontSize: 12,
        color: '#b86d6d',
    },
    navRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navBtn: {
        marginHorizontal: 8,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 10,
    },
    navText: {
        fontWeight: 'bold',
        color: '#fa8888',
    },
    storeInfoWrapper: {
        backgroundColor: '#fff',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        marginBottom: 18,
    },
    storeAvatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginRight: 24,
        backgroundColor: '#eee',
    },
    storeTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 2,
        color: '#034C53',
    },
    storeDesc: {
        color: '#555',
        fontSize: 15,
        marginBottom: 4,
    },
    storeCount: {
        color: '#888',
        fontSize: 13,
        marginBottom: 2,
    },
    editProfileBtn: {
        borderWidth: 1,
        borderColor: '#034C53',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginLeft: 16,
    },
    editProfileText: {
        color: '#034C53',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#034C53',
        marginBottom: 8,
        marginLeft: 4,
    },
    sectionTools: {
        flexDirection: 'row',
        gap: 24,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchBox: {
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 36,
        width: 260,
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    searchText: {
        color: '#bbb',
        fontStyle: 'italic',
    },
    actionBtns: {
        flexDirection: 'row',
    },
    actionBtn: {
        paddingHorizontal: 22,
        paddingVertical: 8,
        borderRadius: 6,
        marginLeft: 10,
    },
    actionBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingBottom: 32,
    },
    productCard: {
        width: CARD_SIZE,
        margin: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignItems: 'center',
        padding: 8,
        borderWidth: 2,
        borderColor: 'transparent',
        height: CARD_SIZE + 50,
    },
    productCardSelected: {
        borderColor: '#034C53',
    },
    productImage: {
        width: '100%',
        height: '75%',
        aspectRatio: 1,
        borderRadius: 8,
        marginBottom: 6,
    },
    productName: {
        width: '100%',
        textAlign: 'left',
    },
    productUnit: {
        fontSize: 12,
        color: '#888',
        marginBottom: 2,
    },
    productSold: {
        fontSize: 11,
        color: '#aaa',
        marginBottom: 2,
    },
    productPrice: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
        marginRight: 8,
    },
    productOldPrice: {
        textDecorationLine: 'line-through',
        color: '#aaa',
        fontSize: 13,
    },
});

const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: '95%',
        maxWidth: 600,
        elevation: 5,
    },
    closeBtn: {
        fontSize: 28,
        color: '#034C53',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#034C53',
        marginBottom: 12,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 8,
        marginBottom: 4,
        color: '#034C53',
    },
    productImg: {
        width: 110,
        height: 80,
        borderRadius: 6,
        marginRight: 16,
        backgroundColor: '#eee',
    },
    input: {
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    createBtn: {
        backgroundColor: '#a63a2b',
        borderRadius: 16,
        paddingVertical: 12,
        marginTop: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    createBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
    },
});

export default ProductManagement;