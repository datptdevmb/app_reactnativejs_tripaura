import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IcleftArrow from '../../../assets/icons/Ic_leftArrow';

const Header = ({ title, onBackPress }) => {
    
    return (
        <View style={styles.container}>
            {/* Nút quay lại */}
            <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
                <IcleftArrow color='#8A8A8A' />
            </TouchableOpacity>

            {/* Tiêu đề nằm giữa */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>

            {/* Nút placeholder để cân bằng layout (nếu có thêm icon khác) */}
            <View style={styles.iconPlaceholder} />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Căn đều 2 bên
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomColor: '#8A8A8A',
        borderBottomWidth: 0.5,
        shadowColor: '#8A8A8A',
    },
    iconContainer: {
        padding: 8,
    },
    titleContainer: {
        flex: 1, // Để tiêu đề chiếm phần giữa
        alignItems: 'center', // Căn giữa theo chiều ngang
        justifyContent: 'center', // Căn giữa theo chiều dọc
    },
    title: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Lato',
        fontWeight: '700',
    },
    iconPlaceholder: {
        width: 32, // Giữ chỗ cho nút khác (nếu có), hoặc bạn có thể xóa đi nếu không cần
    },
});
