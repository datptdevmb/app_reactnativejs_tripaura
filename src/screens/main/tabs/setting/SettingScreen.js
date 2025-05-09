import {
    Alert,
    Image,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState, useContext, useEffect} from 'react';
  
  import stylesglobal from '../../../../constants/global';
  import Icons from '../../../../constants/Icons';
  import colors from '../../../../constants/colors';
  
  import {ThayDoiThongTin} from '../../../../redux/slices/ChangeUserSlice';
  import {
    logoutUser,
    checkLoginStatus,
  } from '../../../../redux/slices/auth.slice';
  import {useDispatch, useSelector} from 'react-redux';
  import {fetchUserInfo} from '../../../../redux/slices/getUserbyID';
  import {AppContext} from '../../../AppContext';
  import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
  
  const SettingLoggedScreen = props => {
    const {navigation} = props;
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledchdo, setIsEnabledchedo] = useState(false);
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const userReducer = useSelector(state => state.reducer.auth);
    const user = userReducer.user;
    console.log('user: ', user);
    const userId = user.user._id;
  
    console.log('image: ', image);
  
    const changeUserStatus = useSelector(state => state.changeUser);
  
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitchchedo = () => setIsEnabledchedo(previousState => !previousState);
  
    useEffect(() => {
      if (user.user) {
        const userData = user.user;
        const avatar = userData.avatar;
        const fullname = userData.fullname;
        const email = userData.email;
        const userId = userData._id;
  
        console.log('Avatar:', avatar);
        console.log('Fullname:', fullname);
        console.log('Email:', email);
        console.log('User ID:', userId);
      }
    }, [user]);
  
    const commonOptions = {
      mediaType: 'photo',
      maxWidth: 100,
      maxHeight: 100,
    };
  
    const handleImageSelection = async response => {
      if (response?.assets?.[0]?.uri) {
        setImage(response.assets[0].uri);
        await handleUpdate(response.assets[0]);
      } else {
        console.log('User cancelled image picker');
        setImage(null);
      }
    };
  
    const openImagePicker = async () => {
      try {
        const response = await launchImageLibrary({
          selectionLimit: 1,
          ...commonOptions,
        });
        await handleImageSelection(response);
      } catch (error) {
        console.error('Image picker error:', error);
      }
    };
  
    const openCamera = async () => {
      const response = await launchCamera({
        cameraType: 'front',
        saveToPhotos: true,
        ...commonOptions,
      });
      if (response.didCancel) {
        Alert.alert('Camera Canceled', 'Bạn đã hủy trình chọn camera.');
        setImage(null);
      } else {
        await handleImageSelection(response);
      }
    };
  
    const handleUpdate = async image => {
      if (!user) {
        Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng');
        return;
      }
      const data = new FormData();
      data.append('file', {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: `photo.${image.uri.split('.').pop()}`,
      });
      data.append('upload_preset', 'TripAuraAPI');
      data.append('api_key', '976765598717887');
  
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dtoazwcfd/upload`,
          {
            method: 'POST',
            body: data,
          },
        );
  
        const result = await response.json();
        console.log('Cloudinary response:', result);
        if (response.ok) {
          const imageUrl = result.secure_url;
  
          const userUpdateData = {
            userId: userId,
            avatar: imageUrl,
          };
  
          const updateResult = await dispatch(ThayDoiThongTin(userUpdateData));
          if (updateResult.error) {
            Alert.alert('Lỗi', 'Cập nhật thông tin người dùng không thành công');
          } else {
            Alert.alert('Thành công', 'Cập nhật hình ảnh thành công');
            dispatch(fetchUserInfo(userId));
            setImage(imageUrl);
          }
        } else {
          Alert.alert('Lỗi', 'Không thể tải lên hình ảnh');
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải lên hình ảnh');
        console.error(error);
      }
    };
  
    useEffect(() => {
      if (changeUserStatus === 'failed') {
        Alert.alert('Lỗi', 'Cập nhật thông tin người dùng không thành công');
      }
    }, [changeUserStatus]);
  
    const userName = user?.user.fullname || 'Nguyễn Văn A';
  
    const avatar = image
      ? {uri: image}
      : typeof user?.user.avatar === 'string' &&
        user.user.avatar.startsWith('http')
      ? {uri: user.user.avatar}
      : Icons.avatar;
  
    console.log('avatar', avatar);
    console.log('name', userName);
    console.log('userName:', user?.user.fullname);
  
    function handleMap() {
      navigation.navigate('MapScreen');
    }
    function handleCauhoi() {
      navigation.navigate('FAQsSrceen');
    }
    function handlePurchase() {
      navigation.navigate('Purchasehistory');
    }
  
    const handleLogout = async () => {
      try {
        dispatch(logoutUser());
        dispatch(checkLoginStatus());
        //   navigation.replace('LoginRegisterScreen');
      } catch (error) {
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng xuất');
        console.error('Đăng xuất không thành công:', error);
      }
    };
    return (
      <View style={stylesglobal.container}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={openImagePicker}>
              <Image source={avatar} style={styles.imageAvatar} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icCameraContainer}
              onPress={openCamera}>
              <Image source={Icons.ic_camera} />
            </TouchableOpacity>
          </View>
          <View style={styles.txtNameContainer}>
            <Text style={styles.txtName}>{userName}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfileScreen')}
              style={styles.btnCapNhaHoSo}>
              <Text style={styles.txtLable}>Cập nhật hồ sơ</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}
            style={styles.iconNextContainer}>
            <Image style={styles.iconNext} source={Icons.ic_arrowright} />
          </TouchableOpacity>
        </View>
        <View style={styles.btnHorizontalContainer}>
          <View>
            <TouchableOpacity
              style={styles.btnCauHoiContainer}
              onPress={handlePurchase}>
              <View style={styles.imageTroGiupContainer}>
                <Image style={styles.imageTroGiup} source={Icons.ic_orther} />
              </View>
              <Text style={styles.txtTroGiup}>Tour</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleMap}
              style={styles.btnCauHoiContainer}>
              <View style={styles.imageTroGiupContainer}>
                <Image style={styles.imageTroGiup} source={Icons.ic_map} />
              </View>
              <Text style={styles.txtTroGiup}>Địa điểm đã đi</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleCauhoi}
              style={styles.btnCauHoiContainer}>
              <View style={styles.imageTroGiupContainer}>
                <Image style={styles.imageTroGiup} source={Icons.ic_message} />
              </View>
              <Text style={styles.txtTroGiup}>Câu hỏi thường gặp</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.btnCauHoiContainer}>
              <View style={styles.imageTroGiupContainer}>
                <Image style={styles.imageTroGiup} source={Icons.ic_lock} />
              </View>
              <Text style={styles.txtTroGiup}>Thay đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>
  
          <View>
            <TouchableOpacity style={styles.btnCauHoiContainer}>
              <View style={styles.imageTroGiupContainer}>
                <Image style={styles.imageTroGiup} source={Icons.ic_orther} />
              </View>
              <Text style={styles.txtTroGiup}>Đơn hàng của tôi</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.underline} />
  
        <View style={styles.thongBaoContainer}>
          <View style={styles.btnContainer}>
            <Image style={styles.imageBtn} source={Icons.ic_bell} />
            <Text style={styles.txtDieuKhoan}>Điều khoản sử dụng dịch vụ</Text>
            <View style={styles.lefticon}>
              <Switch
                trackColor={{false: '#767577', true: '#0572E7'}}
                thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>
        <View style={styles.SangToiContainer}>
          <View style={styles.btnContainer}>
            <Image style={styles.imageBtn} source={Icons.ic_moon} />
            <Text style={styles.txtDieuKhoan}>Chế độ tối</Text>
            <View style={styles.lefticon}>
              <Switch
                trackColor={{false: '#767577', true: '#0572E7'}}
                thumbColor={isEnabledchdo ? '#FFFFFF' : '#FFFFFF'}
                onValueChange={toggleSwitchchedo}
                value={isEnabledchdo}
              />
            </View>
          </View>
        </View>
  
        <View style={styles.language}>
          <TouchableOpacity>
            <View style={styles.btnContainer}>
              <Image style={styles.imageBtn} source={Icons.ic_earth} />
              <Text style={styles.txtDieuKhoan}>Chế độ tối</Text>
              <View style={styles.lefticon}>
                <Text>VN</Text>
                <Image style={styles.btnNext} source={Icons.ic_arrowbottom} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.language}>
          <TouchableOpacity>
            <View style={styles.btnContainer}>
              <Image style={styles.imageBtn} source={Icons.ic_mony} />
              <Text style={styles.txtDieuKhoan}>Tiền tệ</Text>
              <View style={styles.lefticon}>
                <Text>VND</Text>
                <Image style={styles.btnNext} source={Icons.ic_arrowbottom} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
  
        <View style={styles.underline} />
  
        <View style={styles.language}>
          <View style={styles.btnContainer}>
            <Image style={styles.imageBtn} source={Icons.ic_lockout} />
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.txtDieuKhoan}>Đăng xuất</Text>
            </TouchableOpacity>
            <View style={styles.lefticon}>
              <Image style={styles.btnNext} source={Icons.ic_arrowright} />
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  export default SettingLoggedScreen;
  
  const styles = StyleSheet.create({
    btnNext: {
      width: 16,
      height: 16,
      marginLeft: 10,
    },
    lefticon: {
      width: 50,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    SangToiContainer: {
      marginTop: 10,
    },
    thongBaoContainer: {
      marginTop: 34,
    },
    txtDieuKhoan: {
      width: 230,
      fontFamily: 'Lato',
      color: colors.Grey_900,
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    btnContainer: {
      width: '100%',
      height: 44,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    underline: {
      width: '100%',
      height: 1,
      backgroundColor: '#B3B3B3CC',
      marginTop: 16,
    },
    btnCauHoiContainer: {
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtTroGiup: {
      height: 34,
      fontFamily: 'Lato',
      color: '#212121',
      fontSize: 14,
      fontWeight: '400',
      textAlign: 'center',
    },
    imageTroGiup: {
      width: 24,
      height: 24,
    },
    imageTroGiupContainer: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0572E70D',
      borderRadius: 8,
    },
    btnHorizontalContainer: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 38,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconNextContainer: {
      width: 28,
      height: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconNext: {
      width: 18,
      height: 18,
    },
    btnCapNhaHoSo: {
      width: 100,
      height: 24,
      justifyContent: 'center',
    },
    txtName: {
      fontFamily: 'Lato',
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 27,
      color: '#000000',
    },
    txtLable: {
      fontFamily: 'Lato',
      fontSize: 14,
      fontWeight: '400',
      color: colors.primary_500,
    },
    txtNameContainer: {
      width: 200,
    },
    avatarContainer: {
      width: 65,
      height: 65,
      borderRadius: 50,
    },
    headerContainer: {
      width: '100%',
      height: 70,
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    icCameraContainer: {
      width: 28,
      height: 28,
      backgroundColor: colors.primary_500,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    imageAvatar: {
      width: 65,
      height: 65,
      borderRadius: 50,
      resizeMode: 'cover',
    },
  });