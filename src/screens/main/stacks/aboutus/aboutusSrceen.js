import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import Headercomponet from '../../../../components/common/header/Headercomponet';
import stylesglobal from '../../../../constants/global';
import Icons from '../../../../constants/Icons';
import colors from '../../../../constants/colors';
import fontsize from '../../../../constants/fontsize';
import { AppContext } from '../../../AppContext';

const aboutusSrceen = (props) => {
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
                title={"Về Tripaura"}
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
                Chào mừng bạn đến với TRIPAURA!{'\n'}
                Chúng tôi là TRIPAURA, một công ty chuyên cung cấp dịch vụ đặt vé tour du lịch trực tuyến. Với sứ mệnh mang đến cho bạn những trải nghiệm du lịch tuyệt vời nhất, chúng tôi cam kết cung cấp các tour đa dạng, từ khám phá thiên nhiên hùng vĩ đến văn hóa đặc sắc của các địa phương.
                {'\n'}Đội Ngũ Chuyên Nghiệp
                {'\n'}Đội ngũ của chúng tôi bao gồm những chuyên gia giàu kinh nghiệm trong ngành du lịch, luôn sẵn sàng hỗ trợ bạn trong mọi bước đi của hành trình. Chúng tôi hiểu rằng mỗi chuyến đi đều mang ý nghĩa riêng, và chúng tôi ở đây để giúp bạn biến những ước mơ du lịch thành hiện thực.
                {'\n'}Dịch Vụ Đa Dạng
                {'\n'}Chúng tôi cung cấp một loạt các tour du lịch từ [liệt kê một số loại hình tour như tour khám phá, tour ẩm thực, tour mạo hiểm, v.v.], đáp ứng nhu cầu của tất cả các khách hàng. Tất cả các tour đều được thiết kế tỉ mỉ, đảm bảo an toàn và trải nghiệm thú vị.
                {'\n'}Cam Kết Chất Lượng
                {'\n'}Chúng tôi cam kết mang đến dịch vụ khách hàng tốt nhất, với chính sách hoàn tiền rõ ràng và hỗ trợ 24/7. Đội ngũ của chúng tôi luôn lắng nghe và sẵn sàng giải đáp mọi thắc mắc để bạn có thể yên tâm tận hưởng chuyến đi của mình.
                Hãy cùng chúng tôi khám phá thế giới! Để biết thêm mọi thứ tuyệt vời thú vị đang diễn ra trên

            </Text>

        </ScrollView>
    );
};

export default aboutusSrceen;

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
        marginTop: 10,
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
