import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icons from '../../../../constants/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { LayDanhSachLichTrinh } from '../../../../redux/slices/getlichtrinh.slice';

const TripDetails = ({ navigation, route }) => {
    const [activeTab, setActiveTab] = useState('Chuyển đi');
    const { Schedules } = useSelector(state => state.reducer.schemal || {});
    const { getLichTrinhData, getLichTrinhStatus, error } = useSelector(state => state.reducer.lichtrinh);
    const startDate = getLichTrinhData?.data?.startDay ? new Date(getLichTrinhData.data.startDay) : null;
    const endDate = getLichTrinhData?.data?.endDay ? new Date(getLichTrinhData.data.endDay) : null;
    // const idlichtrinh = "67495362ea72cd1ced81fef8"

    console.log('================================ startdate',startDate);
    console.log('================================ enddate', endDate);
    

    const userReducer = useSelector(state => state.reducer.auth);
    const user = userReducer.user;
    console.log('user', user);

    const { lichTrinhId } = route.params
    console.log("================ lichTrinhId", lichTrinhId);



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(LayDanhSachLichTrinh(lichTrinhId));
    }, [dispatch, lichTrinhId]);

    if (getLichTrinhData?.data?.locations) {
    } else {
        console.log("k có dữ liệu.");
    }

    const formatDate = (date) => {
        if (!date) return '';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const timeDifference = endDate && startDate ? endDate - startDate : 0;
    const numberOfDays = timeDifference / (1000 * 3600 * 24)

    const lichTrinhha = getLichTrinhData?.data?.locations;

    console.log("getlichTrinh", getLichTrinhData);


    if (Array.isArray(lichTrinhha)) {
        lichTrinhha.forEach((daySchedule, index) => { });
        const ngay = lichTrinhha?.locations;

    } else {
        console.log('lichTrinhha không hợp lệ hoặc không phải là mảng.');
    }

    const avatar = user.user.avatar;
    console.log('avatar', avatar);


    const renderItinerary = () => {
        switch (activeTab) {
            case 'Chuyển đi':
                return (
                    <View>
                        <View style={styles.headerContainer}>
                            <Text style={styles.sectionTitle}>Lịch trình chuyến đi</Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
                            {Array.isArray(lichTrinhha) ? (
                                lichTrinhha.map((daySchedule, index) => {
                                    console.log('daySchedule', daySchedule);
                                    
                                    const firstImage = daySchedule.locations?.[0]?.images?.[0];
                                    console.log('firstImage', firstImage);
                                    return (
                                        <TouchableOpacity
                                            key={daySchedule._id}
                                            onPress={() => {
                                                navigation.navigate('Itinerary', { dayId: daySchedule._id, lichTrinhId: lichTrinhId,daySchedule: daySchedule.day });
                                            }}
                                            style={styles.imageContainer}
                                        >
                                            <Image
                                                source={firstImage ? { uri: firstImage } : Icons.image}
                                                style={styles.image}
                                            />
                                            <Text style={styles.imageDate}>Ngày {daySchedule.day}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            ) : (
                                <Text>Không có lịch trình để hiển thị</Text>
                            )}

                        </ScrollView>
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <ScrollView style={styles.container}>
            {lichTrinhha && (
                <Image
                    source={lichTrinhha[0]?.locations?.[0]?.images?.[0] ? { uri: lichTrinhha[0].locations[0].images[0] } : Icons.image}
                    style={styles.imageBackground}
                />


            )}
            <TouchableOpacity style={styles.buttonback}
                onPress={
                    () => {
                        navigation.goBack();
                    }
                }>
                <Image
                    source={Icons.ic_leftarrow}
                    style={styles.heartIcon}
                />
            </TouchableOpacity>
            {getLichTrinhStatus === "loading" ? (
                // Hiển thị loading khi dữ liệu đang được tải
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007BFF" />
                    <Text>Đang tải dữ liệu...</Text>
                </View>
            ) : (<View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.title}>
                        {numberOfDays > 0 ? `${numberOfDays} ngày` : 'Không có thông tin về số ngày'} đi{' '}
                        {getLichTrinhData?.data?.destination?.name || 'NANA'} đến {getLichTrinhData?.data?.departure || 'Không có thông tin về nơi khởi hành'}
                    </Text>
                    <Text style={styles.date}>{startDate ? formatDate(startDate) : 'ABCXYZ'} - {startDate ? formatDate(endDate) : 'NÂNNA'}</Text>
                    <Text style={styles.creator}>{user?.user?.fullname}</Text>
                </View>
                {renderItinerary()}

                <Text style={styles.sectionTitle}>Bao gồm</Text>
                <Text style={styles.includedText}>Chưa có dịch vụ nào cho chuyến đi của bạn.</Text>
                <Text style={styles.sectionTitle}>Thành viên</Text>
                <View style={styles.memberContainer}>
                    <Image
                        source={{ uri: user?.user?.avatar } || Icons.avatar}
                        style={styles.avatar}
                    />
                    <Text style={styles.memberText}>{user?.user?.fullname ? `${user.user.fullname.substring(0, 5)}...` : "Không có tên"}</Text>
                </View>
            </View>)}
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    heartIcon: {
        width: 32,
        height: 32,
        tintColor: '#fff',
        marginStart: 16,
    },
    cardContainer: {
        padding: 16,
        position: 'absolute',
        top: 100,
    },
    buttonback: {
        position: 'absolute',
        marginTop: 10,

    },
    memberContainer: {
        flexDirection: 'column',
    },
    underline: {
        height: 2,
        backgroundColor: 'blue',
        marginTop: 4,
        width: '100%',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginStart: 20,
    },
    title: {
        fontWeight: '600',
        color: 'black',
        fontSize: 16,
    },
    date: {
        fontSize: 16,
        color: 'gray',
    },
    creator: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tab: {
        padding: 10,
    },
    tabText: {
        fontSize: 16,
        color: 'blue',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        color: 'black',
    },
    includedText: {
        fontSize: 14,
        color: 'gray',
    },
    memberText: {
        fontSize: 14,
        color: 'gray',
    },
    scrollContainer: {
        marginVertical: 8,

    },
    imageContainer: {
        marginRight: 10,
    },
    image: {
        width: 140,
        height: 220,
        borderRadius: 8,
    },
    imageBackground: {
        width: '100%',
        height: 165,
        position: 'relative',
    },
    imageDate: {
        textAlign: 'center',
        marginTop: 4,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    viewAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
    },
    viewAllText: {
        fontSize: 14,
        color: 'blue',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    }
});

export default TripDetails;