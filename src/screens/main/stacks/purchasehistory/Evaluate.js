import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, ScrollView, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icons from '../../../../constants/Icons';
import Header from '../../../../components/common/header/Header';
import { fetchBookingById } from '../../../../redux/slices/booking.slice';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../../../redux/slices/reviewTourducers';

const Evaluate = ({ route,navigation }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]);
    const { bookingId } = route.params;
    const dispatch = useDispatch();
    console.log('bookingId', bookingId);
    const bookingData = useSelector((state) => state.reducer.booking);
    const booking = bookingData?.bookingData?.data;
    console.log('booking', booking);
    const userReducer = useSelector(state => state.reducer.auth);
    const user = userReducer.user;
    console.log('user: ', user);
    const userId = user.user._id
    console.log('userId', userId);
    const tourId = booking?.detailInfo?.tourId;
    console.log('tourId', tourId);
    const [loadingImages, setLoadingImages] = useState([]);
    
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        if (bookingId) {
            dispatch(fetchBookingById(bookingId));
        }
    }, [dispatch, bookingId]); 

    const handleAddImages = () => {
        launchImageLibrary(
            { mediaType: 'photo', selectionLimit: 0 },
            (response) => {
                if (response.didCancel) {
                } else if (response.errorCode) {
                } else {
                    response.assets.forEach(asset => {
                        handleUpdate(asset);
                    });
                }
            }
        );
    };
    const handleUpdate = async (image) => {
        if (!user) {
            return;
        }

        const data = new FormData();
        data.append('file', {
            uri: image.uri,
            type: image.type || 'image/jpeg',
            name: `photo.${image.uri.split('.').pop()}`,
        });
        data.append('upload_preset', 'TripAuraAPI');
        data.append('api_key', '976765598717887');

        try {
            setLoadingImages(prev => [...prev, image.uri]);

            const response = await fetch(`https://api.cloudinary.com/v1_1/dtoazwcfd/upload`, {
                method: 'POST',
                body: data,
            });

            const result = await response.json();
            if (response.ok) {
                const imageUrl = result.secure_url;
                setImages(prevImages => [...prevImages, imageUrl]);
            } else {
                Alert.alert('Lỗi', 'Không thể tải lên hình ảnh');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải lên hình ảnh');
            console.error(error);
        } finally {
            setLoadingImages(prev => prev.filter(uri => uri !== image.uri));
        }
    };

    const handleSubmit = async () => {
        if (!userId || !tourId || !rating || !comment || !images) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin trước khi gửi đánh giá.');
            return;
        }

        const reviewData = {
            userId,
            tourId,
            rating,
            comment,
            dayReview: new Date().toISOString(),
            image: images,
        };

        try {

            const result = dispatch(addReview(reviewData));
            console.log('result', result);
            if (!result) {
                Alert.alert('Loi', 'Đánh giá thất bại');

                return;
            } else {
                Alert.alert('Thành công', 'Đánh giá thành công');
                navigation.goBack();
            }
        } catch (error) {
           
        }
        console.log('Dữ liệu đánh giá:', { rating, comment, images });
    };




    const handleStarPress = (index) => {
        setRating(index + 1);
    };

    const image = booking?.tourImages?.[0]?.linkImage?.[0];
    console.log('image', image);

    const formattedDate = new Date(booking?.detailInfo?.endDay).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <Header title='Đánh giá Tour' />
                    <View style={styles.container}>
                        <View style={styles.containerHeader}>
                            <Text style={styles.label}>Tên Tour: {booking?.tourInfo?.tourName}</Text>
                            <Text style={styles.label}>Ngày đi: {formattedDate}</Text>
                            <Text style={styles.label}>Số người: {booking?.numAdult + booking?.numChildren}</Text>
                        </View>
                        <Image source={{ uri: image }} style={styles.imagetour} />
                        <Text style={styles.label}>Đánh giá (1-5 sao):</Text>
                        <View style={styles.starContainer}>
                            {[...Array(5)].map((_, index) => (
                                <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                                    <Text style={[styles.star, rating > index && styles.selectedStar]}>★</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.label}>Bình luận:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập bình luận"
                            multiline
                            value={comment}
                            onChangeText={setComment}
                            placeholderTextColor="#aaa"
                        />

                        <Text style={styles.label}>Thêm ảnh (tùy chọn):</Text>
                        <View style={styles.containerImagevideo}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                                {(images.length === 0 || loadingImages.length > 0) && (
                                    <TouchableOpacity
                                        onPress={handleAddImages}
                                        style={[styles.image, { width: screenWidth * 0.28, marginRight: 10, marginLeft: images.length > 0 ? 'auto' : 0 }]}
                                    >
                                        {loadingImages.length > 0 ? (
                                            <ActivityIndicator size="small" color="#4CAF50" style={styles.loadingIndicator} />
                                        ) : (
                                            <Text style={styles.imageButtonText}>Chọn ảnh</Text>
                                        )}
                                    </TouchableOpacity>
                                )}
                                <FlatList
                                    data={images}
                                    renderItem={({ item }) => (
                                        <View style={[styles.imageContainer, { width: screenWidth * 0.28 }]}>
                                            {loadingImages.includes(item) ? (
                                                <ActivityIndicator size="small" color="#4CAF50" style={styles.loadingIndicator} />
                                            ) : (
                                                <Image source={{ uri: item }} style={[styles.image, { width: screenWidth * 0.28 }]} />
                                            )}
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={3}
                                    columnWrapperStyle={styles.columnWrapper}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
            keyExtractor={() => 'header'}
        />
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    container: {
        padding: 15,
    },
    containerHeader: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    imagetour: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 20,
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,

    },
    star: {
        fontSize: 35,
        color: '#ccc',
        padding: 10,
    },
    selectedStar: {
        color: '#ffcc00',
    },
    input: {
        borderWidth: 1,
        borderColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        marginBottom: 18,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        elevation: 2,
    },
    containerImagevideo: {
        marginBottom: 20,
    },
    image: {
        height: 120,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        backgroundColor: '#33CCFF',
        paddingVertical: 18,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    imageButton: {
        backgroundColor: '#00FFFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        width: '45%',
        marginHorizontal: 10,
        elevation: 4,
    },
    imageButtonText: {
        color: '#000',
        fontSize: 16,

    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});

export default Evaluate;
