import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Lable from '../../../../components/common/labelText';
import Button from '../../../../components/common/button/Button';
import {useEffect, useRef, useState} from 'react';
import colors from '../../../../constants/colors';
import {dataimage, tourdetail, days} from '../../../../constants/data';
import Icons from '../../../../constants/Icons';
import IcLocate from '../../../../assets/icons/Ic_locate';
import IcClock from '../../../../assets/icons/Ic_clock';
import IcleftArrow from '../../../../assets/icons/Ic_leftArrow';
import IcFavorite from '../../../../assets/icons/bottom_tab/Ic_favorite';
import IcNFavorite from '../../../../assets/icons/bottom_tab/Ic_NtFavorite';
import ReviewCard from '../../../../components/common/card/ReviewCard';
import IcCalendar from '../../../../assets/icons/Ic_calendar';
import {Rating} from 'react-native-ratings';
import IcBelow from '../../../../assets/icons/Ic_belowArrow';
import Accordion from '../../../../components/common/accordion/accordion';
import {AnimatedScrollView} from '@kanelloc/react-native-animated-header-scroll-view';
import {fetchTourById} from '../../../../redux/slices/tour.slice';
import {useDispatch, useSelector} from 'react-redux';
import ImageList from './ImageList';
import {themXoaYeuThichTour} from '../../../../redux/slices/favouriteAddDeleteducers';

const review = {
  reviewName: 'datpham',
  reviewDate: '05/10/2024',
  reviewContent: 'Một trải nghiệm tuyệt vời đáng để trải nghiệm',
};

const generalTerms = [
  {
    subTitle: 'Xác nhận',
    content: [
      'Hệ thống xác nhận ngay tức thời nếu không nhận được email phản hồi của hệ thống hãy liên hệ với chúng tôi',
    ],
  },
  {
    subTitle: 'Chính sách hủy',
    content: ['Hoàn tiền nếu hủy trước khi tour khởi hành tối thiểu 48h'],
  },
];
const general = [
  {
    content: [
      'Vui lòng tự bảo quản tài sản cá nhân chúng tôi khi chịu trách nhiệm về sự việcMọi thất mất vui lòng liên hệ + 84353944291',
    ],
  },
];

