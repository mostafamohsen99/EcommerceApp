import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageSourcePropType,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  commentsProps,
  RateReviewsItem,
  specificItemScreenProps,
} from '../../navigations/types';
import CustomDropDown from '../../components/CustomDropDown';
import CustomButton from '../../components/CustomButton';
import CustomImage from '../../components/CustomImage';
import * as Progress from 'react-native-progress';
import CheckBox from '@react-native-community/checkbox';
import CommentItem from '../../components/CommentItem';
import {SheetManager} from 'react-native-actions-sheet';
import {getComments} from '../../redux/CommentsSlice';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useQuery} from 'react-query';

const width = Dimensions.get('window').width;

type colorMap = {[hexCode: string]: string};

type rateStarsProps = {
  id: string;
  stars: number[];
  val: string | undefined;
};

const colorMap: colorMap = {
  '#020202': 'black',
  '#F6F6F6': 'grey',
  '#B82222': 'red',
  '#BEA9A9': 'purple',
  '#E2BB8D': 'brown',
  '#151867': 'blue',
};

function getColorName(colorCode: string): string {
  const normalizedCode = colorCode.toUpperCase();
  return colorMap[normalizedCode];
}

const columnSeparator: React.FC = () => {
  return <View style={styles.horizontalSeparator} />;
};

