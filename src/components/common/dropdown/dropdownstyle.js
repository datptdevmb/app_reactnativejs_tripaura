import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import FONTSIZE from '../../../constants/fontsize';

const stylesdown = StyleSheet.create({
    container: {
        // width: '100%',
        // height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerpicker: {
        display: 'flex',
        flexDirection: 'row'
    },
    contentchon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        width: 159,
        height: 44,
        paddingVertical: 11,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },
    text: {
        fontSize: FONTSIZE.sm,
        fontWeight: '700',
        fontFamily: 'Lato',
        color: colors.Gray_800,
        marginBottom: 5,
    },
});
  
  export default stylesdown;