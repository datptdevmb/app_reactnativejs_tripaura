
import { StyleSheet, Text, View, Image, Modal, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import { styles } from './LoginRegisterScreenStyle';
import Header from '../../components/common/header/Headercomponet';
import SocialButton from '../../components/common/button/SocialButton';
import stylesglobal from '../../constants/global';
import Icons from '../../constants/Icons';

import { useDispatch, useSelector } from 'react-redux';
import { fetchGoogleUser } from '../../redux/slices/auth.slice';


const LoginRegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.reducer.auth);
  const [loading, setLoading] = useState(false); 


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '425470674648-kruk5stcsfk9gbi4chvoqu00fd02jad0.apps.googleusercontent.com',
    });
  }, []);

  const handleLoginWithGoogle = async () => {
    setLoading(true); 
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { data } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
      const currentUser = await auth().signInWithCredential(googleCredential);

      const { uid, email, displayName, photoURL } = currentUser.user;
      const userRequest = { uid, email, displayName, photoURL };

      await dispatch(fetchGoogleUser(userRequest));
      
    } catch (error) {
      handleSignInError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInError = (error) => {
    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        Alert.alert('Sign in cancelled', 'Bạn đã hủy đăng nhập.');
        break;
      case statusCodes.IN_PROGRESS:
        Alert.alert('Sign in in progress', 'Đang tiến hành đăng nhập...');
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        Alert.alert('Play services unavailable', 'Dịch vụ Google Play không khả dụng.');
        break;
      default:
        Alert.alert('Error', `Đã xảy ra lỗi: ${error.message}`);
        console.error(error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigation.goBack(); 
    }
  }, [isLogin, navigation]);

  return (
    <View style={stylesglobal.container}>
      <Header style={styles.Header} leftIcon={Icons.ic_leftarrow} />
      <Text style={stylesglobal.textheader}>Đăng nhập / Đăng ký</Text>
      <Text style={stylesglobal.textauth_description}>

        Nhận tài khoản <Text style={{ color: '#0572E7' }}>TripAura</Text> để khám phá tiện ích
      </Text>

     
      <Modal
        transparent={true}
        animationType="fade"
        visible={loading}
        onRequestClose={() => {}}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Đang xử lý...</Text>
          </View>
        </View>
      </Modal>

      <>
        <SocialButton
          label=" Email"
          icon={<Image source={Icons.ic_email} />}
          style={styles.EmailButton}
          labelStyle={styles.EmailLabel}
          onPressed={() => navigation.navigate('RegisterScreen')}
        />
        <SocialButton
          label=" Số điên thoại"
          icon={<Image source={Icons.ic_phone} />}
          style={styles.PhoneButton}
          labelStyle={styles.PhoneLabel}
          onPressed={() => console.log(' Số điên thoại')}
        />
        <SocialButton
          label=" Đăng nhập bằng Facebook"
          icon={<Image source={Icons.ic_facebook} />}
          style={styles.fbButton}
          labelStyle={styles.fbLabel}
          onPressed={() => console.log(' Đăng nhập bằng Facebook')}
        />
        <SocialButton
          onPressed={handleLoginWithGoogle}
          label=" Đăng nhập bằng Google"
          icon={<Image source={Icons.ic_google} />}
          style={styles.ggButton}
          labelStyle={styles.ggLabel}
        />
        <Text style={styles.mota}>
          Bằng cách đăng kí hoặc đăng nhập, bạn đã hiểu và đồng ý với Điều khoản chung và Chính sách bảo mật của TripAura
        </Text>
      </>
    </View>
  );
};


export default LoginRegisterScreen;