const SpecificItem = ({route, navigation}: specificItemScreenProps) => {
  const [commentAdded, setCommentAdded] = useState<Boolean>(false);
  const [isFetching, setIsFetching] = useState<Boolean>(false);
  const searchItem = route?.params?.searchItem;
  const searchItemId = searchItem?.id;
  const [isFav, setIsFav] = useState<Boolean>(searchItem?.addedToFavorites);
  const colorNameArray: string[] = searchItem?.colors?.map((item, index) =>
    getColorName(item),
  );
  const starsArray = Array(Number(searchItem?.stars)).fill(0);
  const star_img: ImageSourcePropType = require('../../assets/img/Star.png');
  const [rateStars, setRateStars] = useState<rateStarsProps[]>([]);
  const [usePhoto, setUsePhoto] = useState<Boolean>(false);
  const getItemDocs = async () => {
    let rateItem: RateReviewsItem = {};
    try {
      const ItemCollectionRef = firestore()
        .collection('Items')
        .doc(searchItemId);
      const rateReviewItemCollectionRef = await firestore()
        .collection('RateReviews')
        .where('itemRef', '==', ItemCollectionRef)
        .get();
      for (const doc of rateReviewItemCollectionRef.docs) {
        rateItem = {
          id: doc.id,
          count_5: doc.data().count_5,
          count_4: doc.data().count_4,
          count_3: doc.data().count_3,
          count_2: doc.data().count_2,
          count_1: doc.data().count_1,
          desc: doc.data().desc,
          comments: [] as commentsProps[],
        };
        const commentsItems = await Promise.all(
          doc
            .data()
            .commentRef.map(
              async (commRef: FirebaseFirestoreTypes.DocumentReference) => {
                const commentDoc = await commRef?.get();
                const userRef = await commentDoc?.data()?.userRef?.get();
                const userData = await userRef?.data();
                const lastComment = {
                  id: commentDoc.id,
                  ...commentDoc.data(),
                  name: userData?.userName,
                  profileImg: userData?.profilePic,
                };
                delete lastComment?.userRef;
                return lastComment;
              },
            ),
        );
        rateItem.comments = commentsItems;
      }
      console.log('finalItem', rateItem);
    } catch (error) {
      console.log('error', error);
    } finally {
      return rateItem;
    }
  };
  const {
    data: rateQueryItem,
    isLoading,
    error,
  } = useQuery(['Item', searchItem?.id, commentAdded], getItemDocs);
  console.log('rateQueryItem', rateQueryItem);
  useEffect(() => {
    setRateStars([
      {
        id: '0',
        stars: Array(Number(5)).fill(0),
        val: rateQueryItem?.count_5,
      },
      {
        id: '1',
        stars: Array(Number(4)).fill(0),
        val: rateQueryItem?.count_4,
      },
      {
        id: '2',
        stars: Array(Number(3)).fill(0),
        val: rateQueryItem?.count_3,
      },
      {
        id: '3',
        stars: Array(Number(2)).fill(0),
        val: rateQueryItem?.count_2,
      },
      {
        id: '4',
        stars: Array(Number(1)).fill(0),
        val: rateQueryItem?.count_1,
      },
    ]);
  }, []);
  const rateNum =
    Number(rateQueryItem?.count_1) +
    Number(rateQueryItem?.count_2) +
    Number(rateQueryItem?.count_3) +
    Number(rateQueryItem?.count_4) +
    Number(rateQueryItem?.count_5);
  const finalRate = (
    (Number(rateQueryItem?.count_1) +
      Number(rateQueryItem?.count_2) * 2 +
      Number(rateQueryItem?.count_3) * 3 +
      Number(rateQueryItem?.count_4) * 4 +
      Number(rateQueryItem?.count_5) * 5) /
    rateNum
  ).toPrecision(2);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          style={styles.itemImage}
          source={{uri: searchItem.img}}
        />
        <View style={styles.dropDownViews}>
          <View style={styles.dropDownView}>
            <CustomDropDown items={colorNameArray} name="color" />
          </View>
          <View style={styles.dropDownView}>
            <CustomDropDown items={searchItem?.sizes} name="size" />
          </View>
          <View>
            <CustomButton
              isImg
              source={
                isFav
                  ? require('../../assets/img/activated.png')
                  : require('../../assets/img/inactive.png')
              }
              imgStyle={{width: 45, height: 45}}
              onPress={() => setIsFav(!isFav)}
            />
          </View>
        </View>
        <View style={styles.itemDetails}>
          <View style={styles.itemRow}>
            <View style={styles.itemWords}>
              <Text style={styles.itemBlackword}>{searchItem?.blackword}</Text>
              <Text style={styles.itemGrayWord}>{searchItem?.grayword}</Text>
              <View style={{flexDirection: 'row', marginVertical: 5, gap: 5}}>
                {starsArray.map((_, index) => (
                  <CustomImage
                    key={index}
                    source={star_img}
                    style={styles.star_img}
                  />
                ))}
                <Text>{`( ${searchItem?.rate} )`}</Text>
              </View>
            </View>
            <Text style={styles.itemPrice}>{`$${searchItem?.price}`}</Text>
          </View>
          <View style={styles.itemParagraph}>
            <Text style={styles.itemParagraphText}>{rateQueryItem?.desc}</Text>
          </View>
          <View style={styles.cartButton}>
            <CustomButton
              buttonStyle={styles.cartButtonStyle}
              title="Add to Cart"
              textStyle={styles.cartTextStyle}
              textColor="white"
            />
          </View>
          <View>
            <View style={styles.rateReviewItemHeader}>
              <Text style={styles.rateReviewItemTitle}>Rating & Reviews</Text>
              <View style={styles.rateReviewDetails}>
                <View style={styles.rateReviewNumbers}>
                  <Text style={styles.finalRateStyle}>{finalRate}</Text>
                  <Text
                    style={styles.ratingsStyle}>{`${rateNum} ratings`}</Text>
                </View>
                <View style={styles.rateReviewItemtars}>
                  <View style={styles.starsImgStyle}>
                    {rateStars.map(({id, stars, val}: rateStarsProps) => (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 10,
                        }}
                        key={id}>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                          {stars.map((_, index) => {
                            return (
                              <View
                                style={
                                  index === 0 && {
                                    marginStart: 20 * (5 - stars.length + 1),
                                  }
                                }
                                key={index}>
                                <CustomImage
                                  key={index}
                                  source={star_img}
                                  style={styles.star_img}
                                />
                              </View>
                            );
                          })}
                        </View>
                        <View style={{margin: 'auto'}}>
                          {/* <Progress.Bar 
                          progress={Number(val)/maxRate} 
                          unfilledColor='transparent'  
                          borderColor='transparent'
                          width={50}
                          height={8}
                          color='#db3022'
                          />  */}
                        </View>
                        <View>
                          <Text>{val}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.reviewFirstRow}>
            <View style={{marginStart: 12}}>
              <Text
                style={{
                  color: '#222222',
                  fontFamily: 'Metropolis-SemiBold',
                  fontSize: 20,
                }}>
                {rateQueryItem?.comments?.length} reviews
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginEnd: 40, marginTop: 5}}>
              <CheckBox
                value={usePhoto}
                onValueChange={() => setUsePhoto(!usePhoto)}
              />
              <Text
                style={{
                  marginTop: 8,
                  fontFamily: 'Metropolis-Regular',
                  fontWeight: '400',
                }}>
                with photo
              </Text>
            </View>
          </View>
          <View style={{flex: 1, gap: 10}}>
            <FlatList
              ItemSeparatorComponent={columnSeparator}
              data={rateQueryItem?.comments}
              style={{flex: 1}}
              renderItem={CommentItem}
              horizontal={false}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.writeReviewView}>
        <CustomButton
          onPress={() =>
            SheetManager.show('AddComment', {
              payload: {
                itemId: rateQueryItem?.id,
                fn: setCommentAdded,
                commentAdded: commentAdded,
              },
            })
          }
          buttonStyle={{
            backgroundColor: '#db3022',
            padding: 5,
            borderRadius: 20,
          }}
          title="write a review"
          isImg
          source={require('../../assets/img/Pen.png')}
          textColor="white"
          textStyle={{
            marginTop: 8,
            fontFamily: 'Metropolis-Regular',
            fontWeight: '400',
            marginEnd: 10,
            fontSize: 14,
          }}
        />
      </View>
    </View>
  );
};

