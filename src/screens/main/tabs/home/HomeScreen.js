import React, {useState, useCallback, useEffect} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  View,
  ScrollView,
  RefreshControl,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../../../../constants/colors';
import Swiper from 'react-native-swiper';
import TourCard from '../../../../components/common/card/CardTour';
import TourCardVetical from '../../../../components/common/card/TourCardVetical';
import {data} from '../../../../constants/data';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategory} from '../../../../redux/slices/category.slice';
import {
  fetchPopularTour,
  fetchTours,
} from '../../../../redux/slices/tour.slice';
import HeaderHome from '../../../../components/common/header/HeaderHome';
import TourCardList from './TourCartList';
import CategoryList from './CategoryList';
import Slider from './Slider';
import PopularToursList from './PopularToursList';
import {useHomeData} from '../../../../hooks/useHomeData';

function HomeScreen ({navigation}){
  const dispatch = useDispatch();


  const {
    categories,
    tours,
    popularTours,
    images,
    isLoading
  } = useHomeData();


  const [refreshing, setRefreshing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  function handleCatePress(item, index) {
    if (selectedIndex !== index) {
      setSelectedIndex(index);
    }
    dispatch(fetchTours(item._id));
  }
  const handleClickFavorite = (tour, index) => {
    if (selectedFavorite === index) {
      setSelectedFavorite(null);
    } else {
      setSelectedFavorite(index);
    }
    console.log(`Tour favorited`);
  };

  function handleClickItem(_id) {
    navigation.navigate('Detail', {_id});
  }

  const handelPopular = useCallback(() => {
    console.log("Popular category selected");
  }, [/* Các giá trị phụ thuộc */]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <HeaderHome />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            progressViewOffset={-200}
            accessibilityElementsHidden={false}
            accessible={false}
            refreshing={refreshing}
            progressBackgroundColor={colors.Gray_0}
            onRefresh={onRefresh}
            style={styles.refreshControl}></RefreshControl>
        }>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

        {refreshing ? (
          <LottieView
            source={require('../../../../assets/lottile/lote.json')}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
        ) : (
          <></>
        )}

        {images && (
          <View style={styles.swiper}>
            <Slider images={images} />
          </View>
        )}

        {categories && (
          <CategoryList
            categories={categories}
            selectedIndex={selectedIndex}
            onCatePress={handleCatePress}
          />
        )}
        {tours && tours.length > 0 ? (
          <TourCardList
            tours={tours}
            onClickItem={handleClickItem}
            onClickFavorite={handleClickFavorite}
            isLoading={isLoading}
          />
        ) : (
          !isLoading && <Text>Không có dữ liệu</Text>
        )}
        <Text style={styles.heading}>Điểm đến được săn đón</Text>
        <PopularToursList  onClick = {handelPopular}popularTours={popularTours} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontStyle: 'normal',
    color: '#4D4C4C',
    fontWeight: '600',
    marginTop: 20,
  },
  card: {
    marginRight: 8,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    paddingTop: 26,
  },

  itemContainer: {
    marginRight: 24,
    alignItems: 'center',
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary_200,
  },
  categoryContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 24,
  },
  selectedItem: {
    color: colors.primary_200,
  },
  textCate: {
    color: '#A8A8A8',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  swiper: {
    width: '100%',
    height: 192,
    marginTop: 12,
  },
  container: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: colors.onPrimary,
  },
  refreshControl: {
    width: '100%',
    height: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonSwiper: {
    width: '100%',
    height: 192,
    borderRadius: 30,
  },
  skeletonContainer: {
    marginTop: 12,
  },
  skeletonTourCard: {
    height: 120,
    marginBottom: 12,
    borderRadius: 8,
  },
  itemSwiper: {
    resizeMode: 'cover',
    borderRadius: 30,
    flex: 1,
  },
  lottieAnimation: {
    height: 100,
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  serchIcon: {
    width: 40,
    height: 40,
  },
  noticeIcon: {
    width: 40,
    height: 40,
  },
  iconContainer: {
    width: 92,
    justifyContent: 'space-between',
  },
  flex_row: {
    flexDirection: 'row',
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 10,
    position: 'static',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 28,
    fontStyle: 'normal',
    color: '#595454',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
