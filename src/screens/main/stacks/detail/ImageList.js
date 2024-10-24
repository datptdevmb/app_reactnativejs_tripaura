import React from 'react';
import {View, Image, StyleSheet} from 'react-native';


const ImageList = ({dataimage}) => {
  return (
    <View style={styles.containerItemImage}>
      {dataimage &&
        dataimage.map((item, index) => (
          <View key={index}>
            <Image style={styles.itemImage} source={{uri: item}} />
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  containerItemImage: {
    marginTop: 2,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  itemImage: {
    width: 91,
    height: 72,
    marginEnd: 2,
  },
});

export default ImageList;
