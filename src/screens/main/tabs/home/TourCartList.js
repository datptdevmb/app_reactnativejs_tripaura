// import React, { memo } from 'react';
// import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import TourCard from '../../../../components/common/card/CardTour'; // Giả sử bạn đã có component TourCard

// import FastImage from "react-native-fast-image";

// const TourCardList = ({
//   tours,
//   onClickItem,
//   selectedFavorite,
//   isLoading,
//   onClickFavorite,
// }) => {
//   return (
//     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//       <View style={styles.container}>
//         {isLoading ? (
//           <SkeletonPlaceholder>
//             <View style={styles.skeletonContainer}>
//               {[...Array(5)].map((_, index) => (
//                 <View key={index} style={styles.skeletonTourCard} />
//               ))}
//             </View>
//           </SkeletonPlaceholder>
//         ) : (
//           tours.map((tour, index) => {
//             console.log('reder')
//             return (
//               <TourCard
//                 selectedFavorite={selectedFavorite}
//                 key={index}
//                 tour={tour}
//                 onClickItem={onClickItem}
//                 onClickFavorite={() => onClickFavorite(tour, index)}
//               />
//             )
//           }


//           )
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     marginTop: 24,
//   },
//   skeletonContainer: {
//     flexDirection: 'row',
//     padding: 16,
//   },
//   skeletonTourCard: {
//     width: 100,
//     height: 150,
//     borderRadius: 10,
//     marginRight: 10,
//   },
// });
// import React from 'react';
// import { View, FlatList, StyleSheet, Image, Text } from 'react-native';
// import FastImage from 'react-native-fast-image'; // Giả sử bạn đang sử dụng FastImage
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// const renderItem = ({ item }) => {
//   console.log('===================')
//   console.log(item)
//   return (
//     <View style={styles.imgContaier}>
//       <FastImage
//         style={styles.image}
//         source={{ uri: item.imageInfo.linkImage[0] }}
//         defaultSource={require('../../../../assets/images/noimage.png')}
//       // Sử dụng `uri` từ item
//       />
//       <Text
//         style={styles.text}
//         numberOfLines={2}>{item.tourName}</Text>
//     </View>
//   );
// };

// const TourCardList = ({
//   tours, // Danh sách các tour
//   onClickItem, // Hàm xử lý khi nhấn vào item
//   selectedFavorite, // Trạng thái yêu thích
//   isLoading, // Trạng thái loading
//   onClickFavorite, // Hàm xử lý khi nhấn vào yêu thích
// }) => {
//   return (
//     <View style={styles.container}>
//       {
//         isLoading ? (
//           <View style={styles.flexRow}>
//             <SkeletonPlaceholder>
//               <View style={{ marginStart: 16, width: 150, height: 120 }}></View>
//               <Text style={{ marginStart: 16, marginTop: 12, width: 145, height: 14 }} ></Text>
//               <Text style={{ marginStart: 16, marginTop: 8, width: 145, height: 14 }} ></Text>
//             </SkeletonPlaceholder>
//             <SkeletonPlaceholder>
//               <View style={{ marginStart: 16, width: 150, height: 120 }}></View>
//               <Text style={{ marginStart: 16, marginTop: 12, width: 150, height: 14 }} ></Text>
//               <Text style={{ marginStart: 16, marginTop: 8, width: 150, height: 14 }} ></Text>
//             </SkeletonPlaceholder>
//             <SkeletonPlaceholder>
//               <View style={{ marginStart: 16, width: 150, height: 120 }}></View>
//               <Text style={{ marginStart: 16, marginTop: 12, width: 150, height: 14 }} ></Text>
//               <Text style={{ marginStart: 16, marginTop: 8, width: 150, height: 14 }} ></Text>
//             </SkeletonPlaceholder>
//             <SkeletonPlaceholder>
//               <View style={{ marginStart: 16, width: 150, height: 120 }}></View>
//               <Text style={{ marginStart: 16, marginTop: 12, width: 150, height: 14 }} ></Text>
//               <Text style={{ marginStart: 16, marginTop: 8, width: 150, height: 14 }} ></Text>
//             </SkeletonPlaceholder>
//           </View>

//         ) : (
//           <FlatList
//             data={tours}
//             horizontal
//             keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()} // Nếu _id có, dùng nó, nếu không thì dùng index
//             renderItem={renderItem} // Gọi renderItem để render từng phần tử
//           />
//         )
//       }

