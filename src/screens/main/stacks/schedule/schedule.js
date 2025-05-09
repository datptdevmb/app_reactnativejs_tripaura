import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, Switch, ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Thư viện picker
import Header from '../../../../components/common/header/Header';
import Button from '../../../../components/common/button/Button';
import Icons from '../../../../constants/Icons';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createSchedules } from '../../../../redux/slices/schemal.slice';

const Schedule = ({ navigation }) => {
    const dispatch = useDispatch()
    const [departure, setDeparture] = useState('Hồ Chí Minh');
    const { Schedules } = useSelector(state => state.reducer.schemal);
    const [destination, setDestination] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [startDay, setStartDate] = useState('');
    const [endDay, setEndDate] = useState('');
    const [person, setPeople] = useState(1);
    const [isPublic, setIsPublic] = useState(true);
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectingEndDate, setSelectingEndDate] = useState(false);
    const userReducer = useSelector(state => state.reducer.auth);
    const user = userReducer.user;
    // console.log('user: ', user);
    const userId = user.user._id

    // Gọi API lấy danh sách điểm đến
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch('https://trip-aura-server.vercel.app/tinh/api/getAll');
                const data = await response.json();
                setDestinations(data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                setIsLoading(false);
            }
        };

        fetchDestinations();
    }, []);


    const handleCalendarToggle = (isEndDate) => {
        setSelectingEndDate(isEndDate);
        setCalendarVisible(true);
    };

    const handleDayPress = (day) => {
        if (selectingEndDate) {
            setEndDate(day.dateString);
        } else {
            setStartDate(day.dateString);
        }
        setCalendarVisible(false);
    };


    const handleSubmit = async () => {
        if (departure == '' ||
            destination == '' ||
            endDay == '' ||
            person == '' ||
            startDay == '' ||
            userId == '') {
            ToastAndroid.show("Bạn cần nhập đầy đủ thông tin", ToastAndroid.SHORT)
        } else {
            dispatch(createSchedules({ departure, destination, endDay, person, startDay, userId }))
            navigation.navigate('Schduletour', { lichTrinhId: Schedules._id });

        }
    };
    useEffect(() => {
        if (Schedules && Schedules._id) {
            console.log("=============== id", Schedules._id);
        }
    }, [Schedules, Schedules._id]);

    return (
        <ScrollView style={styles.container}>
            <Header title="Lên lịch trình" onBackPress={
                () => {
                    navigation.goBack();
                }
            } />

            <View style={styles.inputContainer}>
                <View style={styles.row}>
                    <Image source={Icons.gps} style={styles.icon} />
                    <View style={styles.containerinput}>
                        <Text>Điểm xuất phát</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Điểm xuất phát"
                            value={departure}
                            onChangeText={setDeparture}
                        />
                    </View>

                </View>

                <View style={styles.row}>
                    <Image source={Icons.location} style={styles.icon} />

                    <View style={{ flex: 1 }}>
                        <Text>Điểm đến:</Text>
                        <Picker
                            selectedValue={destination}
                            onValueChange={(itemValue) => {
                                console.log(itemValue);
                                setDestination(itemValue);
                            }}
                            style={styles.picker}
                        >
                            <Picker.Item label="Chọn điểm đến" value="" />
                            {destinations.map((item, index) => (
                                <Picker.Item key={index} label={item.name} value={item._id} />
                            ))}
                        </Picker>
                        <View style={styles.separator} />
                    </View>

                </View>


                <View style={styles.row}>
                    <Image source={Icons.calendar} style={styles.icon} />
                    <View style={{ flex: 1 }}>
                        <Text>Ngày khởi hành</Text>
                        <TouchableOpacity style={styles.dateInput} onPress={() => handleCalendarToggle(false)}>
                            <Text style={styles.dateText}>{startDay || ''}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginStart: 10 }}>
                        <Text>Ngày về</Text>
                        <TouchableOpacity style={styles.dateInput} onPress={() => handleCalendarToggle(true)}>
                            <Text style={styles.dateText}>{endDay || ''}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {isCalendarVisible && (
                    <Calendar
                        onDayPress={handleDayPress}
                        minDate={selectingEndDate ? startDay : new Date().toISOString().split('T')[0]}
                        markedDates={{
                            [startDay]: { selected: true, marked: true, selectedColor: '#0572E7' },
                            [endDay]: { selected: true, marked: true, selectedColor: '#0572E7' },
                        }}
                    />
                )}
                
                <View style={styles.row}>
                    <Image source={Icons.user} style={styles.icon} />
                    <View style={styles.containerinput}>
                        <Text>Chọn số người</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Số người"
                            keyboardType="numeric"
                            value={String(person)}
                            onChangeText={(text) => setPeople(Number(text))}
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <Image source={Icons.padlock} style={styles.icon} />
                    <Text style={styles.publicText}>Công khai</Text>
                    <Switch value={isPublic} onValueChange={setIsPublic} />
                </View>

                <View style={styles.button}>
                    <Button label="Lên lịch trình" onPress={handleSubmit} />
                </View>
            </View>
        </ScrollView>
    );
};

export default Schedule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
    inputContainer: {
        padding: 16,
    },
    containerinput: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingVertical: 8,
        fontSize: 16,
    },
    picker: {
        flex: 1,
        color: 'black',
    },
    dateInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingVertical: 8,
    },
    dateText: {
        fontSize: 15,
        color: 'gray',
    },
    publicText: {
        flex: 1,
        fontSize: 16,
    },
    button: {
        marginTop: 30,
    },
});
