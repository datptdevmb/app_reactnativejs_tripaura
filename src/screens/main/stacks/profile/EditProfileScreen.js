import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ToastAndroid, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../../../components/common/header/Headercomponet';
import InputComponent from '../../../../components/common/input/InputCompoment';
import DropdownComponent from '../../../../components/common/dropdown/DropdownComponent';
import Button from '../../../../components/common/button/Button';
import stylesGlobal from '../../../../constants/global';
import { ThayDoiThongTin } from '../../../../redux/slices/ChangeUserSlice';
import { AppContext } from '../../../AppContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import fontsize from '../../../../constants/fontsize';
import colors from '../../../../constants/colors';
import Icons from '../../../../constants/Icons';
import CheckBox from '@react-native-community/checkbox';

const EditProfileScreen = ({ navigation }) => {
  const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const { user, setUser } = useContext(AppContext);
  const { changeUserData, changeUserStatus } = useSelector((state) => state.changeUser);
  const dispatch = useDispatch();
  const { provinces } = useSelector((state) => state.provinces);
  const { districts } = useSelector((state) => state.district);

  const [email, setEmail] = useState(user?.email || "");
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address?.split(', ')[0] || "");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [date, setDate] = useState(user?.dateofbirth ? parseDateString(user.dateofbirth) : new Date());
  const [isMaleSelected, setIsMaleSelected] = useState(false);
  const [isFemaleSelected, setIsFemaleSelected] = useState(false);
  const [gender, setGender] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  const chonnam = () => {
    setIsMaleSelected(!isMaleSelected);
    if (isFemaleSelected) setIsFemaleSelected(false);
    setGender("Nam");
  };
  const chonnu = () => {
    setIsFemaleSelected(!isFemaleSelected);
    if (isMaleSelected) setIsMaleSelected(false);
    setGender("Nữ");
  };

  console.log('user', date)
  const filteredDistricts = selectedProvince
    ? districts.filter(district => district.province_code === selectedProvince.code)
    : [];

  const handleProvinceSelect = (provinceCode) => {
    const province = provinces.find(p => p.code === provinceCode);
    if (province) {
      setSelectedProvince(province);
      setSelectedDistrict(null);
      setAddress("");
    }
  };

  const handleDistrictSelect = (districtCode) => {
    const district = filteredDistricts.find(d => d.code === districtCode);
    setSelectedDistrict(district);
    if (district) {
      setAddress(prev => `${prev}, ${district.name}, ${selectedProvince?.name || "Chưa chọn tỉnh thành"}`);
    }
  };

  useEffect(() => {
    if (changeUserStatus === 'successed') {
      const { status, message, data } = changeUserData;
      if (status) {
        setUser(data);
      } else {
        ToastAndroid.show(message || "Cập nhật không thành công", ToastAndroid.SHORT);
      }
    }
  }, [changeUserData, changeUserStatus, setUser]);

  useEffect(() => {
    if (user.address) {
      const addressParts = user.address.split(', ');
      const street = addressParts[0];
      const districtName = addressParts[1];
      const provinceName = addressParts[2];

      const province = provinces.find(p => p.name === provinceName);
      const district = districts.find(d => d.name === districtName);

      setAddress(street);
      setSelectedProvince(province || null);
      setSelectedDistrict(district || null);
    }
  }, [user, provinces, districts]);
  useEffect(() => {
    if (user.gender === "Nam") {
      setIsMaleSelected(true);
      setIsFemaleSelected(false);
    } else if (user.gender === "Nữ") {
      setIsMaleSelected(false);
      setIsFemaleSelected(true);
    }
  }, [user.gender]);

  useEffect(() => {
    if (user.dateofbirth) {
      const dateObject = parseDateString(user.dateofbirth);
      setDate(dateObject);
      setFormattedDate(dateObject.toLocaleDateString('en-GB'));
    }
  }, [user]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    setFormattedDate(currentDate.toLocaleDateString('en-GB'));
  };

  const thayDoi = () => {
    const districtName = selectedDistrict?.name || "Chưa chọn quận huyện";
    const provinceName = selectedProvince?.name || "Chưa chọn tỉnh thành";
    const addressWithDetails = `${address}, ${districtName}, ${provinceName}`;

    dispatch(ThayDoiThongTin({
      userId: user._id,
      fullname,
      email,
      phone,
      gender,
      dateofbirth: formattedDate,
      address: addressWithDetails,
    }));
  };

  return (
    <ScrollView style={[stylesGlobal.container, { paddingBottom: 50 }]}>
      <HeaderComponent
        leftIcon={Icons.ic_leftarrow}
        title={"Cập nhật thông tin cá nhân"}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <View style={styles.inputContainer}>
        <Text>Họ và tên</Text>
        <InputComponent
          keyboardType={"default"}
          value={fullname}
          onTextChange={setFullname}
          placeholder={'Nhập họ và tên của bạn'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <InputComponent
          keyboardType={"email-address"}
          value={email}
          onTextChange={setEmail}
          placeholder={'Nhập email của bạn'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Số điện thoại</Text>
        <InputComponent
          keyboardType={"phone-pad"}
          value={phone}
          onTextChange={setPhone}
          placeholder={'Nhập số điện thoại của bạn'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Ngày sinh</Text>
        <TextInput
          placeholder="Ngày sinh"
          style={styles.inputBirthday}
          value={formattedDate}
          onChangeText={setDate}
          onFocus={() => setShowPicker(true)}
        />
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.checkboxlabelcontainer}>
        <Text style={styles.label}>Giới tính:</Text>
        <View style={styles.containercheckbox}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isMaleSelected}
              onValueChange={chonnam}
              tintColors={{ true: '#007AFF', false: '#000' }}
            />
            <Text style={styles.label}>Nam</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isFemaleSelected}
              onValueChange={chonnu}
              tintColors={{ true: '#FF4081', false: '#000' }}
            />
            <Text style={styles.label}>Nữ</Text>
          </View>
        </View>
      </View>
      <DropdownComponent
        onProvinceSelect={handleProvinceSelect}
        onDistrictSelect={handleDistrictSelect}
        selectedProvince={selectedProvince?.code || null}
        selectedDistrict={selectedDistrict?.code || null}
      />
      <View style={styles.inputContainer}>
        <Text>Chi tiết</Text>
        <InputComponent
          value={address}
          onTextChange={setAddress}
          placeholder={`Số nhà, tên đường`}
        />
      </View>
      <View style={styles.btnCapNhat}>
        <Button label='Cập nhật' onPressed={thayDoi} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
  },
  btnCapNhat: {
    marginTop: 40,
  },
  inputBirthday: {
    height: 56,
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 10,
    color: 'rgba(128, 128, 128, 0.90)',
    fontFamily: 'Lato',
    fontSize: fontsize.sm,
    fontWeight: '700',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(5, 114, 231, 0.05)',
    backgroundColor: colors.Grey_0,
  },
  checkboxlabelcontainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  containercheckbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  }
});

export default EditProfileScreen;
