import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageSourcePropType,
  ImageBackground,
} from 'react-native';
import React, {PureComponent} from 'react';
import {searchItemProps} from '../navigations/types';
import CustomButton from './CustomButton';
import CustomImage from './CustomImage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
type searchItemSpecificProps = {
  item: searchItemProps;
  active_heart: ImageSourcePropType;
  in_active_heart: ImageSourcePropType;
  star_img: ImageSourcePropType;
};

class SearchItem extends PureComponent<searchItemSpecificProps> {
  constructor(props: searchItemSpecificProps) {
    super(props);
    this.state = {
      isFav: props?.item?.addedToFavorites,
    };
  }
  render() {
    // console.log('searchItemComponent');
    const {item, active_heart, in_active_heart, star_img} = this.props;
    const starsArray = item?.stars
      ? Array(Number(item?.stars)).fill(0)
      : [0, 0, 0, 0, 0];
    return (
      <View style={styles.itemContainer} key={item.index}>
        <ImageBackground
          // source={item?.img}
          source={{uri: String(item?.img)}}
          style={styles.backgroundImgView}>
          {item?.percentage ? (
            <View style={styles.percentageView}>
              <Text style={styles.percentageText}>
                {item?.percentage}
                {`%`}
              </Text>
            </View>
          ) : (
            <></>
          )}
          <CustomButton
            isImg
            imgStyle={styles.heart_img}
            source={this.state.isFav ? active_heart : in_active_heart}
            onPress={() =>
              this.setState({isFav: !this.state.isFav})
            }></CustomButton>
        </ImageBackground>
        <View style={styles.descView}>
          <View style={styles.descHeader}>
            {starsArray.map((_, index) => (
              <CustomImage
                key={index}
                source={star_img}
                style={styles.star_img}
              />
            ))}
            <View>
              <Text>
                {`(`}
                {item?.rate}
                {`)`}
              </Text>
            </View>
          </View>
          <View style={styles.descParagraphs}>
            <Text style={styles.gray_word}>{item?.grayword}</Text>
            <Text style={styles.black_word}>{item?.blackword}</Text>
            <Text style={styles.price}>
              {item?.price}
              {`$`}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default SearchItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginStart: 10,
  },
  backgroundImgView: {
    width: width / 2.5,
    aspectRatio: 0.8,
    resizeMode: 'center',
  },
  percentageView: {
    backgroundColor: '#DB3022',
    width: 50,
    borderRadius: 20,
    padding: 6,
    marginStart: 10,
    marginTop: 10,
  },
  percentageText: {
    color: 'white',
    margin: 'auto',
  },
  heart_img: {
    width: 50,
    height: 50,
    top: 180,
    left: 60,
  },
  descView: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    gap: 10,
  },
  descHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 3,
    marginStart: 10,
  },
  star_img: {
    width: 20,
    height: 20,
  },
  descParagraphs: {
    display: 'flex',
    flexDirection: 'column',
  },
  gray_word: {
    color: '#9B9B9B',
    fontSize: 16,
    fontFamily: 'Metropolis-Medium',
  },
  black_word: {
    color: '#222222',
    fontFamily: 'Metropolis-Bold',
    fontSize: 20,
  },
  price: {
    color: '#9B9B9B',
    fontFamily: 'Metropolis-Medium',
    fontSize: 20,
  },
});
