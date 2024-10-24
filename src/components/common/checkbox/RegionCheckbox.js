import React from 'react';
import { View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const RegionCheckbox = ({ region, isSelected, toggleRegion }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
                value={isSelected}
                onValueChange={() => toggleRegion(region.id)}
            />
            <Text>{region.name}</Text>
        </View>
    );
};

export default RegionCheckbox;
