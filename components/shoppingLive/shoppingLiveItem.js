import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const ShoppingLiveItem = ({ item }) => {
    const name = item?.item?.name?.heb || item?.name?.eng || "Unknown";
    const quantity = item?.quantity || 0;

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.quantity}>Quantity: {quantity}</Text>
        </View>
    );
};

ShoppingLiveItem.propTypes = {
    item: PropTypes.shape({
        item: PropTypes.shape({
            name: PropTypes.shape({
                heb: PropTypes.string,
                eng: PropTypes.string,
            }),
        }),
        name: PropTypes.shape({
            eng: PropTypes.string,
        }),
        quantity: PropTypes.number,
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin: 5,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    quantity: {
        fontSize: 16,
        color: "#555",
    },
});

export default ShoppingLiveItem;