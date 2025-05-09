import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ButtonHelp from '../../../../components/common/button/ButtonHelp';
import IcCalendar from '../../../../assets/icons/Ic_calendar';
import Lable from '../../../../components/common/labelText';

const RefundPolicy = () => {
    return (
        <ScrollView style={styles.container}>
            {/* <Text style={styles.title}>Bạn cần lưu ý trước khi đặc</Text> */}
            <Lable style={styles.mrT} lable={"Bạn cần lưu ý trước khi đặt "} />
            <View style={styles.row}>
                <View style={[styles.row, styles.background, styles.mr]}>
                    <IcCalendar />
                    <Text style={styles.content}>Có thể hoàn hoặc không</Text>
                </View>
                <View style={[styles.row, styles.background]}>
                    <IcCalendar />
                    <Text style={styles.content}> Không thể chỉnh sửa </Text>
                </View>
            </View>
            <Text style={styles.terms}> Tìm hiểu thêm về chính sách  </Text>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    mrT: {
        marginTop: 14
    },
    row: {
        flexDirection: 'row',
        marginTop: 8
    },
    terms: {
        color: '#378EEC',
        fontSize: 12,
        fontStyle: 'normal',
        fontFamily: 'Lato',
        fontWeight: '400',
        marginTop: 12
    },
    mr: {
        marginRight: 12
    },
    content: {
        fontSize: 12,
        fontFamily: 'Poppins_Regular',
        fontStyle: 'normal',
        color: '#494B4B',
        fontWeight: '500',
        marginStart: 6
    },
    background: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        backgroundColor: '#EDEDED',
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Lato',
        color: '#494B4B',
        marginTop: 10,
        marginBottom: 12
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default RefundPolicy;
