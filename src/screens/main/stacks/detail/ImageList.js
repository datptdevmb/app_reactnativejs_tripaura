import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const ImageList = ({ dataimage, handleImagePress }) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={dataimage}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => handleImagePress(item)}>
          <Image source={{ uri: item }} style={styles.itemImage} />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  containerItemImage: {
    marginTop: 2,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  itemImage: {
    width: 94,
    height: 72,
    marginEnd: 2,
    margin: 1,
  },
});

export default ImageList;
