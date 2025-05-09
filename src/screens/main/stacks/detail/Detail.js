import {

	StatusBar,
	StyleSheet,
	Text,
	View,
	Animated,
	TouchableOpacity,
	NativeModules,
	useWindowDimensions,
	TouchableWithoutFeedback,
	Alert,
} from 'react-native';

const { ZaloPayModule } = NativeModules;

import React, { useEffect, useRef, useState } from 'react';
import { AnimatedScrollView } from '@kanelloc/react-native-animated-header-scroll-view';
import {
	clearTourData,
	decreaseAdultTicket,
	decreaseChildTicket,
	fetchTourById,
	increaseAdultTicket,
	increaseChildTicket,
	setSelectedDate,
} from '../../../../redux/slices/tour.slice';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from './ImageList';
import LocationInfo from './LocationInfo';
import Lable from '../../../../components/common/labelText';
import Button from '../../../../components/common/button/Button';
import LottieView from 'lottie-react-native';
import TopNav from './TopNav';
import Ic_x from '../../../../assets/icons/Ic_X';
import DepartureDateSelector from './DepartureDateSelector';
import TicketSelector from './TicketSelector';
import RefundPolicy from './RefundPolicy';
import formatCurrencyVND from '../../../../untils/formatCurrencyVND';
import ReviewList from './ReviewList';
import IcleftArrow from '../../../../assets/icons/Ic_leftArrow';
import Ic_ouFavorite from '../../../../assets/icons/ic_ouline_Favorite';
import IcFavorite from '../../../../assets/icons/bottom_tab/Ic_favorite';
import {
	KiemTraYeuThich,
	themXoaYeuThichTour,
} from '../../../../redux/slices/favouriteducers';
import Toast from '../../../../components/common/toast/Toast';
import { ROUTES } from '../../../../constants/routes';
import HTMLView from 'react-native-htmlview';
import Accordion from '../../../../components/common/accordion/accordion';
import { fetchReviewsByTourId } from '../../../../redux/slices/reviewTourducers';
import colors from '../../../../constants/colors';
import { useFocusEffect } from '@react-navigation/native';


