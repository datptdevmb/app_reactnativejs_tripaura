
import {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Button from '../button/Button';
import colors from '../../../constants/colors';
import IcLocate from '../../../assets/icons/Ic_locate';

function TourCardVetical({tour, onClick}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>

        <Image style={styles.image} source={{uri: tour?.image[0]}} />

        <View style={styles.mr_s_12}>
          <Text style={styles.textName}>{tour.tourName}</Text>
          <View style={styles.row}>
            <IcLocate />
            <Text style={styles.bodytext}>{tour?.destination}</Text>
          </View>
        </View>
      </View>


      <Button
        onPressed={onClick}
        styleText={styles.btntext}
        style={styles.btn}
        label="Xem"
      />
    </View>
  );
}
export default memo(TourCardVetical);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    width: '100%',
    height: 84,
  },
  image: {
    width: 81,
    height: 64,
    borderRadius: 8,
  },
  bodytext: {},
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iclocate: {},
  textName: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    color: '#171D19',
  },
  mr_s_12: {
    marginStart: 12,
  },
  btn: {
    backgroundColor: '#E6F1FD',
    width: 81,
    height: 64,
    marginStart: 55,
  },
  btntext: {
    color: colors.primary_200,
  },
});