const HeaderNavBar = ({title, onPressed, isFavorite, onPressFavorite}) => {
  return (
    <TouchableOpacity onPress={onPressed} style={styles.headerN}>
      <View style={styles.IconArrowCon}>
        <IcleftArrow />
      </View>

      <TouchableOpacity
        onPress={onPressFavorite}
        style={styles.IconFavoriteCon}>
        {isFavorite ? <IcNFavorite /> : <IcFavorite />}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const TopNavBar = () => {
  return (
    <View style={styles.navBar}>
      <IcleftArrow style={styles.navBar_Back} />
      {/* <IcFavorite style={styles.navBar_Favorite} />
      <IcFavorite style={styles.navBar_Support} /> */}
    </View>
  );
};

function Detail({navigation, route}) {
  // trang thái Yêu thích
  const [isFavorite, setIsFavorite] = useState(false);
  // kiểm tra có chưa
  const {_id} = route.params;

  const {tourById: tour} = useSelector(state => state.reducer.tour);
  const tourId = tour[0]?._id;
  const userData = useSelector(state => state.reducer.auth.user);
  const userId = userData?.user?._id;
  // console.log('User ID:', userId);
  // console.log('Tour ID:', tourId);

  // Lấy user từ Redux state
  const dispatch = useDispatch();
  // const [selected , setSelected] = useState(flase)

  useEffect(() => {
    dispatch(fetchTourById(_id));
  }, [_id, dispatch]);

  const [selectedInd, setSeletedInd] = useState(0);
  const [selectedAllday, setSelectedAllday] = useState(false);

  function handleItemDayPress(index) {
    setSeletedInd(index);
    setSelectedAllday(false);
  }

  function handleFavorite() {
    if (userId && tourId) {
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);
      dispatch(themXoaYeuThichTour({userId, tourId}));
      ToastAndroid.show(
        newFavoriteStatus ? 'Đã thêm vào yêu thích!' : 'Đã bỏ yêu thích!',
        ToastAndroid.SHORT,
      );
    } else {
      console.warn('Thiếu tourId hoặc userId.');
    }
  }

  function handleClickAllday() {
    setSeletedInd(null);
    setSelectedAllday(true);
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />

      {tour && tour[0] && tour[0].images ? (
        <AnimatedScrollView
          HeaderNavbarComponent={
            <HeaderNavBar
              isFavorite={isFavorite}
              onPressFavorite={handleFavorite}
            />
          }
          TopNavBarComponent={<TopNavBar />}
          topBarHeight={120}
          headerImage={tour && {uri: tour[0].images[0].linkImage[0]}}>
          <ImageList dataimage={tour[0].images[0].linkImage} />

          <View style={styles.contentContaienr}>
            <Text style={styles.tourname}>{tour[0].tourName}</Text>

            <View style={[styles.mr_top, styles.flex_row]}>
              <View style={[styles.flex_row, styles.ctVetical]}>
                <View style={styles.IclocateContainer}>
                  <IcLocate />
                </View>
                <Text style={styles.text}>
                  {tour[0].locations[0].destination}
                </Text>
              </View>

              <View style={[styles.flex_row, styles.ctVetical, styles.mr_s_24]}>
                <View style={styles.IclocateContainer}>
                  <IcClock />
                </View>
                <Text style={styles.text}>{tourdetail.day}</Text>
              </View>
            </View>

            <View style={styles.indicator}></View>

            <Lable style={styles.mr_top} lable={'Ngày khởi hành hiện có'} />

            <View style={styles.flex_row}>
              {days &&
                days.map((item, index) => (
                  <View key={index}>
                    <Button
                      styleText={
                        index === selectedInd
                          ? styles.btndaytextSelected
                          : styles.btndaytext
                      }
                      onPressed={() => handleItemDayPress(index)}
                      style={
                        index === selectedInd
                          ? styles.selectedItem
                          : styles.btnday
                      }
                      label={item.day}
                    />
                  </View>
                ))}
              <TouchableOpacity
                onPress={handleClickAllday}
                style={[
                  selectedAllday ? styles.btndayflase : styles.btnday,
                  styles.flex_row,
                ]}>
                <IcCalendar />
                <IcBelow />
              </TouchableOpacity>
            </View>

            <Lable style={styles.mr_t_26} lable={'Mô tả chuyến đi'} />
            <Text style={[styles.bodytext, styles.mr_t_14]}>
              {tour[0].description}
            </Text>
            <Lable style={styles.mr_t_14} lable={'Đánh giá chuyến đi'} />

            <View style={[styles.flex_row, styles.centerVertical]}>
              <View style={[styles.flex_row, styles.centerVertical]}>
                <Text style={styles.textTotalStare}>5</Text>
                <Text>/5</Text>
              </View>
              <Rating
                style={styles.rating}
                ratingCount={5}
                startingValue={5}
                imageSize={14}
              />
              <View>
                <Text style={styles.textD}>1000+ luot danh gia</Text>
              </View>
            </View>
            <ReviewCard review={review} />
            <Button
              label="Xem them danh gia"
              style={styles.btnReview}
              styleText={styles.textBtnReview}
            />

            <Accordion title="Lưu ý trước khi đặt" sections={general} />
            <Accordion title="Điều khoản chung" sections={generalTerms} />
          </View>
        </AnimatedScrollView>
      ) : (
        <></>
      )}

      {/* <TouchableOpacity
        onPress={handleClickImage}
      >
        <Image
          style={styles.image}
          source={Icons.image} />
      </TouchableOpacity> */}

      {/* <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          {
            useNativeDriver: false
          }
        )}

      > */}

      {/* </ScrollView> */}
    </View>
  );
}

export default Detail;

const styles = StyleSheet.create({
  bodytext: {
    fontSize: 14,
    fontStyle: 'normal',
    fontFamily: 'Poppins_Regular',
    fontWeight: 400,
    lineHeight: 21,
    letterSpacing: 0.048,
    color: '#494B4B',
  },
  navBar_Back: {
    position: 'absolute',
    left: 16,
    top: 70,
  },
  navBar_Favorite: {
    position: 'absolute',
    right: 16,
    top: 70,
  },
  navBar_Support: {
    position: 'absolute',
    right: 48,
    top: 70,
  },
  navBar: {
    width: '100%',
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  rating: {
    marginStart: 8,
  },
  IconArrowCon: {
    position: 'absolute',
    padding: 12,
    backgroundColor: colors.onPrimary,
    borderRadius: 20,
    left: 24,
    top: 220,
  },
  headerN: {
    flexDirection: 'row',
    marginTop: 50,
    width: '100%',
    height: 455,
    padding: 20,
    // backgroundColor: 'red',
    // alignContent:'space-evenly',
    // justifyContent: 'space-between',
  },
  textD: {
    fontSize: 16,
    color: '#212121',
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontStyle: 'normal',
    marginStart: 8,
  },
  textTotalStare: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
  },
  btnReview: {
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 30,
  },
  btndayflase: {
    width: 80,
    height: 32,
    backgroundColor: colors.primary_500,
    marginEnd: 12,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  IconFavoriteCon: {
    position: 'absolute',
    padding: 12,
    backgroundColor: colors.onPrimary,
    lineHeight: 24,
    borderRadius: 20,
    right: 16,
    top: 220,
  },
  textBtnReview: {
    color: '#212121',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
  },
  centerVertical: {
    alignItems: 'center',
  },
  IclocateContainer: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 20,
  },
  IconSupportCon: {
    position: 'absolute',
    padding: 12,
    backgroundColor: colors.onPrimary,
    borderRadius: 20,
    right: 80,
    top: 220,
  },
  header: {
    height: 60,
    backgroundColor: '#0572E7', // Màu chính của bạn
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    color: 'black',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mr_s_24: {
    marginStart: 24,
  },
  jt: {
    justifyContent: 'flex-start',
  },
  ctVetical: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.onPrimary,
  },
  image: {
    width: '100%',
    height: 243,
  },
  selectedItem: {
    backgroundColor: colors.primary_500,
    width: 80,
    height: 32,
    marginEnd: 12,
    marginTop: 16,
  },

  tourname: {
    color: colors.Grey_900,
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: '800',
  },
  contentContaienr: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  flex_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnday: {
    width: 80,
    height: 32,
    backgroundColor: colors.Gainsboro,
    marginEnd: 12,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  btndaytextSelected: {
    color: colors.onPrimary,
  },
  text: {
    marginStart: 10,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'regular',
    color: colors.Grey_800,
  },
  btndaytext: {
    color: colors.Grey_800,
  },
  mr_top: {
    marginTop: 12,
  },
  mr_t_26: {
    marginTop: 26,
  },
  cl: {
    flexDirection: 'column',
  },
  indicator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.Grey_0,
    marginTop: 25,
  },
  mr_t_14: {
    marginTop: 14,
  },
  mr_t_16: {
    marginTop: 16,
  },
});
