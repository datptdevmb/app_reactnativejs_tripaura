import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/header/Headercomponet';
import InputComponent from '../../../components/common/input/InputCompoment';
import Button from '../../../components/common/button/Button';
import stylesglobal from '../../../constants/global';
import Icons from '../../../constants/Icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { DangKyTaiKhoan } from '../../../api/slice/registerreducers';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { registerData, registerStatus } = useSelector((state) => state.register);

  const back = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log('Register Status:', registerStatus);
    console.log('Register Data:', registerData);

    if (registerStatus === 'succeeded' && registerData.status) {
      ToastAndroid.show(registerData.message, ToastAndroid.SHORT);
      // Reset input fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigation.navigate('Login');
    }

    if (registerStatus === 'failed') {
      if (registerData.code === 400) {
        setEmailError(registerData.message);
        console.log('Email Error:', registerData.message);
      }
    }
  }, [registerStatus, registerData, navigation]);

  const validateInputs = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Vui lòng nhập email.');
      console.log('Email Error: Vui lòng nhập email.');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu.');
      console.log('Password Error: Vui lòng nhập mật khẩu.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setPasswordError('Mật khẩu không khớp.');
      console.log('Password Error: Mật khẩu không khớp.');
      isValid = false;
    }

    return isValid;
  };

  const dangkytaikhoan = () => {
    console.log('Attempting to register with:', { email, password });
    if (validateInputs()) {
      dispatch(DangKyTaiKhoan({ email, password }));
    }
  };

  return (
    <View style={stylesglobal.container}>
      <Header leftIcon={Icons.ic_leftarrow} onPressLeftIcon={back} />
      <Text style={[stylesglobal.textheader, { marginTop: 7 }]}>Đăng Ký</Text>
      <Text style={stylesglobal.textauth_description}>
        Nhận tài khoản <Text style={{ color: '#0572E7' }}>TripAura</Text> để khám phá tiện ích
      </Text>

      <Text style={[stylesglobal.textauth_description, { marginTop: 29 }]}>Email</Text>
      <InputComponent
        placeholder="Nhập email của bạn"
        onTextChange={setEmail}
        value={email}
        hidePassword={false}
        placeholderTextColor="#B0B0B0"
        keyboardType="email-address"
      />

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
        <TouchableOpacity onPress={() => navigation.navigate('Login')} >
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
