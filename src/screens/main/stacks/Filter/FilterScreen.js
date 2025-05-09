
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    ToastAndroid
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './FilterScreenStyle';
import { useDispatch, useSelector } from 'react-redux';
import { FilterTour } from '../../../../redux/slices/filterTourSlice';

const FilterScreen = ({ props, route, navigation, searchText }) => {
    

    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showRegionPicker, setShowRegionPicker] = useState(false);
    const [showPricePicker, setShowPricePicker] = useState(false);
    const { filterTourData, filterTourStatus } = useSelector((state) => state.reducer.filterTour);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            FilterTour({
                tourName: searchText,
                startDate: startDate,
                destination: selectedRegion,
                minPrice: minPrice,
                maxPrice: maxPrice
            })
        )

    }, [searchText, startDate, selectedRegion, minPrice, maxPrice]);
    const regions = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Quảng Bình', 'Nghệ An'];
    const prices = [
        { '_id': 1, 'name': 'Dưới 1 triệu' },
        { '_id': 2, 'name': 'Từ 1 - 2 triệu' },
        { '_id': 3, 'name': 'Từ 2 - 4 triệu' },
        { '_id': 4, 'name': 'Trên 5 triệu' },
    ];

    const onChangeStartDate = (event, selectedDate) => {
        if (event.type === 'set') {
            setStartDate(selectedDate);
        }
        setShowStartDatePicker(false);
    };


    const renderDropdown = (title, isOpen, onPress) => (
        <TouchableOpacity style={styles.dropdownContainer} onPress={onPress}>
            <Text style={styles.dropdownText}>{title || 'Chọn'}</Text>
            <Image
                source={
                    isOpen
                        ? require('../../../../assets/images/down.png')
                        : require('../../../../assets/images/up.png')
                }
                style={styles.icon}
            />
        </TouchableOpacity>
    );

    const giaTien = (_id) => {
        if (_id == 1) {
            setMaxPrice('1000000')
            console.log(maxPrice);
            console.log(minPrice);


        }
        if (_id == 2) {
            setMaxPrice('2000000')
            setMinPrice('1000000')
        }
        if (_id == 3) {
            setMaxPrice('4000000')
            setMinPrice('2000000')
        }
        if (_id == 4) {
            setMinPrice('4000000')
        }

    }

    const applyFilters = () => {
        navigation.goBack()
    };

    const clearFilters = () => {
        setSelectedRegion('');
        setSelectedPrice('');
        setStartDate(new Date());
        setShowRegionPicker(false);
        setShowPricePicker(false);
        setShowStartDatePicker(false);
        setShowEndDatePicker(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.headerText}>Hủy bỏ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        // logic
                    }}>
                    <Text style={styles.headerTextLoc}>Lọc</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={clearFilters}>
                    <Text style={styles.headerText}>Xóa tất cả</Text>
                </TouchableOpacity>
            </View>

            {renderDropdown(selectedRegion || 'Khu Vực', showRegionPicker, () =>
                setShowRegionPicker(prev => !prev),
            )}
            {showRegionPicker && (
                <FlatList
                    data={regions}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => {
                                setSelectedRegion(item);
                                setShowRegionPicker(false);

                            }}>
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item}
                    style={styles.dropdownList}
                />
            )}

            {renderDropdown(
                `Từ ngày: ${startDate.toLocaleDateString()}`,
                showStartDatePicker,
                () => setShowStartDatePicker(true),
            )}


            {renderDropdown(selectedPrice || 'Mức Giá', showPricePicker, () =>
                setShowPricePicker(prev => !prev),
            )}
            {showPricePicker && (
                <FlatList
                    data={prices}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => {
                                setSelectedPrice(item.name);
                                giaTien(item._id)
                                setShowPricePicker(false);

                            }}>
                            <Text style={styles.optionText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item._id}
                    style={styles.dropdownList}
                />
            )}

            {/* Date Picker cho ngày bắt đầu */}
            {showStartDatePicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onChangeStartDate}
                />
            )}


            <View style={styles.containerbuttonFilter}>
                <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                    <Text style={styles.applyButtonText}>Áp Dụng {filterTourData.data.length} kết quả</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FilterScreen;

