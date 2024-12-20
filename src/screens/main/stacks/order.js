// OrderReviewScreen.js
<<<<<<< HEAD
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
=======
import { ScrollView, StatusBar, StyleSheet, Text, View, NativeModules, useWindowDimensions } from "react-native";
const { ZaloPayModule } = NativeModules;
>>>>>>> aee1b1af7168e56a7fc252ee383cc92f7ccf3b19
import Header from "../../../components/common/header/Header";
import TourInfo from "./TourInfor";
import DepartureInfo from "./DepartureInfo";
import ContactInfo from "./ContactInfo";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/common/button/Button";
import formatCurrencyVND from "../../../untils/formatCurrencyVND";
<<<<<<< HEAD


const OrderReviewScreen = ({ navigation }) => {

=======
import Paymethod from "./Paymethod";
import { useCallback, useEffect, useState } from "react";
import { LayDanhSachVoucher } from "../../../redux/slices/vouchersSlice";
import SelecVoucher from "./selecVoucher";



const OrderReviewScreen = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();
>>>>>>> aee1b1af7168e56a7fc252ee383cc92f7ccf3b19
    const {
        tourById,
        adultTickets,
        childTickets,
        totalPrice,
        selectedDate,
    } = useSelector((state) => state.reducer.tour);


    const { tourName } = tourById;

    const { getVoucherData } = useSelector((state) => state.reducer.vouchers);
    const { user } = useSelector((state) => state.reducer.auth);
    const userId = user?.user?._id;

    const [selectedMethod, setSelectedMethod] = useState(null);


    useEffect(() => {
        dispatch(LayDanhSachVoucher(userId));
    }, [userId]);

    const handleVoucher = useCallback(() => {
        navigation.navigate('ListVoucherScreen')
    })

    const handlePuchase = useCallback(() => {
        const totalPriceString = totalPrice.toString();
        if (!selectedMethod) return
        if (selectedMethod == 1) {
            ZaloPayModule.createOrder(totalPriceString);
        }
        if (selectedMethod == 2) {
            console.log('payos')
        }

    })



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

            if (response.code === 200 && response.data && response.data._id) {
                console.log('Lấy được bookingId:', response.data._id);
                handelNavigateToPayment(response.data._id);
            } else {
                console.log('Không thể lấy được bookingId. Phản hồi từ server:', response);
                Alert.alert("Lỗi", "Không thể lấy được bookingId.");
            }
        } catch (error) {
            console.log('Lỗi khi gọi fetchBooking:', error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi gọi API đặt booking.");
        }
    };

    const handelNavigateToPayment = (bookingId) => {
        navigation.navigate("Payment", {
            tourName,
            selectedDate,
            adultTickets,
            childTickets,
            totalPrice,
            childPrice,
            image,
            contactInfo,
            bookingId

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
                    <ContactInfo />

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
                    onPressed={handlePuchase}
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
        paddingBottom: 120
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
