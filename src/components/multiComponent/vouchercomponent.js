import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'
import fontsize from '../../constants/fontsize'
import formatCurrencyVND from '../../untils/formatCurrencyVND'

const vouchercomponent = ({ data }) => {
    // console.log("============= data ============", data);

    const renderItems = (item, index) => {
        return (
            <View key={index} style={styles.luuvoucher}>
                <View style={styles.containertext}>
                    <Text style={styles.textvoucher}>Toàn nền tảng</Text>
                </View>
                <View style={styles.containergiamgia}>
                    <Text style={styles.txtgiamgia}>{item.voucherId.description}</Text>
                    <View style={styles.containerminiorder}>
                        <Text style={styles.textdon}>Đơn tối thiểu</Text>
                        <Text style={styles.textdon}>{formatCurrencyVND(item.voucherId.condition)}</Text>
                    </View>
                    {item.receive == "0" ?
                        <TouchableOpacity style={styles.containerbtnvoucher}>
                            <Text style={styles.txtluuma}>Lưu mã</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity

                            style={styles.containerbtnvoucher}>
                            <Text style={styles.txtluuma}>Dùng ngay</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
    return (
        <ScrollView
            horizontal={true}>
            <View style={
                { flexDirection: 'row', }
            }>
                {data.map((item, index) => renderItems(item, index))}

            </View>
        </ScrollView>

    )
}

export default vouchercomponent

const styles = StyleSheet.create({
    luuvoucher: {
        display: 'flex',
        width: 100,
        height: 130,
        backgroundColor: colors.primary_100,
        borderRadius: 5,
        marginStart: 7,
    },
    containertext: {
        width: '100%',
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        backgroundColor: colors.primary_600,
    },
    textvoucher: {
        fontSize: 10,
        fontFamily: 'Lato',
        fontWeight: '400',
        color: colors.onPrimary,
        textAlign: 'center',
        lineHeight: 20,
    },
    containergiamgia: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtgiamgia: {
        color: colors.Red,
        textAlign: 'center',
        fontSize: fontsize.xs,
        fontStyle: 'normal',
        fontWeight: '400',
        marginTop: 2
    },
    containerminiorder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 3,
    },
    textdon: {
        color: 'grey',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    containerbtnvoucher: {
        display: 'flex',
        width: 70,
        height: 'auto',
        paddingVertical: 4,
        paddingHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary_600,
        borderRadius: 20,
        marginTop: 4,
    },
    txtluuma: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '700'
    }
})