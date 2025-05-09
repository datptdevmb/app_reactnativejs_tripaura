import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ToastAndroid, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../../../components/common/header/Headercomponet';
import InputComponent from '../../../../components/common/input/InputCompoment';
import DropdownComponent from '../../../../components/common/dropdown/DropdownComponent';
import Button from '../../../../components/common/button/Button';
import stylesGlobal from '../../../../constants/global';
import { ThayDoiThongTin } from '../../../../redux/slices/ChangeUserSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import fontsize from '../../../../constants/fontsize';
import colors from '../../../../constants/colors';
import Icons from '../../../../constants/Icons';
import CheckBox from '@react-native-community/checkbox';
import { fetchUserInfo } from '../../../../redux/slices/getUserbyID';
import stylesinput from '../../../../components/common/input/inputstyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = ({ navigation }) => {
  const reduxUser = useSelector((state) => state.reducer.auth.user);
  const changeUserData = useSelector((state) => state.reducer.changeUser);
  const changeUserStatus = useSelector((state) => state.reducer.changeUser.status);
  const provinces = useSelector((state) => state.reducer.provinces.provinces);
  const districts = useSelector((state) => state.reducer.district.districts);
  const dispatch = useDispatch();
  const userId = reduxUser.user?._id;
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [isMaleSelected, setIsMaleSelected] = useState(false);
  const [isFemaleSelected, setIsFemaleSelected] = useState(false);
  const [gender, setGender] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const [user, setUser] = useState(null);
  console.log('userrccccccccccccccccccccccccc', user);


  const parseDateString = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userId');
        if (userData) {
          const parsedData = JSON.parse(userData);
          if (parsedData && parsedData.user) {
            setUser(parsedData);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Lỗi khi đọc dữ liệu từ AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      const data = user.user
      console.log('data', data);
      setEmail(data.email || '');
      setFullname(data.fullname || '');
      setPhone(data.phone || '');
      setAddress(data.address?.split(',')[0] || '');
      setGender(data.gender);
      if (data.gender === "Nam") setIsMaleSelected(true);
      else if (data.gender === "Nữ") setIsFemaleSelected(true);
      const dateOfBirth = parseDateString(data.dateofbirth);
      if (dateOfBirth) {
        setDate(dateOfBirth);
        setFormattedDate(dateOfBirth.toLocaleDateString('en-GB'));
      }
    }
  }, [user]);

  const handleGenderSelection = (selectedGender) => {
    setIsMaleSelected(selectedGender === "Nam");
    setIsFemaleSelected(selectedGender === "Nữ");
    setGender(selectedGender);
  };

  const handleProvinceSelect = useCallback((provinceCode) => {
    const province = provinces.find(p => p.code === provinceCode);
    if (province) {
      setSelectedProvince(province);
      setSelectedDistrict(null);
    }
  }, [provinces]);

  const handleDistrictSelect = (districtCode) => {
    const district = districts.find(d => d.code === districtCode);
    if (district) setSelectedDistrict(district);
  };

  useEffect(() => {
    if (changeUserStatus === 'succeeded' && changeUserData) {
      const { status, message } = changeUserData;
      ToastAndroid.show(status ? "Cập nhật thành công" : (message || "Cập nhật không thành công"), ToastAndroid.SHORT);
    }
  }, [changeUserData, changeUserStatus]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    setFormattedDate(currentDate.toLocaleDateString('en-GB'));
  };

  const thayDoi = async () => {
    const districtName = selectedDistrict?.name || "Chưa chọn quận huyện";
    const provinceName = selectedProvince?.name || "Chưa chọn tỉnh thành";
    const addressWithDetails = `${address}, ${districtName}, ${provinceName}`;

    const userData = {
      userId,
      fullname,
      email,
      phone,
      gender: gender || "Chưa chọn giới tính",
      dateofbirth: formattedDate,
      address: addressWithDetails,
    };
    const updatedUser = {
      ...user, user: {
        ...user.user, fullname: fullname, email: email, phone: phone, gender: gender || 'chưa chọn giới tính', dateofbirth: formattedDate,
        address: addressWithDetails,
      }
    };
    setUser(updatedUser);
    await AsyncStorage.setItem('userId', JSON.stringify(updatedUser));
    dispatch(ThayDoiThongTin(userData));
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
          style={stylesinput.inputComponent}
          keyboardType={"default"}
          value={fullname}
          onTextChange={setFullname}
          placeholder={'Nhập họ và tên của bạn'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <InputComponent
          style={stylesinput.inputComponent}
          keyboardType={"email-address"}
          value={email}
          onTextChange={setEmail}
          placeholder={'Nhập email của bạn'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Số điện thoại</Text>
        <InputComponent
          style={stylesinput.inputComponent}
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
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isMaleSelected}
            onValueChange={() => handleGenderSelection("Nam")}
            tintColors={{ true: '#007AFF', false: '#000' }}
          />
          <Text style={styles.label}>Nam</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isFemaleSelected}
            onValueChange={() => handleGenderSelection("Nữ")}
            tintColors={{ true: '#FF4081', false: '#000' }}
          />
          <Text style={styles.label}>Nữ</Text>
        </View>
      </View>
      <DropdownComponent
        onProvinceSelect={handleProvinceSelect}
        onDistrictSelect={handleDistrictSelect}
        selectedProvince={selectedProvince ? selectedProvince.code : null}
        selectedDistrict={selectedDistrict ? selectedDistrict.code : null}
      />
      <View style={styles.inputContainer}>
        <Text>Chi tiết</Text>
        <InputComponent
          style={stylesinput.inputComponent}
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
  inputContainer: { marginTop: 10 },
  btnCapNhat: { marginTop: 40 },
  inputBirthday: {
    height: 56,
    paddingHorizontal: 10,
    color: 'rgba(128, 128, 128, 0.90)',
    fontSize: fontsize.sm,
    fontWeight: '700',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(5, 114, 231, 0.05)',
    backgroundColor: colors.Grey_0,
  },
  checkboxlabelcontainer: { flexDirection: 'row', alignItems: 'center' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  label: { marginLeft: 8, fontSize: 16 },
});

export default EditProfileScreen;
