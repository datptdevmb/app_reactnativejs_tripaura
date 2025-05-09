import { StyleSheet } from 'react-native';
import colors from '../../../../constants/colors';
import fontsize from '../../../../constants/fontsize';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#006FFD',
    fontSize: 12,
    fontWeight: '600',
  },
  headerTextLoc: {
    color: '#1f2024',
    fontSize: 24,
    fontWeight: '700',
  },
  dropdownContainer: {
    height: 50,
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  dropdownList: {
    maxHeight: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#006FFD',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 16,
    height: 16,
  },
  containerbuttonFilter: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewMargin: {
    height: 80
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image_back: {
    width: 20,
    height: 20,
    marginTop: 10,
    padding: 1,
  },
  image_filter: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  inputSreach: {
    width: 280,
    height: 44,
    backgroundColor: '#F8F9FE',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    marginTop: 10,
    marginLeft: 10,
  },
  image_clear: {
    width: 10,
    height: 10,
    color: 'black',
    marginLeft: -44,
    marginTop: 10,
  },
  textSreach: {
    width: '100%',
    height: 32,
    fontSize: 14,
    fontWeight: '700',
    color: '#757575',
    textAlign: 'center',
    marginTop: 73,
  },
  tile: {
    height: 20,
    fontSize: 16,
    fontWeight: '700',
    color: '#1d192b',
    marginTop: 58,
    marginBottom: 24
  },
  itemContainer: {
    height: 240,
    backgroundColor: '#F8F9FE',
    borderRadius: 10,
    marginBottom: 20
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemName: {
    height: 40,
    fontSize: fontsize.sm,
    color: '#4D4D4D',
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    fontWeight: '700',
  },
  itemPrice: {
    fontSize: fontsize.sm,
    color: '#0572E7',
    fontWeight: '700',
    marginLeft: 16,
    marginRight: 16,
  },
  itemDay: {
    fontSize: fontsize.fm,
    color: '#757575',
    marginLeft: 8,
    marginRight: 16,
    fontWeight: '700',
  },
  row: {
    justifyContent: 'space-between',
  },
});
