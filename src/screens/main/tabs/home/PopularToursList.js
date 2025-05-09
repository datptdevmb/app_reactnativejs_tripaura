import React, { useState, useCallback, memo } from 'react';
import { TouchableOpacity, View, FlatList, StyleSheet, Image, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import IcLocate from '../../../../assets/icons/Ic_locate'; // Ví dụ bạn có icon cho location

const renderItem = ({ item, isVisible, onClick, setImageLoaded }) => {
  console.log(item.image[0])
  console.log(item.imageInfo?.linkImage[0])
  const handleImageLoad = () => {
    setImageLoaded(true); // Khi ảnh tải thành công
  };

  const handleImageError = () => {
    setImageLoaded(false); // Khi ảnh bị lỗi
  };

  return (
    <TouchableOpacity
      key={item._id.toString()}
      onPress={() => onClick()} style={styles.imgContaier}>

      {!isVisible && (
        <View style={styles.imgCon}>
          <Image
            resizeMode='contain'
            style={styles.imageloading}
            source={require('../../../../assets/images/noimage.png')}
          />
        </View>
      )}

      {/* Chỉ tải ảnh khi nó gần màn hình */}
      {isVisible && (
        <FastImage
          style={styles.image}
          source={{ uri: item.image[0] }}
          onLoad={handleImageLoad} // Được gọi khi ảnh tải thành công
          onError={handleImageError} // Được gọi khi có lỗi tải ảnh
          defaultSource={require('../../../../assets/images/noimage.png')}
        />
      )}

      <Text style={styles.text} numberOfLines={2}>
        {item.tourName}
      </Text>
      <View>
        <View style={{ width: '100%', marginTop: 10, flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <IcLocate />
          </View>
          <View style={{ flex: 9, justifyContent: 'center' }}>
            <Text style={styles.text} numberOfLines={1}>
              {item.locationInfo?.destination}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PopularTourList = ({
  tours, // Danh sách các tour yêu thích
  isLoading, // Trạng thái loading
  onClick // Hàm xử lý khi nhấn vào tour
}) => {
  const [visibleItems, setVisibleItems] = useState([]);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const visibleIds = viewableItems.map(item => item.key);
    setVisibleItems(visibleIds); // Cập nhật danh sách các item đang hiển thị
  }, []);
  console.log(tours)

  return (
    <View style={styles.container}>
      {
        isLoading ? (
          <View style={styles.flexRow}>
            {[...Array(2)].map((_, index) => (
              <View key={index} style={styles.View}>
                <SkeletonPlaceholder key={index}>
                  <Image style={{ marginTop: 10, borderRadius: 8, marginStart: 10, marginEnd: 14, width: '90%', height: 150 }} />
                  <Text style={{ marginTop: 10, marginStart: 10, marginEnd: 14, width: '90%', height: 14 }}></Text>
                  <Text style={{ marginTop: 10, marginStart: 10, marginEnd: 14, width: '90%', height: 14 }}></Text>

                  {/* <View style={{ borderRadius: 10, marginEnd: 14, width: 225, height: 250 }}></View>
                  <Text style={{ marginTop: 10, marginEnd: 14, width: 224, height: 14 }}></Text>
                  <Text style={{ marginTop: 8, marginEnd: 14, width: 224, height: 14 }}></Text>
                  <View style={styles.flexRow}>
                    <Image style={{ marginTop: 10, borderRadius: 10, marginEnd: 14, width: 20, height: 20 }} />
                    <Text style={{ marginTop: 10, marginEnd: 14, width: 190, height: 14 }}></Text> */}

                </SkeletonPlaceholder>
              </View>
            ))}
          </View>
        ) : (
          <FlatList
            scrollEnabled={false}
            style={styles.flatC}
            data={tours}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id.toString()}
            windowSize={5}
            renderItem={({ item }) => (
              <ItemWithVisibility
                onClick={onClick}
                item={item}
                isVisible={visibleItems.includes(item._id)} // Kiểm tra xem item có trong danh sách hiển thị
              />
            )}
            onViewableItemsChanged={onViewableItemsChanged} // Theo dõi các item hiển thị
            viewabilityConfig={{
              itemVisiblePercentThreshold: 10, // Giảm xuống 10% để tải ảnh khi item xuất hiện một phần
            }}
            initialNumToRender={5} // Tải trước vài item đầu tiên
            maxToRenderPerBatch={5} // Tải tiếp các item khi cuộn
          />
        )
      }
    </View>
  );
};

const ItemWithVisibility = ({ onClick, item, isVisible }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return renderItem({ onClick, item, isVisible, setImageLoaded });
};

const styles = StyleSheet.create({
  imageloading: {
    width: 60,
    height: 60,
    borderRadius: 8
  },
  imgCon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '96%',
    height: 250,
  },
  image: {
    width: '96%',
    height: 100,
    borderRadius: 12
  },
  flatC: {
    width: '100%',
    paddingVertical: 5,
  },
  View: {
    height: 220,
    // alignItems: 'center',
    width: '48%',
    // justifyContent: 'center',
    marginEnd: 16,
    marginBottom: 16,

    overflow: 'hidden', // Đảm bảo phần tử con không tràn ra ngoài bo góc
    borderRadius: 10, // Đảm bảo border-radius áp dụng cho nội dung bên trong
    shadowColor: '#000', // Màu bóng
    shadowOffset: { width: 0, height: 4 }, // Độ lệch bóng
    shadowOpacity: 0.1, // Độ mờ của bóng
    shadowRadius: 3, // Bán kính bóng
    elevation: 4, // Đổ bóng trên Android
    backgroundColor: 'white',
  },

  imgContaierLod: {
    padding: 8,
    marginEnd: 28,
    paddingStart: 28,
    justifyContent: 'center',
    width: 250,
    height: 350,
    overflow: 'hidden',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    marginEnd: 24,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  flexRow: {
    flexDirection: 'row',
  },
  imgContaier: {
    height: 220,
    width: '48%',
    marginEnd: 16,
    marginBottom: 16,
    padding: 10,
    overflow: 'hidden', // Đảm bảo phần tử con không tràn ra ngoài bo góc
    borderRadius: 10, // Đảm bảo border-radius áp dụng cho nội dung bên trong
    shadowColor: '#000', // Màu bóng
    shadowOffset: { width: 0, height: 4 }, // Độ lệch bóng
    shadowOpacity: 0.1, // Độ mờ của bóng
    shadowRadius: 3, // Bán kính bóng
    elevation: 4, // Đổ bóng trên Android
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    paddingVertical: 6,
    height: 400,
  },
});

export default memo(PopularTourList);
