import { memo } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import IcVoucher from "../../../assets/icons/bottom_tab/Ic_voucher";
import formatCurrencyVND from "../../../untils/formatCurrencyVND";


const SelecVoucher = ({
    onPress, discount
}
) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.flexRow, styles.backgroundColor]}
        >
            <View style={styles.flexRow}>
                <IcVoucher fill="blue" />
                <Text style={styles.text}>Áp dụng khuyến mãi</Text>
            </View>

            {discount && <Text>{formatCurrencyVND(discount)}</Text>}
        </TouchableOpacity>
    )
}

export default memo(SelecVoucher);

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        marginTop: 2,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backgroundColor: {
        backgroundColor: 'white',
        padding: 12
    },
    text: {
        marginStart: 12
    }
})