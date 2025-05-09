import { StyleSheet, Text, Image, View, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Headercomponet from './../../../../components/common/header/Headercomponet';
import Icons from './../../../../constants/Icons';
import { datacity, voucher, placename } from './../../../../constants/data';
import Vouchercomponent from './../../../../components/multiComponent/vouchercomponent';
import SectionViewVoucher from './../../../../components/multiComponent/SectionViewVoucher';
import stylesglobal from '../../../../constants/global';
import colors from '../../../../constants/colors';
import fontsize from '../../../../constants/fontsize';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { LayDanhSachVoucher } from '../../../../redux/slices/vouchersSlice';
import PopularToursList from '../../tabs/home/PopularToursList';
import { useHomeData } from '../../../../hooks/useHomeData';


const Voucher = () => {
  const navigation = useNavigation();
  const {
    categories,
    tours,
    popularTours,
    images,
    isLoading
  } = useHomeData();

  console.log('tour', tours);


  const dispatch = useDispatch()
  const { getVoucherData, getVoucherStatus } = useSelector((state) => state.reducer.vouchers);
  const userReducer = useSelector(state => state.reducer.auth);
  const user = userReducer.user;
  let key_id;

  const handelPopular = useCallback(() => {
    console.log("Popular category selected");
  },);

  useEffect(() => {
    if (user?.user?._id) {
      dispatch(LayDanhSachVoucher(user.user._id));
    }
  }, [user?.user?._id]);

  useEffect(() => {
    if (getVoucherData?.data?.length > 0) {
      key_id = getVoucherData.data.map((item) => {
        return item.voucherId._id;
      });
    }
  }, [getVoucherData]);

  const hasVoucherData = getVoucherData?.data?.length > 0;

  return (
    <ScrollView style={stylesglobal.container} showsVerticalScrollIndicator={false}>
      <Headercomponet
        leftIcon={Icons.ic_leftarrow}
        title={"Ưu đãi"}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <View style={styles.containervoucher}>
        <Text style={styles.txtmauudai}>Voucher</Text>
        <View style={styles.contaivorcher}>
          {hasVoucherData ? (
            <Vouchercomponent data={getVoucherData.data}/>
          ) : (
            <Text style={{ color: colors.grey }}>Không có voucher nào.</Text>
          )}
        </View>
      </View>
      <View style={{ width: '100%', marginTop: 13, flexDirection: 'column' }}>
        <Text style={styles.text}>Tour đang giảm giá</Text>
        <PopularToursList onClick={handelPopular} popularTours={popularTours} />
      </View>
      <View style={{ height: 120 }} />
    </ScrollView>
  );
};

export default Voucher;

const styles = StyleSheet.create({
  containervoucher: {
    display: 'flex',
    width: '100%',
    height: 'auto',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRadius: 20,
    backgroundColor: '#E9967A',
    marginTop: 33,
  },
  txtmauudai: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: fontsize.sm,
    fontWeight: '700',
    marginStart: 10,
    paddingVertical: 10
  },
  contaivorcher: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
    borderRadius: 15,
    backgroundColor: colors.Lavendermist,
    flexDirection: 'row',
    bottom: 0,
    paddingHorizontal: 10
  },
  text: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.035,
    color: 'black',
    textDecorationLine: 'underline'
  }
});
