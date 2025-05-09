import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import IcLocate from '../../../../assets/icons/Ic_locate';

const LocationInfo = ({ location }) => {
    const handlePress = () => {
        const url = Platform.select({
            ios: `maps://?q=${location}`,
            android: `https://maps.google.com/?q=${location}`,
        });
        console.log('url: ', url);
        Linking.openURL(url).catch((err) => console.error('Error opening map: ', err))
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View>
                <IcLocate />
            </View>
            <Text style={styles.text}>
                {location || 'Không có tên địa điểm'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 12,
        alignItems: 'center',
    },
    text: {
        lineHeight: 20,
        fontSize: 14,
        letterSpacing: 0.25,
        color: '#2E2E2E',
        fontStyle: 'normal',
        fontWeight: '400',
        textDecorationColor: 'blue',
        textDecorationLine: 'underline',
    },
});

export default LocationInfo;
