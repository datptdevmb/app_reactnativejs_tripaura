import React from 'react';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';
import ReviewCard from '../../../../components/common/card/ReviewCard';
import { Rating } from 'react-native-ratings';
import Lable from '../../../../components/common/labelText';
import Button from '../../../../components/common/button/Button';



const ReviewList = ({ reviews, onSeeMore, tourId }) => {
  console.log('=================')
  console.log(typeof (reviews))


  return (
    <View>
      <Lable style={styles.lable} lable={'Đánh giá chuyến đi'} />
      <View>
        {
          Object.keys(reviews).length !== 0
            ? (
              <View>

                <View style={styles.ratingContainer}>
                  <View style={styles.row}>
                    <Text style={styles.rating}>5</Text>
                    <Text style={styles.text}>/5</Text>
                  </View>

                  <Rating
                    style={styles.starRating}
                    ratingCount={5}
                    startingValue={5}
                    imageSize={14}
                  />
                  <Text style={styles.totalReviews}>{reviews.length} đánh giá</Text>
                </View>

                <FlatList
                  horizontal={true}
                  data={reviews}
                  keyExtractor={(item) => item._id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                      <ReviewCard review={item} />
                    </View>
                  )}
                  showsHorizontalScrollIndicator={false}
                />


                <Button
                  onPress={() => onSeeMore(tourId)}
                  style={styles.btn}
                  styleText={styles.textBtn}
                  label="Xem thêm đánh giá"
                />
              </View>
            )
            : (
              <View style={styles.flrow}>
                <Image
                  style={styles.iconNotFoud}
                  source={require('../../../../assets/icons/ic_Rate.png')} />
                <Text style={styles.texta}>Hiện ko có đánh giá</Text>
              </View>
            )
        }

      </View>
    </View>



  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flrow: {
    marginTop: 24,
    alignItems: 'center'
  },
  lable: {
    marginTop: 12,
  },
  btn: {
    height: 44,
    marginTop: 20,
    backgroundColor: 'white',
    borderWidth: 0.8,
    borderColor: 'black',
  },
  textBtn: {
    color: 'black',
  },
  texta: {
    fontSize: 14,
    color: "black"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  starRating: {
    marginHorizontal: 5,
  },
  totalReviews: {
    fontSize: 14,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: 'gray',
  },
  cardContainer: {
    paddingRight: 10, // Thêm khoảng cách giữa các ReviewCard
  },
  iconNotFoud: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  }
});

export default ReviewList;