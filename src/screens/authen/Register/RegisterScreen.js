import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/header/Headercomponet';
import InputComponent from '../../../components/common/input/InputCompoment';
import Button from '../../../components/common/button/Button';
import stylesglobal from '../../../constants/global';
import Icons from '../../../constants/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { DangKyTaiKhoan } from '../../../redux/slices/registerreducers';

const RegisterScreen = (props) => {
  const { navigation, route } = props;
  const loginType = route.params?.loginType || 'email';

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { registerData, registerStatus } = useSelector((state) => state.register || {});

  const back = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log('Register Status:', registerStatus);
    console.log('Register Data:', registerData);

    if (registerStatus === 'succeeded') {
      if (registerData && registerData.status === 'success') {
        ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
      } else {
        console.log('Register Data is not valid:', registerData);
      }
    }
    if (registerStatus === 'failed') {
      console.log('Registration failed:', registerData);
    }
  }, [registerStatus, registerData, navigation]);

  const dangkytaikhoan = () => {
    console.log("Login Type: ", loginType);
    if (loginType === 'email') {
      if (!email || !password) {
        ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.SHORT);
        return;
      }
    } else {
      if (!phone || !password) {
        ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.SHORT);
        return;
      }
    }

    if (password !== confirmPassword) {
      ToastAndroid.show('Mật khẩu không khớp', ToastAndroid.SHORT);
      return;
    }
    dispatch(DangKyTaiKhoan(loginType === 'email' ? { email, password } : { phone, password }));
    navigation.navigate('Login', { loginType });
  };


  const goToLogin = () => {
    navigation.navigate('Login', { loginType });
  }
  return (
    <View style={stylesglobal.container}>
      <Header leftIcon={Icons.ic_leftarrow} onPressLeftIcon={back} />
      <Text style={[stylesglobal.textheader, { marginTop: 7 }]}>Đăng Ký</Text>
      <Text style={stylesglobal.textauth_description}>
        Nhận tài khoản <Text style={{ color: '#0572E7' }}>TripAura</Text> để khám phá tiện ích
      </Text>
      {
        loginType === 'email' ? (
          <>
            <Text style={[stylesglobal.textauth_description, { marginTop: 29 }]}>Email</Text>
            <InputComponent
              placeholder="Nhập email của bạn"
              onTextChange={setEmail}
              value={email}
              hidePassword={false}
              placeholderTextColor="#B0B0B0"
              keyboardType="email-address"
            />
          </>
        ) : (
          <>
            <Text style={[stylesglobal.textauth_description, { marginTop: 29 }]}>Số điện thoại</Text>
            <InputComponent
              placeholder="Nhập số điện thoại của bạn"
              onTextChange={setPhone}
              value={phone}
              hidePassword={false}
              placeholderTextColor="#B0B0B0"
              keyboardType="phone-pad"
            />
          </>
        )
      }
      <Text style={[stylesglobal.textauth_description, { marginTop: 12 }]}>Mật khẩu</Text>
      <InputComponent
        placeholder="Nhập mật khẩu của bạn"
        onTextChange={setPassword}
        hidePassword={true}
        placeholderTextColor="#B0B0B0"
        keyboardType="default"
      />

      <Text style={[stylesglobal.textauth_description, { marginTop: 12 }]}>Xác nhận mật khẩu</Text>
      <InputComponent
        placeholder="Nhập lại mật khẩu của bạn"
        onTextChange={setConfirmPassword}
        value={confirmPassword}
        hidePassword={true}
        placeholderTextColor="#B0B0B0"
        keyboardType="default"
      />

      <Button
        label="Đăng ký"
        onPressed={dangkytaikhoan}
        style={{ marginTop: 29 }}
      />

      <View style={[stylesglobal.containerTextOptions, { marginTop: 29 }]}>
        <TouchableOpacity onPress={goToLogin} >
          <Text style={stylesglobal.commonTextStyle}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotScreen')} >
          <Text style={stylesglobal.commonTextStyle}>Quên mật khẩu</Text>
        </TouchableOpacity>
      </View>

      <Text style={[stylesglobal.descriptionText, { marginTop: 100 }]} >
        Bằng cách đăng kí hoặc đăng nhập, bạn đã hiểu và đồng ý với Điều khoản chung và Chính sách bảo mật của TripAura
      </Text>
    </View>
  );
};

export default RegisterScreen;
