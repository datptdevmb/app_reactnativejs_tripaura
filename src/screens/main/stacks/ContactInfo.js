import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import InputComponent from '../../../components/common/input/InputCompoment';
import Lable from '../../../components/common/labelText';
import Button from '../../../components/common/button/Button';

const ContactInfo = ({ setContactInfo }) => {
    const [contactInfo, setContactInfoState] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (field, value) => {
        setContactInfoState((prevInfo) => ({
            ...prevInfo,
            [field]: value,
        }));
        setContactInfo({
            ...contactInfo,
            [field]: value,
        });
    };

    return (
        <View style={styles.container}>

            <Lable lable={'Thông tin liên lạc'} />
            <InputComponent
                style={styles.input}
                value={contactInfo.name}
                placeholder={'Họ và Tên'}
                onChangeText={(text) => handleChange("name", text)} />
            <InputComponent
                style={styles.input}
                value={contactInfo.email}
                placeholder={'Địa chỉ Email'}
                onChangeText={(text) => handleChange("email", text)} />
            <InputComponent
                style={styles.input}
                value={contactInfo.phone}
                placeholder={'Số điện thoại'}
                onChangeText={(text) => handleChange("phone", text)} />
            <Button
                label='Tải từ hồ sơ'
                style={styles.btn} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginTop: 6,
        flex: 1,
    },
    input: {
        height: 44,
        marginTop: 12,
    },
    btn: {
        backgroundColor: '#B0B0B0',
        marginTop: 10,
        height: 44,
        width: 90,
    },
});

export default ContactInfo;
