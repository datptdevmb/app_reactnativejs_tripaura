import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Headercomponet from '../../../components/common/header/Headercomponet';
import { useDispatch, useSelector } from 'react-redux';
import { LayDanhSachVoucher } from '../../../redux/slices/vouchersSlice';
import { data } from '../../../../constants/data';
import fontsize from '../../../constants/fontsize';
import formatDate from '../../../untils/formatDate';

const ChonVoucher = ({ navigation, route }) => {
    const { totalPrice } = route.params
    // console.log("============price", totalPrice);
    const [btn, setbtn] = useState(false)
    const dispatch = useDispatch()
    const { getVoucherData, getVoucherStatus } = useSelector((state) => state.reducer.vouchers);
    const userReducer = useSelector(state => state.reducer.auth);
    const user = userReducer.user
    const [sortedData, setSortedData] = useState([]);

    console.log(user.user._id);

    useEffect(() => {
        dispatch(LayDanhSachVoucher(user.user._id))
        console.log("======= data", getVoucherData?.data);

        if (getVoucherData?.data) {
            const sorted = [...getVoucherData.data].sort((a, b) => {
                const isAQualified = totalPrice >= a.voucherId.condition;
                const isBQualified = totalPrice >= b.voucherId.condition;
                // Nếu thỏa mãn điều kiện thì lên trên
                return isBQualified - isAQualified;
            });
            setSortedData(sorted);
        }
    }, [user.user._id])
    // console.log(sortedData);



    const onPressItem = (discount, voucherId, condition) => {
        if (discount < 1) {
            console.log("============ % nè");
            const giamgia = condition * discount
            console.log("===================== %%%%%% giảm giá", giamgia);
            navigation.navigate('Order', { discount: giamgia, voucherId: voucherId })
        } else {
            if (totalPrice > discount) {
                navigation.navigate('Order', { discount: discount, voucherId: voucherId })
            } else {
                ToastAndroid.show('không đủ điều kiên', ToastAndroid.SHORT)
            }
        }



    }


    const renderItemSearch = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={() => onPressItem(item.voucherId.discount, item.voucherId._id, item.voucherId.condition)}
                disabled={totalPrice < item.voucherId.condition}>

                <View style={[styles.backgroundItem, totalPrice < item.voucherId.condition && { backgroundColor: 'grey' }]}>
                    <View style={{
                        width: 100, height: 100, justifyContent: 'center', backgroundColor: '#0572E7', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, alignItems: 'center'
                    }}>
                        <Text style={styles.textTitle}>Trip Aura</Text>
                    </View>
                    <View>
                        <Text style={styles.itemName} >{item.voucherId.description}</Text>

                        <Text style={styles.itemPrice}>Thời hạn: {formatDate(item.voucherId.endDay)} </Text>
                    </View>
                </View>

            </TouchableOpacity>

        </View>
    );



    return (
        <View style={styles.container}>
            <Headercomponet
                leftIcon={require('./../../../assets/images/close.png')}
                onPressLeftIcon={() => { navigation.goBack() }}
                title={"Chọn Voucher"} />
            <View style={{ height: 30 }}></View>

            <FlatList
                data={sortedData}
                keyExtractor={item => item._id}
                renderItem={renderItemSearch}

            />
        </View>
    )
}

export default ChonVoucher

const styles = StyleSheet.create({
    backgroundItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10
    },
    textTitleDisable: {
        width: 38,
        color: '#0572E7',
        textAlign: 'center',
        fontSize: fontsize.sm,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    textTitle: {
        width: 38,
        color: 'white',
        textAlign: 'center',
        fontSize: fontsize.sm,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
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