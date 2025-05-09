import { memo } from "react";
import { Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";


const Slider = (({images}) => {
  return (
    <Swiper
      showsHorizontalScrollIndicator={false}
      autoplay
      loop
      autoplayTimeout={3}>
      {images.map((item, index) => (
        <Image key={index} style={styles.itemSwiper} source={{uri: item}} />
      ))}
    </Swiper>
  );
});

const styles = StyleSheet.create({
    itemSwiper: {
        resizeMode: 'cover',
        borderRadius: 12,
        flex: 1,
      },
})

export default memo(Slider);
