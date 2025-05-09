import React, {useRef} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width} = Dimensions.get('window');

const ImageListCarousel = ({dataimage}) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item}} style={styles.image} />
    </View>
  );

  if (!dataimage || dataimage.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={dataimage}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.85} // Tăng kích thước ảnh hiển thị
        loop={true}
        autoplay={true}
        autoplayDelay={2000} // Thời gian chờ ảnh đầu tiên
        autoplayInterval={3000} // Tốc độ chuyển ảnh
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.8}
        activeSlideAlignment="center"
        onSnapToItem={index => setActiveIndex(index)} // Cập nhật chỉ số của ảnh hiện tại
      />

      {/* Pagination (dấu chỉ thị) */}
      <Pagination
        dotsLength={dataimage.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262c36', // Nền tối
    paddingVertical: 10,
    flex: 1, // Đảm bảo carousel chiếm toàn bộ không gian có sẵn
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff', // Màu trắng cho các card
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'center', // Đảm bảo ảnh được căn giữa trong mỗi card
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'cover', // Sử dụng cover để đảm bảo ảnh không bị kéo giãn
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10, // Đảm bảo dấu chỉ thị ở dưới ảnh
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: 'rgba(0,255, 255, 224)', // Màu chấm hiện tại
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: 'rgba(0,238, 238, 209)', // Màu chấm không chọn
  },
});

export default ImageListCarousel;
