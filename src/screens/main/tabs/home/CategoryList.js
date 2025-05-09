import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../../../constants/colors';

const CategoryList = ({ categories, isLoading, selectedIndex, onCatePress }) => {
  console.log('renderCate')
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ padding: 6 }} >
        <TouchableOpacity style={[styles.itemCate, selectedIndex === index && styles.itemCateSelec]} onPress={() => onCatePress(item, index)}>
          <FastImage
            tintColor={selectedIndex === index ? 'white' : 'black'}
            style={styles.icon}
            resizeMode='cover' source={{ uri: item.icon }} />
          <Text style={[styles.textCate, selectedIndex === index && styles.selectedItem]}>
            {item.name}
          </Text>
        </TouchableOpacity>
        {selectedIndex === index && <View style={styles.dotStyle}></View>}
      </View>
    )
  }


  return (
    <View style={styles.container}>
      {
        isLoading
          ? (
            <View >

              <View style={styles.flexRow}>

                {[...Array(5)].map((_, index) => (
                  <SkeletonPlaceholder key={index}>
                    {/* <Text style={{ borderRadius: 6, marginRight: 24, marginTop: 45, width: 200, height: 22 }}>Danh mục chuyến đi </Text> */}
                    {/* <View style={{ marginStart: 16, width: 150, height: 120 }}></View>
                    <Text style={{ marginStart: 16, marginTop: 12, width: 145, height: 14 }}></Text> */}
                    <Text style={{ borderRadius: 4, marginRight: 24, marginTop: 45, width: 80, height: 44 }}></Text>
                  </SkeletonPlaceholder>
                ))}
              </View>
            </View>
          )
          : (
            <View>
              {/* <Text style={styles.text}>Danh mục chuyến đi</Text> */}
              <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryContainer}
              />
            </View>

          )
      }
    </View>

  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    // marginTop: 24,
  },
  text: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'Poppins-Bold.ttf'
  },
  itemCateSelec: {
    backgroundColor: colors.primary_500,
    overflow: 'hidden', // Đảm bảo phần tử con không tràn ra ngoài bo góc
    borderRadius: 6, // Đảm bảo border-radius áp dụng cho nội dung bên trong
    shadowColor: colors.primary_200, // Màu bóng
    shadowOffset: { width: 0, height: 4 }, // Độ lệch bóng
    shadowOpacity: 1, // Độ mờ của bóng
    shadowRadius: 2, // Bán kính bóng
    elevation: 4, // Đổ bóng trên Android
  },
  itemCate: {
    flexDirection: 'row',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    overflow: 'hidden', // Đảm bảo phần tử con không tràn ra ngoài bo góc
    borderRadius: 8, // Đảm bảo border-radius áp dụng cho nội dung bên trong
    shadowColor: '#000', // Màu bóng
    shadowOffset: { width: 1, height: 2 }, // Độ lệch bóng
    shadowOpacity: 1, // Độ mờ của bóng
    shadowRadius: 1.3, // Bán kính bóng
    elevation: 2, // Đổ bóng trên Android

  },
  selectedImage: {
    tintColor: 'red'
  },
  selectedItem: {
    color: 'white',
  },
  container: {
    // alignItems:'center',
    // justifyContent:'center',
    // backgroundColor: 'red'
  },
  icon: {
    width: 26,
    height: 26,
    marginEnd: 10
  },
  flexRow: {
    flexDirection: 'row',
  },
  textCate: {
    color: '#A8A8A8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007BFF',
    marginTop: 4,
  },
});

export default CategoryList;
