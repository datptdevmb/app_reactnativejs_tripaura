import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import FONTSIZE from '../../../constants/fontsize';

const stylesdown = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerpicker: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    contentchon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        width: 159,
        height: 44,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },
    text: {
        fontSize: FONTSIZE.sm,
        fontWeight: '700',
        fontFamily: 'Lato',
        color: colors.Grey_800,
        marginBottom: 5,
    },
    dropdown: {
        marginEnd: 10, 
    },
});
  
  export default stylesdown;