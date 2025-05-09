import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './SreachScreenStyle';
import { useDispatch, useSelector } from 'react-redux';
import { SearchTour } from '../../../../redux/slices/searchTourSlice';
import CustomListView from '../../../../components/common/listViews/CustomListView';
import Icons from '../../../../constants/Icons';
import { FilterTour } from '../../../../redux/slices/filterTourSlice';
import Headercomponet from '../../../../components/common/header/Headercomponet';
import FilterScreen from '../../stacks/Filter/FilterScreen';
import ModalFilter from '../../../../components/common/modals/ModalFilter';
import Button from '../../../../components/common/button/Button';
import DateTimePicker from '@react-native-community/datetimepicker';


const SearchScreen = (props) => {
  const { navigation } = props
  const [searchText, setSearchText] = useState('');
  const [isShowModal, setisShowModal] = useState(false);
  const dispatch = useDispatch();
  const { filterTourData, filterTourStatus } = useSelector((state) => state.reducer.filterTour);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [showPricePicker, setShowPricePicker] = useState(false);

  const onPressAply = () => {
    dispatch(
      FilterTour({
        tourName: searchText,
        startDate: startDate,
        destination: selectedRegion,
        minPrice: minPrice,
        maxPrice: maxPrice
      })
    )
    setisShowModal(false)
  }
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

  const clearFilters = () => {
    setSelectedRegion('');
    setSelectedPrice('');
    setStartDate(new Date());
    setShowRegionPicker(false);
    setShowPricePicker(false);
    setShowStartDatePicker(false);
    setShowEndDatePicker(false);
  };


  const onChangeTextSearch = (text) => {
    setSearchText(text)
  }

  const handleClearText = () => {
    setSearchText('');
  };
  const onPressItem = (_id) => {
    navigation.navigate('Detail', { _id })
  }
  //
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
    console.log("====== fiter", filterTourData.data);
  }, [searchText]);

  const renderItemSearch = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => onPressItem(item._id)}>
        {item.images != undefined && <Image source={{ uri: item.images.linkImage[0] }} style={styles.itemImage} />}

        <Text style={styles.itemName} numberOfLines={2}>{item.tourName}</Text>
        <View style={styles.address}>
          <Image source={Icons.ic_address} />
          <Text style={styles.itemDay} numberOfLines={1}>{item.locations.destination}</Text>
        </View>
        <Text style={styles.itemPrice}>Từ: {formatCurrencyVND(item.details.priceAdult)}</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>

        <TextInput
          style={styles.inputSreach}
          placeholder="Tìm kiếm..."
          value={searchText}
          onChangeText={(text) => onChangeTextSearch(text)}
          clearButtonMode="always"
        />
        {searchText.length > 0 && <TouchableOpacity onPress={handleClearText}>
          <Image
            source={require('../../../../assets/images/close.png')}
            style={styles.image_clear}
          />
        </TouchableOpacity>}

        <TouchableOpacity onPress={() => setisShowModal(true)}>
          <Image
            source={require('../../../../assets/images/Filter.png')}
            style={styles.image_filter}
          />
        </TouchableOpacity>
      </View>

      <View>
        {filterTourData.data &&
          <Text style={styles.tile}>{filterTourData.data.length || 'Không tìm thấy'} kết quả</Text>}
        {
          filterTourStatus === 'loading' ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007BFF" />
              <Text>Đang tải dữ liệu...</Text>
            </View>
          ) : (<ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 20 }}>
              {filterTourData.code === 200 ?
                <FlatList
                  data={filterTourData.data}
                  renderItem={renderItemSearch}
                  keyExtractor={item => item._id}
                  scrollEnabled={false}
                />
                : <View style={styles.noDataContainer}>
                  <Image
                    style={{ width: 200, height: 160 }}
                    source={require('../../../../assets/images/Ve.png')} />
                  <Text>Không tìm thấy tour phù hợp</Text>
                  <View style={{ marginTop: 60 }}></View>
                  {/* <Button label='Xem tất cả'
                    style={{ width: 160, height: 40 }}></Button> */}
                </View>
              }
            </View>
            <View style={{ marginTop: 220 }}></View>
          </ScrollView>)}
      </View>

      <Modal
        transparent={true}
        visible={isShowModal}
        animationType="fade"
        onRequestClose={() => setisShowModal(false)}
      >
        <View style={{ justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1 }}>

          <View style={{
            height: 600,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}>
            <View>
              <Headercomponet
                leftIcon={require('../../../../assets/images/close.png')}
                title={"Chọn ảnh"}
                onPressLeftIcon={() => { setisShowModal(false) }}></Headercomponet>
              <View style={{ height: 1, backgroundColor: 'black' }}></View>
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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { clearFilters() }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline', color: 'black' }}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton} onPress={onPressAply}>
                  <Text style={styles.applyButtonText}>Áp Dụng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </Modal>
      <View style={{ height: 60 }} />

    </View>
  );
};

const formatCurrencyVND = amount => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default SearchScreen;
