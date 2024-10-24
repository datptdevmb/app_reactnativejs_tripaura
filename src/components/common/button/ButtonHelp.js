import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonHelp = ({ title, iconSource, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerbutton} onPress={onPress}>
                <Image style={styles.icon} source={iconSource} />
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonHelp

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom:13,
    },
    containerbutton: {
        width: '100%',
        height: 'auto',
        borderRadius: 8,
        borderColor: '#DADADA',
        borderWidth: 2,
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    text: {
        color: '#000',
        fontFamily: 'Lato',
        fontSize: 14,
        marginLeft: 10,
        fontWeight: '500',
    }
})
