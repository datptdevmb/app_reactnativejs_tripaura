import React, { useRef, useEffect } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import colors from '../../../../constants/colors';

const GlowingText = () => {
  const shineAnim = useRef(new Animated.Value(0)).current; // Giá trị animation ban đầu

  useEffect(() => {
    Animated.loop(
      Animated.timing(shineAnim, {
        toValue: 1,
        duration: 4000, // Thời gian cho dải sáng chạy từ trái sang phải
        useNativeDriver: false,
      })
    ).start();
  }, [shineAnim]);

  const translateX = shineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 200], // Dải sáng di chuyển qua chiều ngang
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* Text với màu cơ bản */}
        <Text style={styles.text}>Tripaura</Text>
        {/* Hiệu ứng phát sáng */}
        <Animated.View
          style={[
            styles.shine,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000', // Nền tối để làm nổi bật hiệu ứng
  },
  textContainer: {
    position: 'relative',
  },
  text: {
    fontSize: 24,
    fontStyle:'normal',
    fontWeight: '600',
    color: colors.primary_600, // Màu chữ cơ bản
  },
  shine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Màu dải sáng
    width: 100, // Độ rộng của dải sáng
    height: '100%',
    opacity: 0.8,
    borderRadius: 10,
  },
});

export default GlowingText;
