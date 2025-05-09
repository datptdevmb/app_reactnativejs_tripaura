
import {StyleSheet} from 'react-native';
import fontsize from '../../../../constants/fontsize';
import colors from '../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.onPrimary,
  },
  text: {
    fontSize: fontsize.xxl,
    lineHeight: 48,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
    marginVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  reviewItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 8,
  },
  fullname: {
    width: 200,
    height: 23,
    marginBottom: 50,
    fontSize: fontsize.md,
    fontWeight: '700',
    color: '#212121',
  },
  rating: {
    width: 120,
    height: 25,
    fontSize: fontsize.md,
    fontWeight: '600',
    color: '#ff9800',
    top: 25,
    Right: 120,
    position: 'absolute',
  },
  comment: {
    fontSize: fontsize.sm,
    color: '#2E2E2E',
    fontWeight: '400',
    letterSpacing: 0.4,
    marginTop: 4,
  },
  date: {
    fontSize: fontsize.xs,
    marginBottom: 50,
    color: '#757575',
    fontWeight: '400',
    textAlign: 'right',
  },
  imageListContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  reviewImage: {
    width: 97,
    height: 73,
    borderRadius: 8,
    marginRight: 8,
    margin: 0,
  },
  averageRating: {
    fontSize: 64,
    lineHeight: 70,
    fontWeight: '700',
    color: '#757575',
    textAlign: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    width: 20,
    height: 20,
    marginHorizontal: 2,
  },
  reviewCount: {
    fontSize: fontsize.lg,
    lineHeight: 27,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '700',
    color: '#B0B0B0',
  },
  userNameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: fontsize.md,
    color: '#555',
  },
  noReviewsText: {
    fontSize: fontsize.md,
    color: '#757575',
    textAlign: 'center',
    marginTop: 20,
  },
  containerHeader: {
    marginTop: 35,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  textRate: {
    fontSize: 40,
    textAlign: 'center',
    color: '#212121',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 120,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default styles;

