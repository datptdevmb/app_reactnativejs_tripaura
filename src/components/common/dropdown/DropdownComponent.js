import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvinces } from './../../../redux/slices/cityprovince';
import { fetchDistricts } from './../../../redux/slices/district';
import stylesdown from './dropdownstyle';

const DropdownComponent = ({ selectedProvince: selectedProvinceProp, selectedDistrict: selectedDistrictProp, onProvinceSelect, onDistrictSelect }) => {
    const dispatch = useDispatch();
    const { provinces, loading: provincesLoading, error: provincesError } = useSelector((state) => state.provinces);
    const { districts = [], loading: districtsLoading, error: districtsError } = useSelector((state) => state.district);

    const [selectedProvince, setSelectedProvince] = useState(selectedProvinceProp);
    const [selectedDistrict, setSelectedDistrict] = useState(selectedDistrictProp);

    useEffect(() => {
        dispatch(fetchProvinces());
    }, [dispatch]);

    useEffect(() => {
        if (selectedProvince) dispatch(fetchDistricts(selectedProvince));
    }, [selectedProvince, dispatch]);

    useEffect(() => {
        if (selectedProvinceProp !== selectedProvince) {
            setSelectedProvince(selectedProvinceProp);
            setSelectedDistrict(null);
        }
    }, [selectedProvinceProp]);

    useEffect(() => setSelectedDistrict(selectedDistrictProp), [selectedDistrictProp]);

    const handleProvinceChange = (value) => {
        if (value !== selectedProvince) {
            setSelectedProvince(value);
            setSelectedDistrict(null);
            onProvinceSelect(value);
        }
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
        onDistrictSelect(value);
    };

    if (provincesLoading || districtsLoading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (provincesError || districtsError) Alert.alert("Lỗi", provincesError || districtsError);

    const items = provinces.map(({ name, code }) => ({ label: name, value: code }));
    const filteredDistricts = districts.filter(district => district.province_code === selectedProvince)
        .map(({ name, code }) => ({ label: name, value: code }));

    return (
        <View style={stylesdown.container}>
            <View style={stylesdown.containerpicker}>
                <Dropdown label="Chọn tỉnh" selectedValue={selectedProvince} onValueChange={handleProvinceChange} items={items} style={stylesdown.dropdown} />
                <Dropdown label="Chọn huyện" selectedValue={selectedDistrict} onValueChange={handleDistrictChange} items={filteredDistricts} enabled={!!selectedProvince} style={stylesdown.dropdown} />
            </View>
        </View>
    );
};

const Dropdown = ({ label, selectedValue, onValueChange, items, enabled = true, style }) => (
    <View style={[stylesdown.contentchon, style]}>
        <Text style={stylesdown.text}>{label}:</Text>
        <Picker style={stylesdown.picker} selectedValue={selectedValue} onValueChange={onValueChange} enabled={enabled}>
            <Picker.Item label={`${label.toLowerCase()}`} value={null} />
            {items.map(({ label, value }) => <Picker.Item key={value} label={label} value={value} />)}
        </Picker>
    </View>
);

export default DropdownComponent;
