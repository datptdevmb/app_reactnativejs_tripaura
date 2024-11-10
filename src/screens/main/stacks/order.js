import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View, Alert } from "react-native";
import Header from "../../../components/common/header/Header";
import TourInfo from "./TourInfor";
import DepartureInfo from "./DepartureInfo";
import ContactInfo from "./ContactInfo";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/common/button/Button";
import formatCurrencyVND from "../../../untils/formatCurrencyVND";
import { fetchBooking } from '../../../redux/slices/booking.slice';

const OrderReviewScreen = ({ navigation, route }) => {
    const {
        tourById,
        adultTickets,
        childTickets,
        totalPrice,
        selectedDate,
    } = useSelector((state) => state.reducer.tour);





    console.log('tourById', tourById);
    console.log('selectedDate', selectedDate);
    const { detailId, adultPrice,childPrice, } = route.params;
    console.log('detailId', detailId);
    const voucherId = null;

    console.log('adultPrice', adultPrice);
    console.log('childPrice', childPrice);

    const dispatch = useDispatch();
    const userReducer = useSelector(state => state.reducer.auth);
    const user = userReducer.user;
    console.log('user: ', user);
    const userId = user.user._id
    console.log('userId: ', userId);


    const image = tourById.imges ? tourById.imges[0] : null;

    const { tourName } = tourById;

    const [contactInfo, setContactInfo] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleBack = () => {
        navigation.goBack();
    };

    const handleSaveBooking = async () => {
        const bookingData = {
            detailId,
            userId,
            voucherId: voucherId || null,
            numAdult: adultTickets,
            numChildren: childTickets,
            priceAdult: adultPrice,
            priceChildren: childPrice,
        };
    
        try {
            console.log('Đang gửi booking data:', bookingData); 
            const response = await dispatch(fetchBooking(bookingData)).unwrap();
            console.log('Phản hồi từ fetchBooking:', response); 
            handelNavigateToPayment(); 
        } catch (error) {
            console.log('Lỗi khi gọi fetchBooking:', error); 
        }
    };
    

    const handelNavigateToPayment = () => {
        const { name, email, phone } = contactInfo;
        if (!name || !email || !phone) {
            Alert.alert(
                "Thông báo",
                "Thông tin liên hệ là bắt buộc. Vui lòng điền đầy đủ.",
                [{ text: "OK" }]
            );
            return;
        }
        navigation.navigate("Payment", {
            tourName,
            selectedDate,
            adultTickets,
            childTickets,
            totalPrice,
            childPrice,
            image,
            contactInfo,
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent={false} barStyle="dark-content" backgroundColor="#FFF" />
            <Header
                title={'Hoàn tất hóa đơn'}
                onBackPress={handleBack} />
            <ScrollView>
                <View style={styles.content}>
                    <TourInfo
                        tourName={tourName}
                        date={selectedDate}
                        adultCount={adultTickets}
                        childCount={childTickets}
                        price={totalPrice}
                    />
                    <DepartureInfo />
                    <ContactInfo setContactInfo={setContactInfo} />
                </View>
            </ScrollView>
            <View style={styles.buttonBottom}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.text}>Tổng giá tiền</Text>
                        <Text style={styles.caption}>Đã bao gồm phí </Text>
                    </View>
                    <Text
                        style={styles.textPrice}>{formatCurrencyVND(totalPrice)}</Text>
                </View>
                <Button
                    style={styles.btn}
                    label="Mua ngay"
                    onPress={handleSaveBooking} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#DA712F',
    },
    content: {
        paddingBottom: 120,
    },
    buttonBottom: {
        width: '100%',
        position: "absolute",
        backgroundColor: 'white',
        bottom: 0,
        paddingHorizontal: 16,
        paddingVertical: 20,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    btn: {
        height: 44,
        marginTop: 10,
    }
});

export default OrderReviewScreen;
