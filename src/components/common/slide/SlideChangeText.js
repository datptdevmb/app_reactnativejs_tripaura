import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import colors from '../../../constants/colors';

const texts = ["Chào Mừng", "Đến Với", "TRIPAURA"];

const SlideChangeText = () => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {

            Animated.timing(slideAnim, {
                toValue: -10,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => {
                setIndex((prevIndex) => (prevIndex + 1) % texts.length);
                slideAnim.setValue(30);
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }).start();
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [slideAnim]);

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.text, { transform: [{ translateY: slideAnim }] }]}>
                {texts[index]}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderRadius: 10,
        paddingHorizontal:12,
        marginTop: 5,
        // width: 60,
        height:15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary_200,
    },
    text: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.onPrimary,
    },
});

export default SlideChangeText;
