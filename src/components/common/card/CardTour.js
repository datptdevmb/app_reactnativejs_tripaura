import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import EmailIcon from '../../../assets/icons/bottom_tab/Ic_email';
import FavoriteIcon from '../../../assets/icons/bottom_tab/Ic_favorite';
import IcLocate from '../../../assets/icons/Ic_locate';
import formatCurrencyVND from '../../../untils/formatCurrencyVND';

const { width } = Dimensions.get('window');
const TourCard = ({ tour, onClickFavorite, onClickItem }) => {
  return (
    <TouchableOpacity
      onPress={() => onClickItem(tour._id)}
      style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: tour?.imageInfo.linkImage[0] }}
          style={styles.image}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.tourTitle} numberOfLines={2}>
          {tour?.tourName}
        </Text>
        <View style={styles.locationContainer}>
          <IcLocate />
          <Text style={styles.locationText} numberOfLines={1}>
            {tour?.locationInfo?.destination}
          </Text>
        </View>
        <Text style={styles.price}>{formatCurrencyVND(tour?.detailInfo?.priceAdult)} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.43,
    marginEnd: width * 0.03, 
    backgroundColor: '#F8F8F8',
    borderRadius: width * 0.025,
    shadowColor: '#000',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 16,
  },
  infoContainer: {
    padding: 10,
  },
  tourTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    paddingRight:10,
    marginLeft: 5,
    color: '#888',
    fontSize: 14,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default TourCard;
