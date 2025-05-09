import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvinces } from './../../../redux/slices/cityprovince';
import { fetchDistricts } from './../../../redux/slices/district';
import stylesdown from './dropdownstyle';

const DropdownComponent = ({ selectedProvince: selectedProvinceProp, selectedDistrict: selectedDistrictProp, onProvinceSelect, onDistrictSelect }) => {
    const dispatch = useDispatch();
    const { provinces, loading: provincesLoading, error: provincesError } = useSelector((state) => state.reducer.provinces);
    const { districts, loading: districtsLoading, error: districtsError } = useSelector((state) => state.reducer.district);



    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);


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


        setSelectedProvince(value);
        setSelectedDistrict(null);
        onProvinceSelect(value);

    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
        onDistrictSelect(value);

    };

    const provinceItems = provinces.map(({ name, code }) => ({ label: name, value: code }));
    const districtItems = districts.filter(district => district.province_code === selectedProvince)
        .map(district => ({ label: district.name, value: district.code }));


    return (
        <View style={stylesdown.container}>
            <View style={stylesdown.containerpicker}>

                <Dropdown
                    label="Chọn tỉnh"
                    selectedValue={selectedProvince}
                    onValueChange={handleProvinceChange}
                    items={provinceItems.length > 0 ? provinceItems : [{ label: 'Không có tỉnh nào', value: null }]}
                    style={stylesdown.dropdown}
                />
                <Dropdown
                    label="Chọn huyện"
                    selectedValue={selectedDistrict}
                    onValueChange={handleDistrictChange}
                    items={districtItems.length > 0 ? districtItems : [{ label: 'Không có dữ liệu', value: null }]}
                    enabled={!!selectedProvince}
                    style={stylesdown.dropdown}
                />

            </View>
        </View>
    );
};

const Dropdown = ({ label, selectedValue, onValueChange, items, enabled = true, style }) => (
    <View style={[stylesdown.contentchon, style]}>
        <Text style={stylesdown.text}>{label}:</Text>

        <Picker
            style={stylesdown.picker}
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            enabled={enabled}
        >
            <Picker.Item label={`${label.toLowerCase()}`} value={null} />
            {items.map(({ label, value }) => (
                <Picker.Item key={value} label={label} value={value} />
            ))}

        </Picker>
    </View>
);

export default DropdownComponent;
