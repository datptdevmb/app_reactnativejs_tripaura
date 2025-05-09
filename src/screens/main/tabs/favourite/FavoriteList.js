
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CardFavorite from '../../../../components/common/card/CardFavorite';

const FavoriteList = ({ data, onToggleFavorite,navigation }) => {

  return (
    <View>
      <Text style={styles.title}>Yêu Thích</Text>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({ item }) => (
          <CardFavorite
            navigation={navigation}
            item={item}
            onToggleFavorite={() => onToggleFavorite(item.id)}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    marginTop: 12,
    fontSize: 28,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: 'black',
  },
});

export default FavoriteList;