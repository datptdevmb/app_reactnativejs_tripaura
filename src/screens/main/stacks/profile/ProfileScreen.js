import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Headercomponet from '../../../../components/common/header/Headercomponet';
import stylesglobal from '../../../../constants/global';
import Icons from '../../../../constants/Icons';
import colors from '../../../../constants/colors';
import fontsize from '../../../../constants/fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../../../../redux/slices/getUserbyID';

const ProfileScreen = (props) => {
  const { navigation } = props;
  const [image, setImage] = useState(null);
  const reduxUser = useSelector((state) => state.reducer.auth.user);
  const dispatch = useDispatch();
  const userId = reduxUser?.user?._id;  // Lấy userId từ reduxUser

  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [isMaleSelected, setIsMaleSelected] = useState(false);
  const [isFemaleSelected, setIsFemaleSelected] = useState(false);

  

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserInfo(userId)).then((result) => {
        if (result.payload?.success) {
          const data = result.payload.data;
          setEmail(data.email || '');
          setFullname(data.fullname || '');
          setPhone(data.phone || '');
          setAddress(data.address?.split(',')[0] || '');
          setGender(data.gender);
          if (data.gender === "Nam") setIsMaleSelected(true);
          else if (data.gender === "Nữ") setIsFemaleSelected(true);
          console.log('data', data);
          
          const dateOfBirth = parseDateString(data.dateofbirth);  
          console.log('dateOfBirth', dateOfBirth);
          
          if (dateOfBirth) {
            setDate(dateOfBirth);
            setFormattedDate(dateOfBirth.toLocaleDateString('en-GB'));
          }
        }
      });
    }
  }, [dispatch, userId]);
  
  

  const nhanBack = () => {
    navigation.goBack();
  };

  const parseDateString = (dateString) => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }
    return null;
  };
  

  console.log('date', date);


  return (
    <View style={stylesglobal.container}>
      <Headercomponet
        leftIcon={Icons.ic_leftarrow}
        title={"Thông tin cá nhân"}
        style={styles.header}
        onPressLeftIcon={nhanBack}
      />
      <View style={styles.avatarContainer}>
        <View style={styles.imageAvatar}>
          <Image
            source={image ? { uri: image } : (reduxUser?.user?.avatar ? { uri: reduxUser.user.avatar } : Icons.avatar)}
            style={styles.imageAvatar}
          />
          <TouchableOpacity style={styles.icCameraContainer}>
            <Image source={Icons.ic_camera} />
          </TouchableOpacity>
        </View>
        <Text style={styles.txtName}>{reduxUser?.user?.fullname}</Text>
      </View>

      <View style={styles.underline} />

      <View style={styles.gioiThieuContainer}>
        <Text style={styles.title}>Giới thiệu</Text>
        <View style={styles.itemProfile}>
          <Image style={styles.icon} source={Icons.ic_giftbox} />
          <Text style={[styles.txtTitle, { color: colors.Grey_600 }]}>Ngày sinh:</Text>
          <Text style={styles.txtContent}>{formattedDate}</Text>
        </View>
        <View style={styles.itemProfile}>
          <Image style={styles.icon} source={Icons.ic_person} />
          <Text style={[styles.txtTitle, { color: colors.Grey_600 }]}>Giới tính: </Text>
          <Text style={styles.txtContent}>{gender}</Text>
        </View>
      </View>

      <View style={styles.ttlhContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Thông tin liên hệ</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')}>
            <Image source={Icons.ic_edit} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemProfile}>
          <Image style={styles.icon} source={Icons.ic_email} />
          <Text style={styles.txtTitle}>Email:</Text>
          <Text style={styles.txtContent}>{email}</Text>
        </View>
        <View style={styles.itemProfile}>
          <Image style={styles.icon} source={Icons.ic_cellphone} />
          <Text style={styles.txtTitle}>Phone:</Text>
          <Text style={styles.txtContent}>{phone}</Text>
        </View>
        <View style={styles.itemProfile}>
          <Image style={styles.icon} source={Icons.ic_address} />
          <Text style={styles.txtTitle}>Địa chỉ:</Text>
          <Text numberOfLines={1} style={styles.txtContent}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  ttlhContainer: {
    width: '100%',
    marginTop: 24,
  },
  icon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: colors.Grey_300,
  },
  txtContent: {
    width: 250,
    fontFamily: 'Lato',
    fontSize: fontsize.md,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.Steelblue,
    marginLeft: 4,
  },
  txtTitle: {
    fontFamily: 'Lato',
    fontSize: fontsize.md,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.Semi_transparentGray,
    marginLeft: 16,
  },
  itemProfile: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Lato',
    fontSize: fontsize.md,
    fontWeight: '700',
    lineHeight: 24,
    textTransform: 'uppercase',
    color: colors.Grey_900,
    marginBottom: 5,
  },
  gioiThieuContainer: {
    width: '100%',
    marginTop: 18,
  },
  underline: {
    width: '100%',
    height: 1,
    backgroundColor: colors.Grey_500,
    marginTop: 16,
  },
  txtName: {
    color: '#212121',
    fontFamily: 'Lato',
    fontSize: fontsize.md,
    fontWeight: '700',
    lineHeight: 27,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 11,
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
  header: {
    color: colors.primary_500,
    fontFamily: 'Lato',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 27,
  },
});