const Detail = ({ navigation, route }) => {
	const { width } = useWindowDimensions();
	const { _id: tourId } = route.params;
	console.log(tourId)
	const dispatch = useDispatch();
	const [detailId, setDetailId] = useState(null);
	const {
		tourById,
		adultTickets,
		childTickets,
		totalPrice,
		adultPrice,
		childPrice,
		loading,
		selectedDate,
	} = useSelector(state => state.reducer.tour);
	const danhSachDanhGia = useSelector(
		state => state.reducer.reviews.reviewsData,
	);
	console.log('adultPrice', adultPrice);
	console.log('childPrice', childPrice);

	const { isTourFavorited, favoritesStatus, message } = useSelector(
		state => state.reducer.favorites,
	);
	const [currentImage, setCurrentImage] = useState(
		imges && imges.length > 0
			? imges[0]
			: 'https://bizflyportal.mediacdn.vn/bizflyportal/459/347/2020/06/02/17/37/70515910726734841.jpg',
	);
	const { user } = useSelector(state => state.reducer.auth);
	console.log('user........................................: ', user);

	const [showToast, setShowToast] = useState(false);

	const { imges, tourName, description, location, details } = tourById;


	const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
	const translateY = useRef(new Animated.Value(500)).current;
	const handleIncreaseAdult = () => dispatch(increaseAdultTicket());
	const handleIncreaseChild = () => dispatch(increaseChildTicket());
	const handleDecreaseAdult = () => dispatch(decreaseAdultTicket());
	const handleDecreaseChild = () => dispatch(decreaseChildTicket());
	const handleBack = () => navigation.goBack();

	const handleFavorite = () => {
		console.log(typeof (user))
		if (!user || !user.user || !user.user._id) {
			console.log('uid null hoặc user không hợp lệ');
			navigation.navigate('LoginRegisterScreen');
			return;
		} else {
			dispatch(
				themXoaYeuThichTour({
					userId: user.user._id,
					tourId,
				}),
			);
		}
		if (favoritesStatus === 'success') {
			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		}
	};

	const handelNavigateToOrder = () => {
		if (!user || !user.user || !user.user._id) {
			Alert.alert(
				'Thông báo',
				'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.',
				[
					{
						text: 'Đăng nhập',
						onPress: () => {
							navigation.navigate('LoginRegisterScreen');
						}
					},
					{
						text: 'Hủy',
						style: 'cancel'
					}
				]
			);
			return;
		}
		if (!selectedDate) {
			Alert.alert('Lỗi', 'Vui lòng chọn ngày khởi hành.');
			return;
		}
		if (adultTickets === 0 && childTickets === 0) {
			Alert.alert('Lỗi', 'Vui lòng chọn số lượng vé.');
			return;
		}
		navigation.navigate('Order', {
			detailId,
			adultPrice,
			childPrice,
		});
	};
	const handleNavigateToFavorite = () => {
		navigation.navigate('FavoriteList');
	};

	const handleDetailImage = () => {
		navigation.navigate('ImageDetail');
	};

	const handleNavigateToRate = () => {
		navigation.navigate('Rate', { tourId: tourId });
	};

	const handleImagePress = image => {
		setCurrentImage(image);
	};

	useEffect(() => {
		const loadData = async () => {
			try {
				await Promise.all([
					dispatch(fetchReviewsByTourId(tourId)),
					dispatch(fetchTourById({ tourId })),
					dispatch(KiemTraYeuThich({ userId: user.user._id, tourId })),
				]);
			} catch (err) {
				// console.error('Error fetching data:', err);
				throw err;
			}
		};
		loadData()
	}, [dispatch]);

	useEffect(() => {
		if (imges && imges.length > 0) {
			setCurrentImage(imges[0]);
		}
	}, [imges]);

	console.log('detail', detailId);

	const toggleBottomSheet = () => {
		setBottomSheetVisible(!bottomSheetVisible);
		Animated.timing(translateY, {
			toValue: bottomSheetVisible ? 500 : 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};

	return (
		<View style={styles.container}>
			{showToast &&
				favoritesStatus === 'success' && (
					<Toast onPress={handleNavigateToFavorite} message={message} />
				)}
			<TouchableOpacity onPress={handleBack} style={styles.btnBack}>
				<IcleftArrow />
			</TouchableOpacity>


			<TouchableOpacity onPress={handleFavorite} style={styles.btnFavorite}>
				{!isTourFavorited ? <Ic_ouFavorite /> : <IcFavorite color={'white'} />}
			</TouchableOpacity>


			<AnimatedScrollView
				TopNavBarComponent={tourName && <TopNav tourName={tourName} />}
				headerImage={
					!loading && imges
						? { uri: currentImage }
						: {
							uri: 'https://bizflyportal.mediacdn.vn/bizflyportal/459/347/2020/06/02/17/37/70515910726734841.jpg',
						}
				}
				imageStyle={{
					height: 243,
				}}
				showsVerticalScrollIndicator={false}
			>

				<TouchableOpacity
					onPress={handleDetailImage}
					style={{
						position: 'absolute',
						height: 243,
						top: 0,
						zIndex: 1,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.3)',
					}}
				/>

				<StatusBar translucent backgroundColor="transparent" />
				{loading && (
					<View style={styles.animatedHeaderLoading}>
						<LottieView
							source={require('../../../../assets/lottile/loading.json')}
							autoPlay
							loop
							style={styles.lottieAnimation}
						/>
					</View>
				)}

				{!loading && (
					<View>
						<ImageList handleImagePress={handleImagePress} dataimage={imges} />
						<View style={styles.tourInfor}>
							<Text style={styles.tourname}>{tourName}</Text>
							<LocationInfo location={location} />
							<View style={styles.divider} />
							<HTMLView
								value={description}
							/>
							<ReviewList
								onSeeMore={handleNavigateToRate}
								reviews={danhSachDanhGia} />
							<View style={styles.mrtop_12}>
								<Accordion
									title={"Những điều cần lưu ý"}
									children={
										<View>
											<Text> Xác nhận</Text>
											<Text>
												Hệ thống xác nhận ngay tức thời nếu không nhận được
												email phản hồi của hệ thống hãy liên hệ với chúng tôi
											</Text>
											<Text> Chính sách hủy</Text>
											<Text>
												Hoàn tiền nếu hủy trước khi tour khởi hành tối
												thiểu 48h
											</Text>

										</View>

									}
								/>
								<Accordion
									title={"Điều khoản chung"}
									children={
										<View>
											<Text> Xác nhận</Text>
											<Text>
												Hệ thống xác nhận ngay tức thời nếu không nhận được
												email phản hồi của hệ thống hãy liên hệ với chúng tôi
											</Text>
											<Text> Chính sách hủy</Text>
											<Text>
												Hoàn tiền nếu hủy trước khi tour khởi hành tối
												thiểu 48h
											</Text>

										</View>

									}
								/>
							</View>


						</View>

						<View style={{ height: 150 }}></View>
					</View>
				)}
			</AnimatedScrollView>

			{/* Button Bottom */}
			<View style={styles.btnContainer}>
				<View style={styles.price}>
					<Text style={styles.textprice}>Giá chỉ từ</Text>
					<Text style={styles.total}>{formatCurrencyVND(adultPrice)}</Text>
				</View>
				<Button
					style={styles.btn}
					label="Mua Ngay"
					onPress={toggleBottomSheet}
				/>
			</View>

			{/* Backdrop và Bottom Sheet */}
			{bottomSheetVisible && (
				<TouchableWithoutFeedback onPress={() => { }}>
					<View style={styles.backdrop}>
						<Animated.View
							style={[styles.bottomSheet, { transform: [{ translateY }] }]}>
							<View style={styles.InforContainer}>
								<TouchableOpacity>
									<Ic_x onPress={toggleBottomSheet} />
								</TouchableOpacity>
								<Text style={styles.tourname}>{tourName}</Text>
								<DepartureDateSelector
									onSelectDate={(date, id) => {
										dispatch(setSelectedDate(date)), setDetailId(id);
									}}
									selectedDate={selectedDate}
									data={details}
								/>
								<TicketSelector
									onIncreaseAdult={handleIncreaseAdult}
									onIncreaseChild={handleIncreaseChild}
									onDecreaseAdult={handleDecreaseAdult}
									onDecreaseChild={handleDecreaseChild}
									adultPrice={details?.[0]?.priceAdult || 0}
									childPrice={details?.[0]?.priceChildren || 0}
									childTickets={childTickets}
									adultTickets={adultTickets}
								/>

								<RefundPolicy />
							</View>

							<View style={styles.btnContainer}>
								<View style={styles.price}>
									<Text style={styles.textprice}>Giá chỉ từ</Text>
									<Text style={styles.total}>
										{formatCurrencyVND(totalPrice)}
									</Text>
								</View>
								<Button
									style={styles.btn}
									label="Mua Ngay"
									onPress={handelNavigateToOrder}
								/>
							</View>
						</Animated.View>
					</View>
				</TouchableWithoutFeedback>
			)}

		</View>
	);
};

export default Detail;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	animatedHeaderLoading: {
		backgroundColor: 'black',
		position: 'absolute',
		width: '100%',
		height: 243,
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	InforContainer: {
		padding: 16,
	},
	tourInfor: {
		paddingHorizontal: 16,
	},
	btnFavorite: {
		position: 'absolute',
		top: 40,
		zIndex: 2,
		right: 24,
	},
	btnBack: {
		position: 'absolute',
		top: 40,
		zIndex: 2,
		left: 24,
	},
	mrtop_12: {
		marginTop: 12,
	},
	tourname: {
		marginTop: 14,
		color: '#212121',
		fontSize: 18,
		lineHeight: 27,
		fontFamily: 'Poppins-Bold',
		fontStyle: 'normal',
		fontWeight: '700',
	},
	bodytext: {
		marginTop: 14,
		fontSize: 12,
		fontFamily: 'Poppins_Regular',
		lineHeight: 18,
		letterSpacing: 0.4,
		fontWeight: '400',
		color: '#494B4B',
	},
	lottieAnimation: {
		width: 100,
		zIndex: 3,
		height: 100,
	},
	btnContainer: {
		height: 100,
		justifyContent: 'center',
		width: '100%',
		position: 'absolute',
		bottom: 0,
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: -1 },
		shadowOpacity: 0.25,
		shadowRadius: 1,
		elevation: 30,
	},
	bottomSheet: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: 600,
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 5,
	},
	price: {
		position: 'absolute',
		left: 16,
	},
	textprice: {
		fontSize: 12,
		color: 'black',
		fontWeight: 'bold',
	},
	total: {
		fontSize: 16,
		color: '#2196F3',
	},
	btn: {
		width: 148,
		height: 44,
		backgroundColor: colors.primary_600,
		position: 'absolute',
		right: 16,
	},
	divider: {
		backgroundColor: '#ededed',
		width: '100%',
		height: 2,
		marginVertical: 10,
	},
	backdrop: {
		// ...StyleSheet.absoluteFillObject,
		// backgroundColor: 'rgba(0, 0, 0, 0.5)',
		// justifyContent: 'flex-end',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0, 0, 0, 0)',
		zIndex: 10, // Đảm bảo backdrop nằm trên nội dung khác
	},
});
