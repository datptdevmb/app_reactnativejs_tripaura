import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Button from '../../../../components/common/button/Button'
import Icons from '../../../../constants/Icons';
import { ROUTES } from '../../../../constants/routes';

const SettingScreen = (props) => {
  const { navigation, route } = props;
  const nhanDangNhapNe = () => {
    navigation.navigate(ROUTES.login);
  }

  return (
    <View style={styles.container}>
      {/* loginContainer */}
      <View style={styles.loginContainer}>
        <View style={styles.avatarContainer}>
          {/* <Image style={styles.avatar}
            source={require('../../../assets/images/h1.png')} /> */}
        </View>
        <Text style={styles.text1}>
          Đăng nhập ngay để mở khóa các tính năng tiện ích khác nhé
        </Text>
        <View style={styles.btnDangNhapContainer}>
          <Button
            label='Đăng nhập'
            style={styles.btnDangNhap}
            onPressed={nhanDangNhapNe}
          />
        </View>
      </View>
      {/* HelpContainer */}
      <View style={styles.helpContainer}>
        <View style={styles.btnHelpContainer}>
          <TouchableOpacity>
            <View style={styles.imageTroGiupContainer}>
              <Image
                style={styles.imageTroGiup}
                source={require('../../../../assets/icons/ic_lock.png')} />
            </View>
            <Text style={styles.txtTroGiup}>Trợ Giúp</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnCauHoiContainer}>
          <TouchableOpacity>
            <View style={styles.imageTroGiupContainer}>
              <Image
                style={styles.imageTroGiup}
                source={require('../../../../assets/icons/ic_helpcenter.png')} />
            </View>
            <Text style={styles.txtTroGiup}>Câu Hỏi</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* --- */}
      <View style={styles.underline} />
      <View style={styles.dkdv}>
        <TouchableOpacity>
          <View style={styles.btnContainer}>
          <Image style={styles.imageBtn}
                        source={Icons.ic_bell} />
            <Text style={styles.txtDieuKhoan}>Điều khoản sử dụng dịch vụ</Text>
            {/* <Image style={styles.btnNext}
              source={require('../../../assets/images/iconNext.png')} /> */}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.veChungToi}>
        <TouchableOpacity>
          <View style={styles.btnContainer}>
          <Image style={styles.imageBtn}
                        source={Icons.ic_bell} />
            {/* <Image style={styles.imageBtn}
              source={require('../../../assets/images/dkdv.png')} /> */}
            <Text style={styles.txtDieuKhoan}>Về chúng tôi</Text>
            {/* <Image style={styles.btnNext}
              source={require('../../../assets/images/iconNext.png')} /> */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
    veChungToi: {
      marginTop: 10
    },
    dkdv: {
      marginTop: 34
    },
    txtDieuKhoan: {
      width: 250,
      fontFamily: 'Lato',
    color: '#212121',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  btnContainer: {
    width: 350,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  imageBtn: {
    width: 22,
    height: 24,
    marginRight: 16
  },
  btnNext: {
    width: 12,
    height: 24,
  },
  underline: {
    width: 350,
    height: 1,
    backgroundColor: '#B3B3B3CC',
    marginTop: 32,
  },
  btnCauHoiContainer: {
    width: 88,
    height: 78,
  },
  txtTroGiup: {
    fontFamily: 'Lato',
    color: '#212121',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10
  },
  imageTroGiup: {
    width: 24,
    height: 24
  },
  imageTroGiupContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0572E70D',
    borderRadius: 8
  },
  btnHelpContainer: {
    width: 88,
    height: 78,
    marginHorizontal: 34
  },
  helpContainer: {
    flexDirection: 'row',
    marginTop: 38,
    justifyContent: 'center'
  },
  btnDangNhapContainer: {
    alignItems: 'center'
  },
  btnDangNhap: {
    width: 296,
    height: 47
  },
  text1: {
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    alignItems: 'center',
    textAlign: 'center',
    color: '#C9C9C9',
    margin: 16
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 65
  },
  avatarContainer: {
    alignItems: 'center'
  },
  loginContainer: {
    width: 350,
    height: 225,
    backgroundColor: '#0572E70D',
    borderRadius: 8,
    marginTop: 52,
    padding: 17,
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  }
})