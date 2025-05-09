import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  favoriteIcon: {
    position: 'absolute',
    top: 0,
    left: 350,
    borderRadius: 25,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  texty: {
    marginTop: 20,
    fontSize: 36,
    fontWeight: '700',
    color: '#212121',
    lineHeight: 48,
    marginStart: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  textt: {
    marginTop: 30,
    color: '#212121',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    // backgroundColor: 'blue',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 1,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 160,
    height: 120,
    borderRadius: 10,
  },
  name: {
    marginTop: 16, // Tăng khoảng cách từ trên
    marginBottom: 8, // Tạo khoảng cách từ dưới
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    width: 180,
  },

  day: {
    marginTop: 2,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#8A8A8A',
  },
  price: {
    marginTop: 3,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#DA712F',
  },
  centeredContainer: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
