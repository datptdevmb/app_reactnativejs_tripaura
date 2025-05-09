import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import Ic_star from "../../../assets/icons/Ic_star"
import { Rating } from 'react-native-ratings';
import formatDate from "../../../untils/formatDate";




function ReviewCard({ review }) {

    return (
        <>
            {
                review && <View
                    style={styles.container}>
                    <>
                        <View style={styles.flexRow}>
                            <Image
                                source={{uri:review.avatar}}
                                style={styles.image} />
                            <View style={styles.mr_start_12}>
                                <Text style={styles.lable}> {review.fullname}</Text>
                                <Text style={styles.subLable}>{formatDate(review.dayReview)}</Text>
                            </View>
                        </View>

                        <Rating
                            style={styles.rating}
                            ratingCount={review.rating}
                            startingValue={5}
                            imageSize={14} />

                        <Text style={styles.bodyText}> {review?.comment} </Text>
                    </>
                </View>
            }

        </>

    )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 131,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 8,
    },
    rating: {
        alignItems: 'flex-start',
        marginTop: 10
    },
    lable: {
        fontSize: 12,
        fontFamily: 'Poppins_Regular',
        color: '#38434A'
    },
    textDay: {
        fontSize: 13,
        color: '#7D848D'
    },
    flexRow: {
        flexDirection: "row"
    },
    mr_start_12: {
        marginStart: 12
    },
    bodyText: {
        marginTop: 8,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        fontFamily: 'Poppins_Regular',
        lineHeight: 20,
        letterSpacing: 0.035,
        color: '#0A0A0B'
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
})
export default ReviewCard