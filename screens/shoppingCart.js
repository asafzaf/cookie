import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import dummyData from '../data/dummyItems.json';

const ShoppingCart = () => {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState(dummyData.data);
    const [shoppingList, setShoppingList] = useState([]);

    const filteredItems = items.filter(item => 
        item.name["heb"].toLowerCase().includes(search.toLowerCase())
    );

    const addItemToShoppingList = (item) => {
        setShoppingList([...shoppingList, item]);
    };

    const screenHeight = Dimensions.get('window').height;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search items..."
                value={search}
                onChangeText={setSearch}
            />
            <View style={[styles.section, { maxHeight: screenHeight / 3 }]}>
                <Text style={styles.sectionTitle}>Available Items</Text>
                <FlatList
                    data={filteredItems}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => addItemToShoppingList(item)}>
                            <View style={styles.item}>
                                <Text>{item.name["heb"]}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.list}
                />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Shopping List</Text>
                <FlatList
                    data={shoppingList}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.item, {}]}>
                            <Text>{item.name["heb"]}</Text>
                            <Text>1</Text>
                        </View>
                    )}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    section: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    list: {
        flexGrow: 1,
    },
    item: {
        padding: 16,
        flexDirection:"row",
        justifyContent: "space-around",
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default ShoppingCart;