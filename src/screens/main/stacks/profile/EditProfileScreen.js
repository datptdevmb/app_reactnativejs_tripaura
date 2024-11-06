
import React, { useEffect, useState, useContext, useCallback } from 'react';
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

import { fetchUserInfo } from '../../../../redux/slices/getUserbyID';
import stylesinput from '../../../../components/common/input/inputstyle';


const EditProfileScreen = ({ navigation }) => {
  const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };


  const state = useSelector((state) => state);
  const { user: contextUser, setUser: setContextUser } = useContext(AppContext);
  const { user: reduxUser } = useSelector((state) => state.reducer.auth.user);

  const changeUserData = useSelector((state) => state.reducer.changeUser);
  const changeUserStatus = useSelector((state) => state.reducer.changeUser);

  const dispatch = useDispatch();
  const { provinces } = useSelector((state) => state.reducer.provinces);
  const { districts } = useSelector((state) => state.reducer.district);

  const user = contextUser || reduxUser;
  const userId = user?._id;
  const setUser = setContextUser || setreduxUser;

  const [userinfo, setUserinfo] = useState({});
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");


  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [date, setDate] = useState(userinfo?.dateofbirth ? parseDateString(userinfo.dateofbirth) : new Date());
  const [isMaleSelected, setIsMaleSelected] = useState(false);
  const [isFemaleSelected, setIsFemaleSelected] = useState(false);
  const [gender, setGender] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');


  useEffect(() => {
    if (userId) {
      dispatch(fetchUserInfo(userId))
        .then((result) => {
          if (result.payload && result.payload.success) {
            const data = result.payload.data;
            console.log("Fetched User Info:", data);

            setEmail(data.email || '');
            setFullname(data.fullname || '');
            setPhone(data.phone || '');
            setAddress(data.address?.split(',')[0] || '');
            setGender(data.gender);
            const dateOfBirth = parseDateString(data.dateofbirth);
            setDate(dateOfBirth);
            setFormattedDate(dateOfBirth.toLocaleDateString('en-GB'));

            const addressParts = data.address.split(', ');
            const districtName = addressParts[addressParts.length - 2];
            const provinceName = addressParts[addressParts.length - 1];

            console.log('District:', districtName);
            console.log('Province:', provinceName);

            const province = provinces.find(p => p.name === provinceName);
            const district = districts.find(d => d.name === districtName);

            setSelectedProvince(province || null);
            setSelectedDistrict(district || null);

            console.log('Selected Province:', province);
            console.log('Selected District:', district);
          }
        })
        .catch((error) => console.error('Fetch User Info Error:', error));
    }
  }, [dispatch, userId, provinces, districts]);


  useEffect(() => {
    dispatch(fetchUserInfo(userId))
      .then((result) => {
        if (result.payload && result.payload.success) {
          setUserinfo(result.payload.data);
          console.log("User Info Updated:", result.payload.data);
        }
      })
      .catch((error) => {
        console.error("Fetch User Info Error:", error);
      });
  }, [dispatch, userId]);

  const chonnam = () => {
    setIsMaleSelected(!isMaleSelected);
    if (isFemaleSelected) setIsFemaleSelected(false);
    setGender("Nam");
    console.log("Gender selected: Nam");
  };

  const chonnu = () => {
    setIsFemaleSelected(!isFemaleSelected);
    if (isMaleSelected) setIsMaleSelected(false);
    setGender("Nữ");
    console.log("Gender selected: Nữ");
  };

  const handleProvinceSelect = useCallback((provinceCode) => {
    const province = provinces.find(p => p.code === provinceCode);
    if (province) {
      setSelectedProvince(province);
      setSelectedDistrict(null);
      console.log("Selected Province:", province);
    }
}, [provinces]);


  const handleDistrictSelect = (districtCode) => {
    const district = districts.find(d => d.code === districtCode);
    if (district) {
      console.log("Previous District:", selectedDistrict);
      setSelectedDistrict(district);
      console.log("New Selected District:", district);
    }
  };




  useEffect(() => {
    if (changeUserStatus === 'succeeded' && changeUserData) {
      const { status, message, data } = changeUserData;

      console.log("Trạng thái cập nhật:", status);
      console.log("Thông điệp:", message);
      console.log("Dữ liệu cập nhật:", data);

      if (status) {
        setUser(data);
        ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(message || "Cập nhật không thành công", ToastAndroid.SHORT);
      }
    } else {
      console.log("Current changeUserStatus:", changeUserStatus);
    }
  }, [changeUserData, changeUserStatus, setUser]);

  useEffect(() => {

    if (userinfo && userinfo.gender) {
      if (userinfo.gender === "Nam") {
        setIsMaleSelected(true);
        setIsFemaleSelected(false);
      } else if (userinfo.gender === "Nữ") {
        setIsMaleSelected(false);
        setIsFemaleSelected(true);
      }
      console.log("User Gender from Info:", userinfo.gender);
    }
  }, [userinfo]);

  useEffect(() => {
    if (userinfo && userinfo.dateofbirth) {
      const dateObject = parseDateString(userinfo.dateofbirth);
      setDate(dateObject);
      setFormattedDate(dateObject.toLocaleDateString('en-GB'));
      console.log("User Date of Birth from Info:", userinfo.dateofbirth);
    }
  }, [userinfo]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    setFormattedDate(currentDate.toLocaleDateString('en-GB'));

    console.log("Date selected:", currentDate);

  };

  const thayDoi = () => {
    const districtName = selectedDistrict?.name || "Chưa chọn quận huyện";
    console.log(districtName);
    const provinceName = selectedProvince?.name || "Chưa chọn tỉnh thành";
    console.log(provinceName);
    const addressWithDetails = `${address}, ${districtName}, ${provinceName}`;


    const userData = {
      userId: userId,
      fullname,
      email,
      phone,
      gender: gender || "Chưa chọn giới tính",
      dateofbirth: formattedDate,
      address: addressWithDetails,
    };

    console.log('Dữ liệu người dùng để cập nhật:', JSON.stringify(userData, null, 2));
    dispatch(ThayDoiThongTin(userData));
    ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
  };
  console.log('adderss', address)
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
