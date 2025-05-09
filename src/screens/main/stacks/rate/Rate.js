
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Headercomponet from '../../../../components/common/header/Headercomponet';
import Icons from '../../../../constants/Icons';
import { fetchReviewsByTourId, LayDanhSachDanhGia } from '../../../../redux/slices/reviewTourducers';
import { Skeleton } from 'moti/skeleton';
import styles from './RateStyle';

const Rate = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { tourId } = route.params;
  const [review, setreview] = useState([])
  console.log('set review', review);


  const danhSachDanhGia = useSelector(
    state => state.reducer.reviews.reviewsData,
  );
  const trangThaiDanhGia = useSelector(
    state => state.reducer.reviews.reviewsStatus,
  );
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (Array.isArray(danhSachDanhGia)) {
      const sortedReview = [...danhSachDanhGia].sort((a, b) => new Date(b.dayReview) - new Date(a.dayReview));
      setreview(sortedReview);
    }
  }, [danhSachDanhGia]);

  useEffect(() => {
    if (tourId) {
      dispatch(fetchReviewsByTourId(tourId));
      console.log('dispatch', dispatch);
    }
    return () => setIsLoading(false);
  }, [dispatch, tourId]);

  const tinhTrungBinhSoSao = danhGia => {
    if (!Array.isArray(danhGia) || danhGia.length === 0) {
      return 0;
    }

    let tongSoSao = 0;
    let soDanhGia = danhGia.length;
    console.log('soDanhGia:', soDanhGia);

    for (let i = 0; i < soDanhGia; i++) {
      tongSoSao += danhGia[i].rating || 0;
    }
    console.log('tongSoSao:', tongSoSao);

    // Tính trung bình bằng cách chia tổng số sao cho số lượng đánh giá
    let trungBinhSoSao = tongSoSao / soDanhGia;
    console.log('trungBinhSoSao', trungBinhSoSao);

    // Làm tròn trung bình số sao tới 1 chữ số sau dấu phẩy
    return trungBinhSoSao.toFixed(1);
  };

  const trungBinhSoSao = tinhTrungBinhSoSao(danhSachDanhGia);
  const soNguoiDanhGia = danhSachDanhGia.length;

  const taoMangSoSao = trungBinh => {
    // Tính số sao đã đầy (số sao tròn)
    const soSaoToiDa = Math.floor(trungBinh);
    console.log('soSaoToiDa', soSaoToiDa);

    // Kiểm tra nếu có phần thập phân, thì thêm một sao bị tắt (disabled)
    // phép chia lấy phần dư)
    const soSaoBiTat = trungBinh % 1 !== 0 ? 1 : 0;
    console.log('soSaoBiTat', soSaoBiTat);

    // Tạo mảng sao, gồm sao đầy và sao bị tắt
    const mangSoSao = [];
    console.log('mangSoSao', mangSoSao);

    // Thêm các sao đầy
    for (let i = 0; i < soSaoToiDa; i++) {
      mangSoSao.push('filled');
    }

    // Thêm sao bị tắt nếu có phần thập phân
    if (soSaoBiTat === 1) {
      mangSoSao.push('disabled');
    }

    return mangSoSao;
  };

  const mangSoSao = taoMangSoSao(trungBinhSoSao);

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: item.avatar }}
          style={styles.avatar}
          onError={() => console.log('Error loading avatar')}
        />
        <View style={styles.userNameContainer}>
          <Text style={styles.fullname}>{item.fullname}</Text>
          <Text style={styles.rating}>Đánh giá: {item.rating} ⭐</Text>
          <Text style={styles.date}>
            {new Date(item.dayReview).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.ratingContainer}>
        <Text style={styles.comment}>{item.comment}</Text>
      </ScrollView>

      {item.image && item.image.length > 0 && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={item.image}
          renderItem={({ item: imageUrl }) => (
            <Image
              source={{ uri: imageUrl }}
              style={styles.reviewImage}
              onError={() => console.log('Error loading image')}
            />
          )}
          keyExtractor={(imageUrl, index) => index.toString()}
          horizontal
          contentContainerStyle={styles.imageListContainer}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Headercomponet
          leftIcon={Icons.ic_leftarrow}
          title={'Đánh giá'}
          onPressLeftIcon={() => navigation.goBack()}
        />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      ) : !Array.isArray(danhSachDanhGia) || danhSachDanhGia.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../../../../assets/icons/ic_Rate.png')}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>
            Chưa có đánh giá nào cho tour này!
          </Text>
        </View>
      ) : (
        <FlatList
          data={review}
          renderItem={renderReviewItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <View>
              <Text style={styles.textRate}>Đánh giá chung</Text>
              <Text style={styles.averageRating}>{trungBinhSoSao}</Text>

              <View style={styles.starContainer}>
                {mangSoSao.map((star, index) => (
                  <Image
                    key={index}
                    source={
                      star === 'filled' ? Icons.ic_star : Icons.ic_star_emty
                    }
                    style={styles.star}
                  />
                ))}
              </View>

              <Text style={styles.reviewCount}>
                Dựa trên {soNguoiDanhGia} đánh giá
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default Rate;