export default SpecificItem;

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
  itemImage: {
    width: width,
    height: 413,
  },
  dropDownViews: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    gap: 16,
  },
  dropDownView: {
    width: 138,
    height: 40,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 16,
    marginTop: 22,
  },
  itemRow: {
    flexDirection: 'row',
    borderColor: 'black',
  },
  itemWords: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  itemPrice: {
    marginEnd: 16,
    color: '#222222',
    fontSize: 20,
    fontFamily: 'Metropolis-SemiBold',
    fontWeight: '600',
  },
  star_img: {
    width: 20,
    height: 20,
  },
  itemParagraph: {
    marginTop: 5,
  },
  itemParagraphText: {
    fontWeight: '400',
    fontFamily: 'Metropolis-Regular',
    color: '#222222',
    lineHeight: 20,
  },
  itemBlackword: {
    color: '#1E1E1E',
    fontFamily: 'Metropolis-SemiBold',
    fontWeight: '600',
    fontSize: 20,
  },
  itemGrayWord: {
    fontSize: 14,
    color: '#9b9b9b',
  },
  cartButton: {
    marginVertical: 20,
    marginEnd: 12,
  },
  cartButtonStyle: {
    marginEnd: 12,
    paddingVertical: 14,
    backgroundColor: '#DB3022',
    borderRadius: 20,
  },
  cartTextStyle: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Metropolis-Medium',
  },
  rateReviewItemHeader: {
    display: 'flex',
    flexDirection: 'column',
    marginStart: 12,
  },
  rateReviewItemTitle: {
    fontSize: 25,
    fontFamily: 'Metropolis-Bold',
    fontWeight: '600',
    color: '#222222',
  },
  rateReviewDetails: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rateReviewNumbers: {
    flexDirection: 'column',
  },
  rateReviewItemtars: {
    flexDirection: 'column',
    marginEnd: 40,
  },
  starsImgStyle: {
    flexDirection: 'column',
  },
  finalRateStyle: {
    color: '#222222',
    fontWeight: '600',
    fontSize: 40,
    fontFamily: 'Metropolis-SemiBold',
  },
  ratingsStyle: {
    color: '#9b9b9b',
    fontSize: 15,
    fontFamily: 'Metropolis-Regular',
  },
  reviewFirstRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  horizontalSeparator: {
    height: 20,
  },
  writeReviewView: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
