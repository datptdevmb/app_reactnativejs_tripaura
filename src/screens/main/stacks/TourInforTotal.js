import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import formatCurrencyVND from '../../../untils/formatCurrencyVND';

const TourInforTotal = ({ price, adultPrice, childPrice }) => {
  return (
    <View style={styles.tourInfor}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={
            styles.text
          }>Giá người lớn
        </Text>
        <Text>
          {formatCurrencyVND(
            adultPrice)},
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={
            styles.text
          }>Gía trẻ em</Text>
        <Text>
          {formatCurrencyVND(childPrice)}
        </Text>
      </View>

      <Text style={styles.live}></Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.textTong}>
          Giá tổng:

        </Text>
        <Text>{formatCurrencyVND(price)}</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  textcong: {
    fontStyle: 'normal',
    fontWeight: '300',
    fontFamily: 'Lato',
    fontSize: 15,
    color: '#757575',
  },
  textTong: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Lato',
  },
  live: { height: 0.5, backgroundColor: 'black', width: 330 },
  tourInfor: {
    backgroundColor: 'white',
    padding: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DA712F',
  },
  text: {
    height: 25,
    fontStyle: 'normal',
    fontWeight: '300',
    fontFamily: 'Lato',
    marginTop: 5,
    fontSize: 15,
    color: '#757575',
  },
});

export default TourInforTotal;
