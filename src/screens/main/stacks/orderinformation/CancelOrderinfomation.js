import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../../../components/common/header/Header';
import { updateBookingStatus, updateMaxTicket } from '../../../../sevices/apiServices';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CancelOrderinfomation = ({ route }) => {
    const navigation = useNavigation();

    const bookingData = useSelector((state) => state.reducer.booking);
    console.log('bookingData', bookingData);
    const booking = bookingData.bookingData.data;
    console.log('booking', booking);


    const numAdult = booking.numAdult;
    const numChildren = booking.numChildren;
    const maxTicket = booking.detailInfo.maxTicket;
    const bookingId = booking._id;
    const detailId = booking.detailId;


    console.log('numAdult', numAdult);
    console.log('numChildren', numChildren);
    console.log('maxTicket', maxTicket);
    const ticker = maxTicket + ((numAdult || 0) + (numChildren || 0));
    console.log('ticker', ticker);
    console.log('bookingId', bookingId);
    console.log('detailId', detailId);


    const handleCancelPress = () => {
        Alert.alert(
            "Xác nhận hủy đơn hàng",
            "Bạn chắc chắn muốn hủy đơn hàng? Chỉ hoàn lại 80% số tiền.",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Đồng ý",
                    onPress: () => {
                        updateBookingStatus(bookingId, 'cancel');
                        updateMaxTicket(detailId, ticker);
                        navigation.navigate('MainTabNavigation');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Header title='Điều khoản hủy tour' />
            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Điều khoản hủy tour</Text>
                <Text style={styles.text}>
                    • Nếu bạn quyết định hủy tour trong vòng 24 giờ kể từ thời điểm đặt tour, chúng tôi cam kết hoàn lại 100% số tiền đã thanh toán. Điều này nhằm tạo sự linh hoạt và thuận tiện tối đa cho bạn khi có thay đổi đột xuất trong kế hoạch du lịch.
                </Text>
                <Text style={styles.text}>
                    • Nếu bạn hủy tour sau 3 ngày kể từ thời điểm đặt, chúng tôi sẽ hoàn lại 80% số tiền đã thanh toán. 20% số tiền còn lại sẽ được giữ lại để chi trả cho các chi phí đã phát sinh liên quan đến việc đặt trước dịch vụ.
                </Text>
                <Text style={styles.text}>
                    • Việc hủy tour trong vòng 5 ngày trước thời gian khởi hành sẽ không được hoàn lại, do các dịch vụ đã được đặt cọc và xác nhận với đối tác. Vui lòng cân nhắc kỹ trước khi đưa ra quyết định để tránh bất tiện.
                </Text>
                <Text style={styles.text}>
                    • Số tiền hoàn lại sẽ được xử lý và hoàn tất trong vòng 24 giờ kể từ thời điểm hủy. Chúng tôi sẽ thông báo qua email hoặc số điện thoại ngay khi thủ tục hoàn tiền hoàn tất.
                </Text>
                <Text style={styles.text}>
                    • Nếu bạn có bất kỳ câu hỏi nào liên quan đến chính sách này hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi. Chúng tôi sẵn sàng đồng hành và hỗ trợ bạn tìm giải pháp phù hợp nhất.
                </Text>
                <Text style={styles.text}>
                    • Xin cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi. Chúng tôi mong muốn được phục vụ bạn trong những chuyến du lịch tiếp theo!
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleCancelPress}>
                    <Text style={styles.buttonText}>Hủy đơn hàng</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default CancelOrderinfomation;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F4F8',
        flex: 1,
    },
    content: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#2C3E50',
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 15,
        color: '#34495E',
        lineHeight: 24,
        textAlign: 'justify',
    },
    button: {
        backgroundColor: '#E74C3C',
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 20,
        elevation: 3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
