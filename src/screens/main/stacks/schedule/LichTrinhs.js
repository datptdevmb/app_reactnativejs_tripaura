import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LayLichTrinhTheoUser} from '../../../../redux/slices/getLichTrinhUserSlice';
import colors from '../../../../constants/colors';

const LichTrinhs = props => {
  const {navigation} = props;
  const {lichTrinhByUserData, lichTrinhByUserStatus} = useSelector(
    state => state.reducer.lichTrinhByUser,
  );

  const dispatch = useDispatch();

  const userReducer = useSelector(state => state.reducer.auth);
  const user = userReducer.user;

  // Kiểm tra nếu chưa đăng nhập
  const userId = user?.user?._id;
  const [isRedirecting, setIsRedirecting] = useState(false); // State để kiểm tra trạng thái điều hướng

  useEffect(() => {
    if (!userId) {
      setIsRedirecting(true);
    } else {
      setIsRedirecting(false); // Đảm bảo thông báo không xuất hiện khi đã đăng nhập
      dispatch(LayLichTrinhTheoUser(userId));
    }
  }, [userId, dispatch, navigation]);

  const renderItem = ({item}) => {
    const imageSource = item?.locations?.[0]?.locations?.[0]?.images?.[0]
      ? {uri: item.locations[0].locations[0].images[0]}
      : require('../../../../assets/images/Ve.png'); // Fallback image

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Schduletour', {lichTrinhId: item._id})
          }>
          <View style={styles.headerItem}>
            <Image style={styles.avarta} source={{uri: user?.user?.avatar}} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                marginTop: 10,
                    marginLeft: 10,
              }}>
              {user?.user?.fullname}
            </Text>
          </View>
          <Image style={styles.imageItem} source={imageSource} />
          <Text style={{marginHorizontal: 16, fontSize: 14, fontWeight: '700'}}>
            {item?.locations?.length} ngày đi {item?.destination?.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          fontSize: 22,
          justifyContent: 'center',
          alignItems: 'center',
          height: 54,
          backgroundColor: 'white',
        }}>
        <Text>Lịch trình của tôi</Text>
      </View>
      <View style={styles.container}>
        <View style={{height: 24}}></View>

        {lichTrinhByUserStatus === 'loading' ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text>Đang tải dữ liệu...</Text>
          </View>
        ) : !userId ? (
          <View style={styles.emptyContainer}>
            <Text>Vui lòng đăng nhập để xem lịch trình của bạn.</Text>
          </View>
        ) : (
          <FlatList
            data={lichTrinhByUserData.data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Image
                  style={styles.imageItem}
                  source={require('../../../../assets/images/Ve.png')}
                />
                <Text>Bạn không có lịch trình</Text>
                <Text> tạo ngày thôi nào</Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
        )}

        {userId && (
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => navigation.navigate('Schedule')}>
            <Text style={{fontSize: 20, color: 'white'}}>+</Text>
          </TouchableOpacity>
        )}
        <View style={{height: 100}}/>
      </View>
      
    </View>
  );
};

export default LichTrinhs;

const styles = StyleSheet.create({
  avarta: {
    width: 44,
    height: 44,
    borderRadius: 44,
    borderWidth: 1,
  },
  headerItem: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  imageBtn: {
    width: 24,
    height: 24,
  },
  btnAdd: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary_500,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 120,
    right: 24,
  },
  imageItem: {
    marginHorizontal: 18,
    width: '90%',
    borderRadius: 6,
    height: 200,
    resizeMode: 'stretch',
    marginVertical: 16,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    paddingVertical: 16,
  },
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redirectText: {
    fontSize: 16,
    color: colors.primary_500,
    textAlign: 'center',
    position: 'absolute',
    top: 50,
    left: 50,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
