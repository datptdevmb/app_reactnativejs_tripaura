import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const DepartureDateSelector = ({ data, selectedDate, onSelectDate}) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };
  const [optionId, setOptionId] = useState()

  const renderDateItem = ({ item }) => {
    const startDate = new Date(item.startDay);
    const formattedDate = `${startDate.getDate()}/${startDate.getMonth() + 1}`;
    console.log('iteam ', item);
    return (
      <TouchableOpacity
        style={[
          styles.dateItem,
          selectedDate === item.startDay && styles.selectedDateItem,
        ]}
        onPress={() => {
          onSelectDate(item.startDay, item._id,item.minTicket,item.maxTicket); 
          setOptionId(item._id);
        }}
      >
        <Text
          style={[
            styles.dateText,
            selectedDate === item.startDay && styles.selectedDateText,
          ]}
        >
          {formattedDate}
        </Text>
      </TouchableOpacity>
    );
  };

  console.log("optionId",optionId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ngày khởi hành hiện có</Text>
      <FlatList
        data={showAll ? data : data?.slice(0, 4) || []}
        renderItem={renderDateItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {!showAll && data?.length > 4 && (
        <TouchableOpacity onPress={handleShowAll} style={styles.showAllButton}>
          <Text style={styles.showAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginBottom: 5,
    color: '#494B4B'
  },
  dateItem: {
    marginTop: 12,
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedDateItem: {
    borderColor: '#0572E7',
  },
  dateText: {
    color: '#333',
  },
  selectedDateText: {
    color: '#0572E7',
  },
  showAllButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  showAllText: {
    color: '#0572E7',
    fontWeight: 'bold',
  },
});

export default DepartureDateSelector;
