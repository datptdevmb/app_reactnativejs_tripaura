import { useNavigation } from "@react-navigation/native";
import { memo } from "react"
import { KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, StyleSheet, View, Keyboard } from "react-native"

const SearchView = () => {
    const navigation = useNavigation();
    const navigateToSearch = () => {
        navigation.navigate("SearchScreen"); 
    };


    return (
        <View>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>

                        <TextInput
                            style={styles.input}
                            placeholder="Nhập nội dung tìm kiếm..."
                            value={''}
                            onChangeText={() => { }}
                            onFocus={navigateToSearch}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16
    },
    inner: {
        width: '90%',
        paddingHorizontal: 14,
        overflow: 'hidden', // Đảm bảo phần tử con không tràn ra ngoài bo góc
        borderRadius: 14, // Đảm bảo border-radius áp dụng cho nội dung bên trong
        shadowColor: '#000', // Màu bóng
        shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
        shadowOpacity: 0.05, // Độ mờ của bóng
        shadowRadius: 1, // Bán kính bóng
        elevation: 2, // Đổ bóng trên Android
        backgroundColor: 'white',
    }
})

export default memo(SearchView)