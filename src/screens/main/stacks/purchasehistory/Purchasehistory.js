import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../../components/common/header/Header';
import Icons from '../../../../constants/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingsByUserId } from '../../../../redux/slices/booking.slice';
import colors from '../../../../constants/colors';
import Toast from 'react-native-toast-message';
import { getreviewbytouridandbyuserid } from '../../../../redux/slices/reviewTourducers';

const Purchasehistory = ({ navigation }) => {
    const dispatch = useDispatch();
    const { bookings } = useSelector((state) => state.reducer.booking);
    console.log('bookings', bookings);
    
    const userReducer = useSelector(state => state.reducer.auth);
    const user = userReducer.user;
    const userId = user.user._id;
    const [reviews, setReviews] = useState({});

    console.log('reviedddddđw', reviews);

    const [selectedStatus, setSelectedStatus] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userId) {
            setLoading(true);
            dispatch(fetchBookingsByUserId(userId))
                .finally(() => setLoading(false));
        }
    }, [dispatch, userId]);


    useEffect(() => {
        if (Array.isArray(bookings)) {
            const currentTime = new Date().getTime();
            bookings.forEach(bookings => {
                const createdAt = new Date(bookings.createAt).getTime();
                const timePassed = currentTime - createdAt;
                if (bookings.status === 1 && timePassed >= 300000) {
                    updateBookingStatus(bookings._id, 2);
                }
            });
        }
    }, [bookings]);

    const updateBookingStatus = async (bookingId, status) => {
        console.log('Updating booking status with:', status);
        try {
            const response = await fetch(`https://trip-aura-server.vercel.app/booking/api/update/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            const data = await response.json();

            if (data.code === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật booking thành công',
                });
                dispatch(fetchBookingsByUserId(userId));
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Cập nhật thất bại',
                });
            }
        } catch (error) {
            console.error('Error updating booking status:', error);
            Toast.show({
                type: 'error',
                text1: 'Có lỗi xảy ra khi cập nhật',
            });
        }
    };

    const onBackPress = () => {
        navigation.goBack();
    };

    useEffect(() => {
        bookings.forEach(booking => {
            const tourId = booking.detailInfo?.tourId;
            if (tourId && !reviews[tourId]) {
                dispatch(getreviewbytouridandbyuserid({ userId, tourId }))
                    .then(response => {
                        if (response.payload.success) {
                            setReviews(prevReviews => ({
                                ...prevReviews,
                                [tourId]: response.payload.data
                            }));
                        } else {
                            console.log('Không có đánh giá cho tour này');
                            setReviews(prevReviews => ({
                                ...prevReviews,
                                [tourId]: []
                            }));
                        }
                    })
                    .catch(error => {
                        console.error('Lỗi khi tải đánh giá:', error);
                    });
            }
        });
    }, [bookings, userId, reviews, dispatch]);



    const renderItem = ({ item }) => {

        const image = item.tourImages && item.tourImages.length > 0 && item.tourImages[0].linkImage && item.tourImages[0].linkImage.length > 0
            ? item.tourImages[0].linkImage[0]
            : null;
        const tourId = item.detailInfo?.tourId;
        const review = reviews[tourId];

        if (review?.length === 0) {
            console.log("Không có đánh giá cho tour này");
        } else if (review?.length > 0) {
            console.log("Danh sách đánh giá:", review);
        } else {
            console.log("Dữ liệu đánh giá chưa được tải hoặc lỗi khác xảy ra.");
        }


        const {
            numAdult,
            numChildren,
            priceAdult,
            priceChildren,
            status,
            createAt,
            _id: bookingId,
            userInfo: { fullname, phone, email },
            tourInfo,
            totalPrice,
        } = item;

        const tourName = tourInfo ? tourInfo.tourName : 'Không có tên tour';

        const currentTime = new Date().getTime();
        const bookingTime = new Date(item.detailInfo.endDay).getTime();
        const isPast = bookingTime < currentTime;

        const handlePress = () => {
            if (selectedStatus === 3) {
                return;
            }
            navigation.navigate('OrderInformation', { bookingId: item._id });
        };

        const handlePaymentPress = () => {
            console.log('tourname', tourName);
            navigation.navigate('Order', {
                bookingId: item._id
            });
        };


        const handleNavigateToRate = () => {
            navigation.navigate('Rate', { tourId: tourId });
        };


        const handleEvaluatePress = () => {
            navigation.navigate('Evaluate', { bookingId: item._id });
        };

        if (selectedStatus === 3) {
            if (item.status !== 0 || !isPast) {
                return null;
            }
        } else if (item.status !== selectedStatus) {
            return null;
        }

        let statusText = '';
        if (selectedStatus === 3) {
            statusText = isPast ? 'Đã đi' : 'Chưa đi';
        } else if (item.status === 0) {
            statusText = 'Đã thanh toán';
        } else if (item.status === 1) {
            statusText = 'Chưa thanh toán';
        } else if (item.status === 2) {
            statusText = 'Đã hủy';
        }


        const words = tourName.split(' ');
        const firstFourWords = words.slice(0, 4).join(' ');
        const remainingWords = words.length > 4 ? '...' : '';

        return (
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.card}>
                    <Image style={styles.image} source={{ uri: image || Icons.image }} />
                    <View style={styles.containeritem}>
                        <Text style={styles.dateText}>Ngày: {item.detailInfo.endDay ? new Date(item.detailInfo.endDay).toLocaleDateString() : 'N/A'}</Text>
                        <Text style={styles.tourText} numberOfLines={1}>Tour: {firstFourWords} {remainingWords}</Text>
                        <Text style={styles.priceText}>Tổng giá: {item.totalPrice ? item.totalPrice.toLocaleString() : 'N/A'} VNĐ</Text>

                        <View style={styles.statusTextContainer}>
                            <Text style={styles.statusLabel}>Trạng thái: </Text>
                            <Text
                                style={[
                                    styles.statusText,
                                    { color: item.status === 0 ? '#2980B9' : item.status === 2 && isPast ? 'red' : 'red' }
                                ]}
                            >
                                {statusText}
                            </Text>
                        </View>
                        {item.status === 1 && (
                            <TouchableOpacity onPress={handlePaymentPress} style={styles.paymentButton}>
                                <Text style={styles.paymentButtonText}>Thanh toán</Text>
                            </TouchableOpacity>
                        )}
                        {selectedStatus === 3 && (
                            <>
                                {review?.length > 0 ? (
                                    <TouchableOpacity onPress={handleNavigateToRate} style={styles.paymentButton}>
                                        <Text style={styles.paymentButtonText}>Xem bình luận</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={handleEvaluatePress} style={styles.paymentButton}>
                                        <Text style={styles.paymentButtonText}>Bình luận</Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        )}


                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Header onBackPress={onBackPress} title={"Lịch sử mua hàng"} />
            <View style={styles.statusContainer}>
                <TouchableOpacity onPress={() => setSelectedStatus(0)}>
                    <Text style={[styles.statusButton, selectedStatus === 0 && styles.activeStatus]}>
                        Đã thanh toán
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedStatus(1)}>
                    <Text style={[styles.statusButton, selectedStatus === 1 && styles.activeStatus]}>
                        Chưa thanh toán
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedStatus(2)}>
                    <Text style={[styles.statusButton, selectedStatus === 2 && styles.activeStatus]}>
                        Đã hủy
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedStatus(3)}>
                    <Text style={[styles.statusButton, selectedStatus === 3 && styles.activeStatus]}>
                        Đã đi
                    </Text>
                </TouchableOpacity>
            </View>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <View style={{ padding: 16 }}>
                    <FlatList
                        data={bookings}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={styles.container}
                        scrollEnabled={false}
                    />
                </View>
            )}
        </ScrollView>
    );
};

export default Purchasehistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    statusButton: {
        fontSize: 15,
        color: '#000',
    },
    activeStatus: {
        color: '#2196F3',
        fontWeight: 'bold',
    },
    containeritem: {
        width: '90%',
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        paddingVertical: 1,
    },
    tourText: {
        fontSize: 16,
        color: '#333',
        paddingVertical: 1,
    },
    priceText: {
        fontSize: 16,
        color: '#27AE60',
        paddingVertical: 1,
    },
    statusTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 1,
    },
    statusLabel: {
        fontSize: 16,
        color: '#333',
        paddingVertical: 1,
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2980B9',
        paddingVertical: 1,
    },
    image: {
        width: 100,
        height: 110,
        borderRadius: 8,
        marginEnd: 10,
        resizeMode: 'cover',
        marginStart: 10,
        marginVertical: 10,
    },
    paymentButton: {
        backgroundColor: '#0033FF',
        paddingVertical: 6,
        borderBottomRightRadius: 8,
        justifyContent: 'center',
        width: '70%',
    },
    paymentButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
