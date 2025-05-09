import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TicketCounter from './TicketCounter';

const TicketSelector = ({
    adultPrice,
    childPrice,
    adultTickets,
    childTickets,
    onIncreaseAdult,
    onDecreaseAdult,
    onIncreaseChild,
    onDecreaseChild,
    maxTicket,
    minTicket,
}) => {
    return (
        <View>
            <Text style={style.text}>Chọn số lượng vé</Text>
            <TicketCounter
                label="Người lớn"
                age={'từ 10 tuổi trở  lên'}
                price={adultPrice}
                count={adultTickets}
                onIncrease={onIncreaseAdult}
                onDecrease={onDecreaseAdult}
            />
            <TicketCounter
                label="Trẻ em"
                age={'từ 3 đến dưới 10 tuổi'}
                price={childPrice}
                count={childTickets}
                onIncrease={onIncreaseChild}
                onDecrease={onDecreaseChild}
            />
        </View>
    )

}

const style = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Lato',
        color: '#494B4B'
    }
})

export default TicketSelector;

