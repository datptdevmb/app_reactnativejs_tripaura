import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import stylesglobal from '../../../../constants/global'
import Headercomponet from '../../../../components/common/header/Headercomponet'
import Icons from '../../../../constants/Icons'
import colors from '../../../../constants/colors'
import ButtonHelp from '../../../../components/common/button/ButtonHelp'
import { helpcenterdata } from '../../../../constants/data'

const HelpCenter = () => {
    const nhanBack = () => {
        navigation.goBack()
    }
    return (
        <View style={stylesglobal.container}>
            <Headercomponet
                leftIcon={Icons.ic_leftarrow}
                title={"Câu Hỏi Thường Gặp"}
                style={styles.header}
                onPressLeftIcon={nhanBack}
            />
            <View style={{ width: '100%', height: 2, backgroundColor: colors.LightGray, marginTop: 10, marginBottom: 22 }} />
            {helpcenterdata.map((item, index) => {
                return (
                    <ButtonHelp
                        key={index}
                        title={item.title}
                        iconSource={item.iconSource}
                    />
                )
            })}
        </View>
    )
}

export default HelpCenter

const styles = StyleSheet.create({})