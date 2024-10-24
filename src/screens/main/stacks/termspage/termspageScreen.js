import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import Headercomponet from '../../../../components/common/header/Headercomponet';
import stylesglobal from '../../../../constants/global';
import Icons from '../../../../constants/Icons';
import colors from '../../../../constants/colors';
import fontsize from '../../../../constants/fontsize';
import { AppContext } from '../../../AppContext';

const termspageScreen = (props) => {
    const { navigation } = props;

    const nhanBack = () => {
        navigation.goBack();
    };
    const [isChecked, setIsChecked] = useState(false)

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <ScrollView style={stylesglobal.container}>
            <Headercomponet
                leftIcon={Icons.ic_leftarrow}
                title={"Điều khoản sử dụng dịch vụ"}
                style={styles.header}
                onPressLeftIcon={nhanBack}
            />
            <View style={styles.avatarContainer}>
                <View style={styles.imageAvatar}>
                    <Image source={Icons.avatar} />
                    <TouchableOpacity style={styles.icCameraContainer}>
                        <Image source={Icons.ic_camera} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.txtName}>Phạm Thành Đạt</Text>
            </View>

            <View style={styles.underline} />
            <Text style={styles.textlabel}>
                1. Giới thiệu {'\n'}
                Chào mừng bạn đến với TRIPAURA. Ứng dụng này cung
                cấp dịch vụ đặt vé tour du lịch trực tuyến. Bằng
                cách sử dụng ứng dụng, bạn đồng ý tuân thủ các điều
                khoản này.
            </Text>
            <Text style={styles.textlabel}>
                2. Quyền và nghĩa vụ của người dùng{'\n'}
            </Text>
            <View style={styles.dotContainer}>
                <View style={styles.dot} />
                <Text style={styles.textlabel}>Quyền: Bạn có quyền truy cập và sử dụng dịch vụ để đặt vé tour theo các điều khoản đã quy định.</Text>
            </View>
            <View style={styles.dotContainer}>
                <View style={styles.dot} />
                <Text style={styles.textlabel}>Nghĩa vụ: Bạn cam kết cung cấp thông tin chính xác và cập nhật khi đăng ký và sử dụng dịch vụ.</Text>
            </View>
            <Text style={styles.textlabel}>
                3. Đặt vé và thanh toán{'\n'}
            </Text>
            <View style={styles.dotContainer}>
                <View style={styles.dot} />
                <Text style={styles.textlabel}>Bạn có thể đặt vé tour thông qua ứng dụng. Mọi đơn đặt sẽ được xác nhận qua email hoặc tin nhắn.</Text>
            </View>
            <View style={styles.dotContainer}>
                <View style={styles.dot} />
                <Text style={styles.textlabel}>Phí dịch vụ có thể áp dụng. Bạn phải thanh toán đầy đủ theo các phương thức được hỗ trợ.</Text>
            </View>
            <Text style={styles.textlabel}>
                3. Đặt vé và thanh toán Bạn có thể đặt vé tour thông qua ứng dụng.
                Mọi đơn đặt sẽ được xác nhận qua email hoặc tin nhắn. Phí dịch vụ có thể áp dụng.
                Bạn phải thanh toán đầy đủ theo các phương thức được hỗ trợ.
                {'\n'}4. Chính sách bảo mật Chúng tôi cam kết bảo vệ thông tin cá
                nhân của bạn theo chính sách bảo mật. Thông tin
                của bạn sẽ không được chia sẻ với bên thứ ba mà không có sự đồng ý.
                {'\n'}5. Quyền sở hữu trítuệ Tất cả nội dung trong ứng dụng, bao gồm văn bản, hình ảnh
                và phần mềm, đều thuộc quyềnsở hữu trí tuệ của TRIPAURA và được bảo vệ bởi luật bản quyền.
                {'\n'}6. Giới hạn trách nhiệm Chúng
                tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ việc sử dụng dịch vụ, bao gồm
                nhưng không giới hạn ở việc hủy tour, thay đổi lịch trình, hoặc mất vé.
                {'\n'}7. Chấm dứt dịch vụ Chúng tôi
                có quyền chấm dứt hoặc tạm ngưng dịch vụ mà không cần thông báo trước nếu phát hiện hành vi vi phạm các
                khoản này.
                {'\n'}8. Điều khoản sửa đổi Chúng tôi có quyền sửa đổi các điều khoản này. Mọi thay đổi sẽ được thông
                báo qua ứng dụng hoặc email.
                {'\n'}9. Luật áp dụng Các điều khoản này được điều chỉnh bởi luật pháp của Việt Nam.
                Mọi tranh chấp sẽ được giải quyết tại tòa án có thẩm quyền.
            </Text>
            <View style={styles.containercheck}>
                <TouchableOpacity onPress={toggleCheckbox} style={[styles.checkbox, isChecked && styles.checked]}>
                    {isChecked && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <Text style={styles.text}>Đồng ý với điều khoản sử dụng.</Text>
            </View>
        </ScrollView>
    );
};

export default termspageScreen;

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    ttlhContainer: {
        width: '100%',
        marginTop: 24,
    },
    icon: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        tintColor: colors.Grey_300,
    },
    txtContent: {
        width: 250,
        fontFamily: 'Lato',
        fontSize: fontsize.md,
        fontWeight: '400',
        lineHeight: 24,
        color: colors.Steelblue,
        marginLeft: 4
    },
    txtTitle: {
        fontFamily: 'Lato',
        fontSize: fontsize.md,
        fontWeight: '400',
        lineHeight: 24,
        color: colors.Semi_transparentGray,
        marginLeft: 16
    },
    itemProfile: {
        height: 32,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Lato',
        fontSize: fontsize.md,
        fontWeight: '700',
        lineHeight: 24,
        textTransform: 'uppercase',
        color: colors.Grey_900,
        marginBottom: 5
    },
    gioiThieuContainer: {
        width: '100%',
        marginTop: 18
    },
    underline: {
        width: '100%',
        height: 1,
        backgroundColor: colors.Grey_500,
        marginTop: 16,
    },
    dotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#000',
        marginRight: 8,
    },
    textlabel: {
        fontSize: fontsize.md,
        fontWeight: '400',
        lineHeight: 24,
        color: '#000',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderColor: '#007BFF', 
        borderWidth: 2,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', 
    },
    checked: {
        backgroundColor: '#007BFF', 
    },
    checkmark: {
        color: '#FFFFFF', 
        fontSize: 16,
    },
    text: {
        marginLeft: 8,
        fontSize: 16,
    },
    containercheck: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        marginTop:10,
    },
    txtName: {
        color: '#212121',
        fontFamily: 'Lato',
        fontSize: fontsize.md,
        fontWeight: '700',
        lineHeight: 27
      },
      avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 11
      },
      icCameraContainer: {
        width: 28,
        height: 28,
        backgroundColor: colors.primary_500,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        bottom: 0
      },
});
