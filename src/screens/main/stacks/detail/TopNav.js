import { StyleSheet, Text, View } from "react-native"
import Ic_ouFavorite from "../../../../assets/icons/ic_ouline_Favorite"
import IcleftArrow from "../../../../assets/icons/Ic_leftArrow"
import colors from "../../../../constants/colors"

const TopNav = ({ tourName }) => {

    return (
        <View style={styles.navBar}>
            {/* <IcleftArrow style={styles.IcBack} /> */}
            <View style={styles.IcBack}></View>
            <Text style={styles.titleName}>
                {tourName.length > 25
                    ? tourName.substring(0, 25) + '...'
                    : tourName}
            </Text>
            <View style={styles.IcFavorite}></View>
           
        </View>
    )
}

export default TopNav
// '#2196F3'
const styles = StyleSheet.create({
    navBar: {
        backgroundColor:colors.primary_600,
        width: '100%',
        position:'absolute',
        flexDirection:'row',
        paddingTop:10,
        height: 100,
        paddingHorizontal:16,
        alignItems:'center',
        justifyContent:"space-between"
    },
    titleName: {
		fontSize: 16,
		color: 'white',
		// position: 'absolute',
		// top: 28,
		// left: 70
	},
    IcFavorite: {
        width: 18,
		height: 18,
		// top: 28,
		// position: 'absolute',
		// right: 16
	},
    IcBack: {
		width: 18,
		height: 18,
		// position: 'absolute',
		// top: 28,
		// left: 16
	},
})