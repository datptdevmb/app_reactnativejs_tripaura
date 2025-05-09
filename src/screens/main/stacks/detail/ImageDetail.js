import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import ImageListCarousel from './ImageListCarousel';
import {SafeAreaView} from 'react-native-safe-area-context';

function ImageDetail({navigation}) {
  const {tourById} = useSelector(state => state.reducer.tour);
  const {imges} = tourById;

  function handleClickToFull() {
    navigation.navigate('Ponorama');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleClickToFull} style={styles.btnCon}>
          <Text style={styles.textStyle}>Xem toàn cảnh</Text>
        </TouchableOpacity>
        <ImageListCarousel dataimage={imges} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#262c36', // Nền tối cho phần safe area
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#262c36', // Nền tối cho phần chính
  },
  //   btnCon: {
  //     position: 'absolute',
  //     top: 40, // Điều chỉnh vị trí của nút để tránh che ảnh
  //     padding: 20,
  //     backgroundColor: 'rgba(0, 0, 0, 0.7)', // Nền tối bán trong suốt cho nút
  //     borderRadius: 5,
  //   },
  textStyle: {
    marginLeft: 320,
    marginTop: 100,
    color: '#848d97',
    fontSize: 14,
  },
});

export default ImageDetail;
