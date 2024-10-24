import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './SreachScreenStyle';
import {useNavigation} from '@react-navigation/native';

// Dữ liệu mẫu
const DATA = [
  {
    id: '1',
    image: require('../../../../assets/images/image.png'), // Đường dẫn tới hình ảnh sản phẩm
    name: 'Tour khám phá Đà Nẵng',
    price: '1.200.000 VND',
    day: 'Ngày 5/1/2024',
  },
  {
    id: '2',
    image: require('../../../../assets/images/image.png'), // Đường dẫn tới hình ảnh sản phẩm
    name: 'Khám phá Phú Quốc',
    price: '2.500.000 VND',
    day: 'Ngày 10/1/2024',
  },
  {
    id: '3',
    image: require('../../../../assets/images/image.png'), // Đường dẫn tới hình ảnh sản phẩm
    name: 'Chuyến đi đến Nha Trang',
    price: '1.800.000 VND',
    day: 'Ngày 15/1/2024',
  },
  {
    id: '4',
    image: require('../../../../assets/images/image.png'), // Đường dẫn tới hình ảnh sản phẩm
    name: 'Tour tham quan miền Tây',
    price: '900.000 VND',
    day: 'Ngày 20/1/2024',
  },
  // Thêm nhiều sản phẩm hơn nếu cần
];

const SearchScreen = ({navigation}) => {
 

  const [searchText, setSearchText] = useState('');

  const handleClearText = () => {
    setSearchText(''); // Xóa nội dung trong ô tìm kiếm
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <Text style={styles.itemDay}>{item.day}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <Image
          source={require('../../../../assets/images/back.png')}
          style={styles.image_back}
        />
        <TextInput
          style={styles.inputSreach}
          placeholder="Tìm kiếm..."
          value={searchText}
          onChangeText={setSearchText}
          clearButtonMode="always" // Chỉ hoạt động trên iOS
        />
        <TouchableOpacity onPress={handleClearText}>
          <Image
            source={require('../../../../assets/images/close.png')}
            style={styles.image_clear}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Image
            source={require('../../../../assets/images/Filter.png')}
            style={styles.image_filter}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.textSreach}>
        Vui lòng tìm kiếm địa điểm yêu thích của bạn
      </Text>
      <Text style={styles.tile}>Có thể bạn cũng thích</Text>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2} // Thiết lập số cột
        columnWrapperStyle={styles.row} // Thêm style cho hàng
      />
    </View>
  );
};

export default SearchScreen;