//     </View >
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     width: '96%',
//     height: '60%',
//   },
//   text: {
//     marginTop: 12,
//     fontSize: 14,
//     fontStyle: 'normal',
//     fontWeight: '600'
//   },
//   flexRow: {
//     flexDirection: 'row'
//   },
//   imgContaier: {
//     padding: 8,
//     marginEnd: 14,
//     width: 155,
//     height: 200,
//     overflow: 'hidden', // Đảm bảo phần tử con không tràn ra ngoài bo góc
//     borderRadius: 10, // Đảm bảo border-radius áp dụng cho nội dung bên trong
//     shadowColor: '#000', // Màu bóng
//     shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
//     shadowOpacity: 0.05, // Độ mờ của bóng
//     shadowRadius: 1, // Bán kính bóng
//     elevation: 2, // Đổ bóng trên Android
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   container: {
//     width: '100%',
//     height: 300
//     // backgroundColor:'blue'
//   },
//   skeletonContainer: {
//     flexDirection: 'row',
//     padding: 16,
//   },
//   skeletonTourCard: {
//     width: 100,
//     height: 150,
//     borderRadius: 10,
//     marginRight: 10,
//   },
// });

// export default TourCardList;

import React, { useState, useCallback, memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, FlatList, StyleSheet, Image, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import IcLocate from '../../../../assets/icons/Ic_locate';

const renderItem = ({ item, isVisible, onClick, setImageLoaded }) => {
  const handleImageLoad = () => {
    setImageLoaded(true); // Khi ảnh tải thành công
  };

  const handleImageError = () => {
    setImageLoaded(false); // Khi ảnh bị lỗi
  };

  return (
    <TouchableOpacity
      key={item._id.toString()}
      onPress={() => onClick(item._id)} style={styles.imgContaier}>

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
          source={{ uri: item.imageInfo?.linkImage[0] }}
          onLoad={handleImageLoad} // Được gọi khi ảnh tải thành công
          onError={handleImageError} // Được gọi khi có lỗi tải ảnh
          defaultSource={require('../../../../assets/images/noimage.png')}
        />
      )}

      <Text
        style={styles.text}
        numberOfLines={2}>
        {item.tourName}
      </Text>
      <View>
        < View style={{ width: '100%', marginTop: 10, flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <IcLocate />
          </View>
          <View style={{ flex: 9, justifyContent: 'center' }}>
            <Text
              style={styles.text}
              lineBreakMode='clip'
              numberOfLines={1}>
              {item.locationInfo?.destination}
            </Text>
          </View>
        </View>
      </View>

    </TouchableOpacity>
  );
};

const TourCardList = ({
  tours, // Danh sách các tour
  isLoading,
  horizontal,
  numColumns,
  onClick// Trạng thái loading
}) => {
  console.log('renderList')
  const [visibleItems, setVisibleItems] = useState([]);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const visibleIds = viewableItems.map(item => item.key);
    setVisibleItems(visibleIds); // Cập nhật danh sách các item đang hiển thị
  }, []);

  return (
    <View style={styles.container}>
      {
        isLoading ? (
          <View style={styles.flexRow}>
            {[...Array(4)].map((_, index) => (
              <View key={index} style={styles.imgContaierLod}>
                <SkeletonPlaceholder key={index}>
                  <View style={{ borderRadius: 10, marginEnd: 14, width: 225, height: 250 }}></View>
                  <Text style={{ marginTop: 10, marginEnd: 14, width: 224, height: 14 }}></Text>
                  <Text style={{ marginTop: 8, marginEnd: 14, width: 224, height: 14 }}></Text>
                  <View style={styles.flexRow}>
                    <Image style={{ marginTop: 10, borderRadius: 10, marginEnd: 14, width: 20, height: 20 }} />
                    <Text style={{ marginTop: 10, marginEnd: 14, width: 190, height: 14 }}></Text>
                  </View>

                </SkeletonPlaceholder>
              </View>
            ))}
          </View>
        ) : (
          <View>
            {/* <Text>Chuyến đi đc săn đón</Text> */}
            <FlatList
              style={styles.flatC}
              data={tours}
              numColumns={horizontal ? 1 : 2}
              showsHorizontalScrollIndicator={false}
              horizontal={horizontal}
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
                itemVisiblePercentThreshold: 10, // Giảm xuống 5% để tải ảnh khi item chỉ mới xuất hiện một phần
              }}
              initialNumToRender={5} // Tải trước vài item đầu tiên
              maxToRenderPerBatch={5} // Tải tiếp các item khi cuộn
            />
          </View>

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
    height: 250,
    borderRadius: 12
  },
  flatC: {
    width: '100%',
    paddingVertical: 5,


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
    padding: 8,
    marginEnd: 14,
    width: 250,
    height: 360,
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
  container: {
    width: '100%',
    paddingVertical: 6,
    height: 400,
  },
  skeletonContainer: {
    flexDirection: 'row',
    padding: 16,
  },
});

export default memo(TourCardList)

