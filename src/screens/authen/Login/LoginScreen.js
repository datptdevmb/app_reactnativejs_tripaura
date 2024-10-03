import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {styles} from './LoginScreenStyle';
import Header from '../../../components/common/header/Headercomponet';
import InputComponent from '../../../components/common/input/InputCompoment';
import Button from '../../../components/common/button/Button';
import stylesglobal from '../../../constants/global';

const Login = () => {
  return (
    <View style={stylesglobal.container}>
      <Header
        leftIcon={require('../../../../assets/images/back1.png')}
      />

      <Text style={styles.text}>Đăng nhập</Text>
      <Text style={styles.text2}>
        Trải nghiệm & khám phá tiện ích của{' '}
        <Text style={styles.TripAru}>TripAru</Text>
      </Text>

      <Text style={styles.email}>Email</Text>

      <InputComponent
        placeholder="Nhập email của bạn"
        onTextChange={text => console.log(text)}
        value=""
        hidePassword={false}
        placeholderTextColor="#B0B0B0"
        keyboardType="email-address"
      />

      <Text style={styles.pass}>Mật khẩu</Text>
      <InputComponent
        placeholder="Nhập mật khẩu của bạn"
        onTextChange={text => console.log(text)}
        value=""
        hidePassword={true}
        placeholderTextColor="#B0B0B0"
        keyboardType="default"
      />
      <Button
        label="Đăng nhập" // Nội dung nút
        onPressed={''} // Hàm xử lý nhấn nút
        style={styles.button} // Có thể thêm style tùy chỉnh
      />
       <View style={styles.containertxttaotk}>
        <Text style={styles.Taotk}>Tạo tài khoản</Text>
        <Text style={styles.Quenmk}>Quên mật khẩu ?</Text>
      </View>
      <Text style={styles.mota}>
        Bằng cách đăng kí hoặc đăng nhập , bạn đã hiểu và đồng ý với Điều khoản
        chung và Chính sách bảo mật của TripAura
      </Text>
    </View>
  );
};
export default Login;
