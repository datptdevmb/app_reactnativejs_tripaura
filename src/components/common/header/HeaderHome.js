import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../../constants/colors';
import GlowingText from '../../../screens/main/tabs/home/GowingText';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HeaderHome() {

  const [user, setUser] = useState(null);
  console.log('userddddddddddddddđ', user);


  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const userData = await AsyncStorage.getItem('userId');
          const parsedData = JSON.parse(userData);
          setUser(parsedData || null);
        } catch (error) {
        }
      };

      fetchUserData();
      return () => {
        setUser(null);
      };
    }, [])
  );

  const image =
    user?.user?.avatar && typeof user.user.avatar === "string"
      ? { uri: user.user.avatar }
      : require("../../../assets/images/image.png");

  return (
    <View style={[styles.flex_row, styles.headerContainer]}>
      <FastImage
        style={styles.image}
        resizeMode='cover'
        source={image} />
      <GlowingText />
      <View style={[styles.flex_row, styles.iconContainer]}>
        <View>
        </View>
        <TouchableOpacity>
          <View style={styles.imageView}>
            <Image
              style={styles.noticeIcon}
              source={require('../../../assets/images/not.jpg')}
            />
          </View>

        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 8
  },
  noticeIcon: {
    width: 35,
    height: 35,
    borderRadius: 8
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 10,
    position: 'static',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex_row: {
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 28,
    fontStyle: 'normal',
    color: '#595454',
    fontWeight: 'bold',
  },
  imageView: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Grey_0,
    borderRadius: 10,
    overflow: 'hidden', // Đảm bảo phần tử con không tràn ra ngoài bo góc
    borderRadius: 10, // Đảm bảo border-radius áp dụng cho nội dung bên trong
    shadowColor: '#000', // Màu bóng
    shadowOffset: { width: 0, height: 4 }, // Độ lệch bóng
    shadowOpacity: 3, // Độ mờ của bóng
    shadowRadius: 2, // Bán kính bóng
    elevation: 4, // Đổ bóng trên Android
    backgroundColor: '#EDEDED',
  },
  iconContainer: {
    justifyContent: 'space-between',
  },
});

export default memo(HeaderHome);

