import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, Image } from 'react-native';

const Products = () => {
    const [searchText, setSearchText] = useState('');
    
    // dummy data of products
    const products = [
        {
            image: require('../../assets/images/hockey-helmet.png'),
            name: 'Bauer Helmet - Jr.',
            distance: 14
        },
        {
            image: require('../../assets/images/hockey-helmet.png'),
            name: 'CCM Helmet - Jr.',
            distance: 16
        },
        {
            image: require('../../assets/images/hockey-helmet.png'),
            name: 'CCM Helmet - Yth.',
            distance: 19
        }, 
        {
            image: require('../../assets/images/hockey-helmet.png'),
            name: 'Bauer Helmet - Sr.',
            distance: 21
        }
    ]

    return(
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.locationText}>Location: Denville, NJ</Text>
                <View style={styles.searchBarContainer}>
                    <Ionicons name='search' style={styles.searchIcon}/>
                    <TextInput 
                        style={styles.searchBar}
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder='Search for anything' 
                    />
                </View>
            </View>

            {/* Products view */}
            <ScrollView style={styles.productContainer}>
                <View style={styles.grid}>
                    {products
                        .filter((product) => 
                            product.name.toLowerCase().includes(searchText.trim().toLowerCase())
                        )
                        .map((product) => 
                            <View key={product.name} style={styles.itemContainer}>
                                <Image source={product.image} style={styles.productImage}/>
                                <Text>{product.name}</Text>
                                <Text>{product.distance} mi. away</Text>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    searchBarContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1
    },
    searchBar: {
        padding: 12
    },
    searchIcon: {
        paddingLeft: 8
    },
    productContainer: {
        backgroundColor: '#a0acef',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    itemContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        margin: 8,
        borderRadius: 8,
        backgroundColor: 'white',
        width: '40%'
    },
    locationText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'purple',
        padding: 8
    },
    productImage: {
        width: '100%',
        resizeMode: 'contain'
    }
});

export default Products;