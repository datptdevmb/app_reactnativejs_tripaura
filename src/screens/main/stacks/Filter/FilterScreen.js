import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {styles} from './FilterScreenStyle';

const DependentDropdown = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [showPricePicker, setShowPricePicker] = useState(false);

  const regions = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Quảng Bình', 'Nghệ An'];
  const prices = [
    'Dưới 500 ngàn',
    'Từ 1 - 2 triệu',
    'Từ 2 - 4 triệu',
    'Trên 5 triệu',
  ];

  const onChangeStartDate = (event, selectedDate) => {
    if (event.type === 'set') {
      setStartDate(selectedDate);
    }
    setShowStartDatePicker(false);
  };

  const onChangeEndDate = (event, selectedDate) => {
    if (event.type === 'set') {
      setEndDate(selectedDate);
    }
    setShowEndDatePicker(false);
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

  const applyFilters = () => {
    console.log('Áp dụng với:', {
      selectedRegion,
      selectedPrice,
      startDate,
      endDate,
    });
  };

  const clearFilters = () => {
    setSelectedRegion('');
    setSelectedPrice('');
    setStartDate(new Date());
    setEndDate(new Date());
    setShowRegionPicker(false);
    setShowPricePicker(false);
    setShowStartDatePicker(false);
    setShowEndDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={clearFilters}>
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
          renderItem={({item}) => (
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

      {renderDropdown(
        `Đến ngày: ${endDate.toLocaleDateString()}`,
        showEndDatePicker,
        () => setShowEndDatePicker(true),
      )}

      {renderDropdown(selectedPrice || 'Mức Giá', showPricePicker, () =>
        setShowPricePicker(prev => !prev),
      )}
      {showPricePicker && (
        <FlatList
          data={prices}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setSelectedPrice(item);
                setShowPricePicker(false);
              }}>
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
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

      {/* Date Picker cho ngày kết thúc */}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={onChangeEndDate}
        />
      )}

      <View style={styles.containerbuttonFilter}>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Áp Dụng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DependentDropdown;
