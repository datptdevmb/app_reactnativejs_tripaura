import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fontsize from '../../constants/fontsize';

export const styles = StyleSheet.create({
  ActivityContai: {
    position: 'absolute',
    left:'50%',
    top:'50%',
    backgroundColor: 'transparent',
  },
  EmailButton: {
    backgroundColor: colors.vividOrange,
    marginTop: 83,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ đen
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  EmailLabel: {
    color: '#fff',
    fontSize: fontsize.md,
    fontWeight: '600',
  },
  PhoneButton: {
    backgroundColor: colors.onPrimary,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.Grey_200,
  },
  PhoneLabel: {
    color: '#212121',
    fontSize: 16,
    fontWeight: '600',
  },
  fbButton: {
    backgroundColor: '#0572E7',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  fbLabel: {
    color: '#FFFFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  ggButton: {
    backgroundColor: '#C9C9C9',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  ggLabel: {
    color: '#212121',
    fontSize: 16,
    fontWeight: '600',
  },
  mota: {
    marginLeft: 16,
    marginTop: 255,
    width: 348,
    height: 26,
    fontSize: 11,
    fontWeight: '400',
    color: '#C9C9C9',
    letterSpacing: 0.11,
  },
});
