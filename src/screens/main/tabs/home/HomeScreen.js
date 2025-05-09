import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
    View,
    ScrollView,
    RefreshControl,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    TextInput,
} from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../../../../constants/colors';
import Swiper from 'react-native-swiper';
import TourCard from '../../../../components/common/card/CardTour';
import TourCardVetical from '../../../../components/common/card/TourCardVetical';
import { tours, categorys, data } from '../../../../constants/data';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../../../redux/slices/category.slice';
import {
    clearTourData,
    fetchPopularTour,
    fetchTours,
} from '../../../../redux/slices/tour.slice';
import HeaderHome from '../../../../components/common/header/HeaderHome';
import TourCardList from './TourCartList';
import CategoryList from './CategoryList';
import Slider from './Slider';
import PopularToursList from './PopularToursList';
import { useHomeData } from '../../../../hooks/useHomeData';
import FastImage from 'react-native-fast-image';
import GlowingText from './GowingText';
import SearchView from './SearchView';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { fetchImages } from '../../../../redux/slices/image.slice';
import { checkLoginStatus } from '../../../../redux/slices/auth.slice';
import IcLocate from '../../../../assets/icons/Ic_locate';
import { useFocusEffect } from '@react-navigation/native';


function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    

    const { categories, tours, loading, popularTours, images, isLoading } = useHomeData();
    const flatListRef = useRef(null);

    const [refreshing, setRefreshing] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);


    function handleCatePress(item, index) {
        if (selectedIndex !== index) {
            setSelectedIndex(index);
        }
        scrollToTop()
        dispatch(fetchTours(item._id));
    }

    function handleClickItem(_id) {
        navigation.navigate('Detail', { _id });

    }

    function handlerClickSlider() {
        navigation.navigate('Voucher');
    }
    const renderItem = useCallback(({ item, index }) => {
        console.log(item)
        // if (index == 0) {
        //     return (
        //         <TouchableOpacity
        //             onPress={handlerClickSlider}
        //             style={styles.slider}>
        //             <Slider images={images} />
        //         </TouchableOpacity>

        //     )
        // }

        return (

            <TouchableOpacity onPress={() => handleClickItem(item._id)} style={styles.View}>
                <FastImage
                    style={{ width: '95%', height: '60%', borderRadius: 10 }}
                    source={{ uri: item?.image[0] }} />
                <Text
                    numberOfLines={2}
                    style={styles.textName}>{item.tourName}</Text>
                <View style={{ marginTop: 10, width: '100%', flexDirection: 'row' }}>
                    <View style={{ marginStart: 8, marginEnd: 8 }}>
                        <IcLocate />
                    </View>
                    <Text
                        lineBreakMode='clip'
                        numberOfLines={1}>{item?.destination}</Text>
                </View>
            </TouchableOpacity>
        );
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await Promise.all([
                dispatch(fetchImages()),
                dispatch(fetchCategory()),
                dispatch(fetchTours('67049d4526be2256863506cc')),
                dispatch(fetchPopularTour()),
                dispatch(checkLoginStatus()),
            ]);
        } catch (err) {
            console.error('Error refreshing data:', err);
        } finally {
            setRefreshing(false);
        }
    }, [dispatch]);
    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    useFocusEffect(
        useCallback(() => {
            dispatch(clearTourData());
        }, [dispatch])
    );
    

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <HeaderHome />
                <SearchView />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                ref={flatListRef}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListHeaderComponent={
                    <View>
                        <View style={{ marginTop: 12 }}>
                            <CategoryList
                                selectedIndex={selectedIndex}
                                onCatePress={handleCatePress}
                                isLoading={isLoading}
                                categories={categories} />
                        </View>
                        <TourCardList
                            onClick={handleClickItem}
                            isLoading={loading}
                            horizontal={true}
                            tours={tours} />
                        <Text style={styles.texth}>Tour được săn đón</Text>
                    </View>
                }
                data={popularTours}
                numColumns={2}
                renderItem={isLoading ?
                    ({ item }) => (
                        <View style={styles.View}>
                            <SkeletonPlaceholder>
                                <Image style={{ marginTop: 10, borderRadius: 8, marginStart: 10, marginEnd: 14, width: '90%', height: 150 }} />
                                <Text style={{ marginTop: 10, marginStart: 10, marginEnd: 14, width: '100%', height: 14 }}></Text>
                                <Text style={{ marginTop: 10, marginStart: 10, marginEnd: 14, width: '90%', height: 14 }}></Text>
                            </SkeletonPlaceholder>
                        </View>
                    )
                    : renderItem // Nếu không loading, sử dụng renderItem bình thường
                }
                style={styles.flatL}
            >

            </FlatList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 16,
        fontStyle: 'normal',
        color: '#4D4C4C',
        fontWeight: '600',
        marginTop: 20,
    },
    flatL: {
        // backgroundColor: 'green'
    },
    textName: {
        fontSize: 14,
        color: colors.Grey_500,
        fontStyle: 'normal',
        fontWeight: '500'
    },
    searchRow: {
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputSreach: {
        width: 280,
        height: 44,
        backgroundColor: '#F8F9FE',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000',
        marginTop: 10,
        marginLeft: 10,
    },
    texth: {
        marginTop: 2,
        marginBottom: 16,
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        // color: 'black'
    },
    texth1: {
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: 'black'
    },
    image_clear: {
        width: 10,
        height: 10,
        color: 'black',
        marginLeft: -44,
        marginTop: 10,
    },
    image_filter: {
        width: 30,
        height: 30,
        marginTop: 10,
    },
    hd: {
        width: "100%",
        height: 200,
        backgroundColor: 'blue'
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
    slider: {
        width: 180,
        height: 240,
        marginBottom: 24,
        marginEnd: 14
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
        paddingTop: StatusBar.currentHeight || 0,
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
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        // margin: 16, // Tạo khoảng cách xung quanh
        backgroundColor: '#fff', // Màu nền giúp tách khỏi nền chính
        borderRadius: 10, // Bo góc

    },
    swiper: {

        marginTop: 28,
        width: '98%',
        height: 192,
        overflow: 'hidden', // Đảm bảo phần tử con không tràn ra ngoài bo góc
        borderRadius: 10, // Đảm bảo border-radius áp dụng cho nội dung bên trong
        shadowColor: '#000', // Màu bóng
        shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
        shadowOpacity: 0.05, // Độ mờ của bóng
        shadowRadius: 1, // Bán kính bóng
        elevation: 2, // Đổ bóng trên Android
        backgroundColor: '#EDEDED',
    },
    imageUser: {
        borderRadius: 12,
        width: 40,
        height: 40
    },
    View: {
        height: 200,
        alignItems: 'center',
        width: '48%',
        marginEnd: 16,
        marginBottom: 16,
        paddingHorizontal: 2,
        overflow: 'hidden', // Đảm bảo phần tử con không tràn ra ngoài bo góc
        borderRadius: 10, // Đảm bảo border-radius áp dụng cho nội dung bên trong
        shadowColor: '#000', // Màu bóng
        shadowOffset: { width: 0, height: 4 }, // Độ lệch bóng
        shadowOpacity: 0.1, // Độ mờ của bóng
        shadowRadius: 3, // Bán kính bóng
        elevation: 4, // Đổ bóng trên Android
        backgroundColor: 'white',
    },
    slide: {
        marginTop: 24,
        width: '98%',
        height: 170,
        borderRadius: 18
    }
});

export default HomeScreen;
