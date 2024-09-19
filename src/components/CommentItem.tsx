import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {commentsPropsItem} from '../navigations/types';
import CustomImage from './CustomImage';

const width = Dimensions.get('window').width;
const columnSeparator: React.FC = () => {
  return <View style={styles.horizontalSep} />;
};

const ImgComments = ({item, index}: {item: string; index: number}) => {
  return (
    <View style={{width: width * 0.9}}>
      <Image
        style={{width: 120, height: 120}}
        key={index}
        source={
          item ? {uri: item} : require('../assets/img/Clothes/Boxy_T_shirt.png')
        }
      />
    </View>
  );
};

const CommentItem = ({item, index}: commentsPropsItem) => {
  const emptyImg: string[] = [];
  const starsImg = item?.stars ? Array(Number(item?.stars)).fill(0) : [0, 0, 0];
  const inactiveStars = item?.stars
    ? Array(5 - Number(item?.stars)).fill(0)
    : [0, 0];
  return (
    <View
      style={[styles.container, index === 0 && {marginTop: 20}]}
      key={index}>
      <View style={styles.commentImg}>
        <Image
          style={{width: 40, height: 40}}
          source={
            item?.profileImg
              ? {uri: item.profileImg}
              : require('../assets/img/Clothes/black_dress.png')
          }
        />
      </View>
      <View style={styles.commentFirstRow}>
        <View style={styles.commentTitle}>
          <Text style={{marginStart: 20}}> {item?.name}</Text>
          <View style={{flexDirection: 'row', marginStart: 20}}>
            {starsImg.map((item, index) => (
              <CustomImage
                key={index}
                style={{width: 15, height: 15}}
                source={require('../assets/img/Star.png')}
              />
            ))}
            {inactiveStars.map((item, index) => (
              <CustomImage
                key={index}
                style={{width: 15, height: 15}}
                source={require('../assets/img/inactiveStar.png')}
              />
            ))}
          </View>
        </View>
        <Text style={{marginTop: 10}}>{item?.date}</Text>
      </View>
      <View style={styles.commentDesc}>
        <Text style={styles.commentDescText}>{item?.commentDesc}</Text>
        <View style={styles.commentsImg}>
          <FlatList
            ItemSeparatorComponent={columnSeparator}
            data={item.imgs ? item.imgs : emptyImg}
            style={{flex: 1}}
            renderItem={ImgComments}
            horizontal={true}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginEnd: 20,
        }}>
        <Text style={styles.helpfulWord}>Helpful</Text>
        <CustomImage
          source={require('../assets/img/like.png')}
          style={{width: 30, height: 30}}
        />
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    marginStart: 12,
    marginEnd: 25,
    borderRadius: 10,
  },
  commentImg: {
    position: 'absolute',
    top: -15,
    left: -15,
  },
  commentFirstRow: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginStart: 12,
    marginEnd: 12,
  },
  commentTitle: {
    flexDirection: 'column',
    gap: 5,
  },
  commentDesc: {
    marginTop: 20,
    marginStart: 12,
    marginEnd: 12,
    flexDirection: 'column',
    gap: 10,
  },
  commentDescText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'Metropolis-Regular',
    color: '#222222',
  },
  commentsImg: {
    flexDirection: 'row',
    gap: 10,
  },
  helpfulWord: {
    marginTop: 7,
    color: '#9b9b9b',
  },
  horizontalSep: {
    width: 20,
  },
});
