import { FlatList, StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Headercomponet from '../../../../components/common/header/Headercomponet'
import { useDispatch, useSelector } from 'react-redux';
import { GetDiaDiemByTinh } from '../../../../redux/slices/getDiaDiemByTinhSlice';
import formatCurrencyVND from '../../../../untils/formatCurrencyVND';
import { AddDiaDiem } from '../../../../redux/slices/addDiaDiemSlice';
import colors from '../../../../constants/colors';

const DiaDiem = ({ route, navigation }) => {
    const { tinhId, lichTrinhId, dayId, id } = route.params
    console.log('id: ', id);

    console.log('tinhId', tinhId, lichTrinhId, dayId);

    const dispatch = useDispatch();
    const { diaDiemByTinhData, diaDiemByTinhStatus } = useSelector(state => state.reducer.diaDiemByTinh);

    const { addDiaDiemData, addDiaDiemStatus } = useSelector(state => state.reducer.addDiaDiem);

    useEffect(() => {
        dispatch(GetDiaDiemByTinh(tinhId))
        if (diaDiemByTinhStatus === "successed") {

        }
    }, [tinhId])
    // console.log('=========== dia diem', diaDiemByTinhData.data);

    const nhanThem = (diaDiemId) => {
        dispatch(AddDiaDiem({ lichTrinhId, dayId, diaDiemId }))
        // if (addDiaDiemStatus === "successed") {
        // } else {

        // }
        Alert.alert("Success", "Thêm địa điểm thành công")
        navigation.goBack();
    }

    const renderItem = ({ item }) => {
        if (id.includes(item._id)) {
            return null;
        }
        return (
            <View style={styles.itemConttainer}>
                <Image source={{ uri: item.images[0] }}
                    style={styles.imageItem}
                />
                <View style={{ padding: 16 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', width: 160 }}
                        numberOfLines={2}>{item.name}</Text>
                    <Text>Thời gian: {item.time}</Text>
                    <Text>Giá vé: {formatCurrencyVND(item.price)}</Text>
                </View>
                <TouchableOpacity style={styles.btnDelete}
                    onPress={() =>
                        nhanThem(item._id)
                    }>
                    <Text style={{ textAlign: 'center', width: '100%', height: '100%', color: colors.primary_600, fontSize: 20 }}>+</Text>
                </TouchableOpacity>
            </View>
        );
    };

    if (diaDiemByTinhStatus === "loading") {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Headercomponet title={'Địa Điểm'} />

            <FlatList
                showsVerticalScrollIndicator={false}
                data={diaDiemByTinhData.data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    )
}

export default DiaDiem

const styles = StyleSheet.create({
    btnDelete: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 45,
        right: 8,
        borderColor: 'green'
    },
    imageItem: {
        width: 150,
        height: 120
    },
    itemConttainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 16
    }
})