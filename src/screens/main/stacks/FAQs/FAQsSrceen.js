import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import stylesglobal from '../../../../constants/global'
import Headercomponet from '../../../../components/common/header/Headercomponet'
import Icons from '../../../../constants/Icons'
import colors from '../../../../constants/colors'
import Accordion from '../../../../components/common/accordion/accordion'
import { accordionData } from '../../../../constants/data'

const FAQsSrceen = () => {
    const nhanBack = () => {
        navigation.goBack()
    }
    return (
        <ScrollView style={stylesglobal.container}>
            <Headercomponet
                leftIcon={Icons.ic_leftarrow}
                title={"Câu Hỏi Thường Gặp"}
                style={styles.header}
                onPressLeftIcon={nhanBack}
            />
            <View style={{ width: '100%', height: 2, backgroundColor: colors.LightGray, marginTop: 10 }} />
       
            {accordionData.map((item, index) => (
                <Accordion 
                    key={index} 
                    title={item.title} 
                    sections={item.sections} 
                />
            ))}
        </ScrollView>
    )
}

export default FAQsSrceen

const styles = StyleSheet.create({})