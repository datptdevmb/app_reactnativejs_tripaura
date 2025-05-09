import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import Headercomponet from '../../../../components/common/header/Headercomponet'
import { useDispatch, useSelector } from 'react-redux';
import { LayDanhSachVoucher } from '../../../../redux/slices/vouchersSlice';
import { data } from '../../../../constants/data';
import fontsize from '../../../../constants/fontsize';

const ChonVoucher = () => {

    const dispatch = useDispatch()
    const { getVoucherData, getVoucherStatus } = useSelector((state) => state.reducer.getVoucher);
    const userReducer = useSelector(state => state.reducer.auth);
    const user = userReducer.user

    console.log(user.user._id);

    useEffect(() => {
        dispatch(LayDanhSachVoucher(user.user._id))
    }, [])
    // console.log("====== data", getVoucherData.data);
    const formatCurrencyVND = amount => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const renderItemSearch = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={() => onPressItem(item.voucherId._id)}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        width: 100, height: 100, marginLeft: 32, justifyContent: 'center'
                    }}>
                        <Text style={{ width: 38, color: '#0572E7', textAlign: 'center', fontSize: fontsize.sm, fontWeight: 'bold', textTransform: 'uppercase' }}>Trip Aura</Text>
                    </View>
                    <View>
                        <Text style={styles.itemName} >{item.voucherId.description}</Text>

                        <Text style={styles.itemPrice}>{formatCurrencyVND(item.voucherId.discount)} </Text>
                    </View>

                </View>
            </TouchableOpacity>

        </View>
    );



    return (
        <View style={styles.container}>
            <Headercomponet
                leftIcon={require('../../../../assets/images/close.png')}
                onPressLeftIcon={() => { }}
                title={"Chọn Voucher"} />

            <FlatList
                data={getVoucherData.data}
                keyExtractor={item => item._id}
                renderItem={renderItemSearch}

            />
        </View>
    )
}

export default ChonVoucher

const styles = StyleSheet.create({
    itemContainer: {

        marginBottom: 20,
    },
    itemImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 10, // Bo góc trên bên trái
        borderTopRightRadius: 10, // Bo góc trên bên phải
    },
    itemName: {
        height: 40,
        width: 160,
        fontSize: fontsize.sm,
        color: '#4D4D4D',
        fontWeight: 'bold',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        fontWeight: '700',
    },
    itemPrice: {
        fontSize: fontsize.sm,
        color: 'black',
        fontWeight: '700',
        marginLeft: 16,
        marginRight: 16,
    },
    itemDay: {
        height: 16,
        fontSize: fontsize.fm,
        color: '#757575',
        marginLeft: 8,
        marginRight: 16,
        fontWeight: '700',
    },
    container: {
        flex: 1,
        padding: 16
    }
})