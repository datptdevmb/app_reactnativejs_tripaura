
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import RegionCheckbox from './../../../../components/common/checkbox/RegionCheckbox';
import { mapdata, getColor } from '../../../../constants/data';

const VietnamMap = () => {
    const [selectedRegions, setSelectedRegions] = useState({});
    const [showCheckbox, setShowCheckbox] = useState(false);

    const toggleRegion = (id) => {
        setSelectedRegions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const handleUpdate = () => {
        console.log(selectedRegions);
    };

    return (
        <View style={styles.container}>
            <Svg height="500" width="300">
                {mapdata.map((region) => (
                    <Path
                        key={region.id}
                        d={region.path}
                        fill={selectedRegions[region.id] ? getColor(region.id) : '#BBBBBB'}
                    />
                ))}
            </Svg>

            {showCheckbox && (
                <ScrollView style={styles.checkboxContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.checkboxRow}>
                        {mapdata.map((region) => (
                            <View key={region.id} style={styles.checkboxItem}>
                                <RegionCheckbox
                                    region={region}
                                    isSelected={selectedRegions[region.id]}
                                    toggleRegion={toggleRegion}
                                />
                            </View>
                        ))}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Cập nhật</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setShowCheckbox(false)}>
                            <Text style={styles.buttonText}>Đóng cài đặt</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setShowCheckbox(!showCheckbox)}>
                    <Text style={styles.buttonText}>{showCheckbox}Mở cài đặt</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginTop: 10,
    },
    checkboxContainer: {
        position: 'absolute',
        height: '100%',
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        zIndex: 1,
        paddingVertical: 0,
    },
    checkboxRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    checkboxItem: {
        width: '48%',
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});


export default VietnamMap;
