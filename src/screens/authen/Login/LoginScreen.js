import { Text, View, ToastAndroid, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../../AppContext';
import Header from '../../../components/common/header/Headercomponet';
import InputComponent from '../../../components/common/input/InputCompoment';
import Button from '../../../components/common/button/Button';
import stylesglobal from '../../../constants/global';
import Icons from '../../../constants/Icons';
import { DangNhapTaiKhoan } from '../../../redux/slices/loginreducers';

const Login = (props) => {
  const { navigation, route } = props;
  const { setUser, setIsLogin } = useContext(AppContext);
  const dispatch = useDispatch();
  const { loginData, loginStatus } = useSelector((state) => state.login || {});

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginType = route.params?.loginType || 'email';
  console.log(loginType)

  console.log('login', loginData),
    console.log('loginStatus', loginStatus)

  useEffect(() => {
    if (loginStatus === 'succeeded') {
      console.log('loginData.data:', loginData.data);
      setUser(loginData.data);
      setIsLogin(true);
      console.log('user:', loginData.data);
      navigation.navigate('MainTabNavigation');
    }

    if (loginStatus === 'failed') {
      ToastAndroid.show(loginData.message, ToastAndroid.SHORT);
    }
  }, [loginStatus, loginData, navigation]);



  useEffect(() => {
    if (isLoggedIn) {
      setEmail('');
      setPhone('');
      setPassword('');
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const back = () => {
    navigation.goBack();
  };

  const dangnhaptaikhoan = () => {
    // dispatch(DangNhapTaiKhoan({ email, password }));
    if (loginType === 'email') {
      if (!email) {
        ToastAndroid.show('Vui lòng nhập email', ToastAndroid.SHORT);
        return;
      }
      dispatch(DangNhapTaiKhoan({ email, password }));
    } else {
      if (!phone) {
        ToastAndroid.show('Vui lòng nhập số điện thoại', ToastAndroid.SHORT);
        return;
      }
      dispatch(DangNhapTaiKhoan({ phone, password }));
    }
  };

  const goToRegister = () => {
    navigation.navigate('RegisterScreen', { loginType });
  }

  return (
    <View style={stylesglobal.container}>
      <Header
        leftIcon={Icons.ic_leftarrow}
        onPressLeftIcon={back}
      />
      <Text style={[stylesglobal.textheader, { marginTop: 14 }]}>Đăng nhập</Text>
      <Text style={stylesglobal.textauth_description}>
        Trải nghiệm & khám phá tiện ích của{' '}
        <Text style={{ color: '#0572E7' }}>TripAura</Text>
      </Text>
      {
        loginType === 'email' ? (
          <>
            <Text style={[stylesglobal.textauth_description, { marginTop: 30 }]}>Email</Text>
            <InputComponent
              placeholder="Nhập email của bạn"
              onTextChange={text => setEmail(text)}
              value={email}
              hidePassword={false}
              placeholderTextColor="#B0B0B0"
              keyboardType="email-address"
            />
          </>
        ) : (
          <>
            <Text style={[stylesglobal.textauth_description, { marginTop: 30 }]}>Số điện thoại</Text>
            <InputComponent
              placeholder="Nhập số điện thoại của bạn"
              onTextChange={text => setPhone(text)}
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
        onTextChange={text => setPassword(text)}
        value={password}
        hidePassword={true}
        placeholderTextColor="#B0B0B0"
        keyboardType="default"
      />
      <Button
        label="Đăng nhập"
        onPressed={dangnhaptaikhoan}
        style={{ marginTop: 29 }}
      />
      <View style={[stylesglobal.containerTextOptions, { marginTop: 30 }]}>
        <TouchableOpacity onPress={goToRegister}>
          <Text style={stylesglobal.commonTextStyle}>Tạo tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotScreen')}>
          <Text style={stylesglobal.commonTextStyle}>Quên mật khẩu</Text>
        </TouchableOpacity>
      </View>
      <Text style={[stylesglobal.descriptionText, { marginTop: 104 }]}>
        Bằng cách đăng kí hoặc đăng nhập, bạn đã hiểu và đồng ý với Điều khoản
        chung và Chính sách bảo mật của TripAura
      </Text>
    </View>
  );
};

export default Login;
