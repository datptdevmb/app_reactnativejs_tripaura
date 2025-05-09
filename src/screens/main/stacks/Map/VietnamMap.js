import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import RegionCheckbox from './../../../../components/common/checkbox/RegionCheckbox';
import { mapdata, getColor } from '../../../../constants/data';
import Header from '../../../../components/common/header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingsByUserId } from '../../../../redux/slices/booking.slice';

const VietnamMap = ({ navigation }) => {  // Thêm navigation vào props
    const dispatch = useDispatch();
    const [selectedRegions, setSelectedRegions] = useState({});
    const [showCheckbox, setShowCheckbox] = useState(false);
    const { bookings } = useSelector((state) => state.reducer.booking);
    console.log('Bookings......', bookings);

    const userId = "671f7cfecc67a0a901ce3d95";

    useEffect(() => {
        if (userId) {
            dispatch(fetchBookingsByUserId(userId));
        }
    }, [dispatch, userId]);

    // Tải vùng đã chọn từ AsyncStorage
    const loadSelectedRegions = async () => {
        try {
            const storedRegions = await AsyncStorage.getItem('selectedRegions');
            if (storedRegions) {
                setSelectedRegions(JSON.parse(storedRegions));
            }
        } catch (error) {
            console.error("Error loading selected regions:", error);
        }
    };

    useEffect(() => {
        loadSelectedRegions();
    }, []);

    // Lọc những booking đã hết hạn
    const expiredBookings = bookings.filter((booking) =>
        new Date(booking.detailInfo.endDay) < new Date()
    );

    // Lưu trạng thái vùng đã chọn vào AsyncStorage
    const saveSelectedRegions = async (regions) => {
        try {
            await AsyncStorage.setItem('selectedRegions', JSON.stringify(regions));
        } catch (error) {
            console.error("Error saving selected regions:", error);
        }
    };

    // Chuyển đổi trạng thái vùng khi người dùng chọn hoặc bỏ chọn
    const toggleRegion = (id) => {
        const updatedRegions = {
            ...selectedRegions,
            [id]: !selectedRegions[id],
        };
        setSelectedRegions(updatedRegions);
        saveSelectedRegions(updatedRegions);
    };

    const handleUpdate = () => {
        console.log(selectedRegions);
    };

    return (
        <View style={styles.container}>
            <Header 
                title={"Địa điểm đã đi"} 
                onBackPress={() => navigation.goBack()} 
            />
            <View style={{ marginTop: 30 }} />

            <Svg height="500" width="300">
                {mapdata.map((region) => (
                    <Path
                        key={region.id}
                        d={region.path}
                        fill={selectedRegions[region.id] ? getColor(region.id) : '#BBBBBB'}
                    />
                ))}
            </Svg>

            {showCheckbox && (
                <ScrollView 
                    style={styles.checkboxContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.checkboxRow}>
                        {mapdata.map((region) => (
                            <View key={region.id} style={styles.checkboxItem}>
                                <RegionCheckbox
                                    region={region}
                                    isSelected={selectedRegions[region.id]}
                                    toggleRegion={toggleRegion}
                                />
                            </View>
                        ))}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Cập nhật</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => setShowCheckbox(false)}
                        >
                            <Text style={styles.buttonText}>Đóng cài đặt</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => setShowCheckbox(!showCheckbox)}
                >
                    <Text style={styles.buttonText}>
                        {showCheckbox ? 'Đóng cài đặt' : 'Mở cài đặt'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginTop: 10,
    },
    checkboxContainer: {
        position: 'absolute',
        height: '100%',
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        zIndex: 1,
        paddingVertical: 0,
    },
    checkboxRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    checkboxItem: {
        width: '48%',
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default VietnamMap;
