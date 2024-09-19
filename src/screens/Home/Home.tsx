import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  ImageBackground,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import React, {Fragment, useState, useEffect} from 'react';
import CustomImage from '../../components/CustomImage';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import SaleItem from '../../components/SaleItem';
import {saleItem, saleItemProps} from '../../navigations/types';
import {new_Data, sale_Data} from '../../JSON';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import firestore from '@react-native-firebase/firestore';
import {useQuery} from 'react-query';
interface HomeProps {
  navigation?: any;
}

const ItemSeparator: React.FC = () => {
  return <View style={styles.separator} />;
};
const width = Dimensions.get('window').width;
const active_heart: ImageSourcePropType = require('../../assets/img/activated.png');
const in_active_heart: ImageSourcePropType = require('../../assets/img/inactive.png');
const star_img: ImageSourcePropType = require('../../assets/img/Star.png');
const Home = ({navigation}: HomeProps) => {
  const isFocused = useIsFocused();
  const fetchRandomItems = async () => {
    const allRandomData = await firestore()
      .collection('randomItems')
      .get()
      .then(querySnapShot => {
        return querySnapShot.docs.map(documentSnapShot => {
          let randomData: saleItem = documentSnapShot.data() as saleItem;
          randomData = {...randomData, id: documentSnapShot.id};
          return randomData;
        });
      });
    return allRandomData;
  };

  useEffect(() => {
    if (isFocused) {
      StatusBar.setTranslucent(true);
    }
  }, [isFocused]);
  const {
    data: randomItems,
    error,
    isLoading,
  } = useQuery(['randomItems'], fetchRandomItems, {
    onSuccess: data => {},
    staleTime: 5000,
    cacheTime: 10000,
    retry: 1,
  });
  const newItems = randomItems?.filter(item => item.isNew === true);
  const saleItems = randomItems?.filter(item => item?.isNew === false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.backgroundImgView}>
          <ImageBackground
            source={require('../../assets/img/Home/Big_Banner.png')}
            style={styles.backgroundImage}>
            <Text style={styles.fashionSaleText}>Fashion Sale</Text>
            <CustomButton
              title="Check"
              textColor="white"
              backgroundColor="#DB3022"
              onPress={() => navigation.navigate('Shop')}
              textStyle={styles.checkTextStyle}
              buttonStyle={styles.checkButtonStyle}
            />
          </ImageBackground>
        </View>
        <View style={styles.imgBackgrounds}>
          <ImageBackground
            source={require('../../assets/img/Home_Images/New_Collection.png')}
            style={{width: width, height: undefined, aspectRatio: 1}}>
            <View style={styles.new_Collection}>
              <Text style={styles.new_Collection_Text}>New collection</Text>
            </View>
          </ImageBackground>
          <View style={styles.colBackGround}>
            <View style={styles.ColImages}>
              <ImageBackground
                source={require('../../assets/img/Home_Images/White_Img.png')}
                style={{width: width / 2, aspectRatio: 0.5}}
                resizeMode="stretch">
                <View>
                  <Text style={styles.SummerSaleText}>Summer Sale</Text>
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../../assets/img/Home_Images/black.png')}
                style={{width: width / 2, aspectRatio: 0.5}}
                resizeMode="stretch">
                <View>
                  <Text style={styles.blackText}>Black</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.rowImage}>
              <ImageBackground
                source={require('../../assets/img/Home_Images/Men_hoodies.png')}
                style={{width: width / 2, aspectRatio: 0.25}}
                resizeMode="stretch">
                <View>
                  <Text style={styles.menHoodiesText}>Men's Hoodies</Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
        <View style={styles.flatListsView}>
          <View style={styles.newTextView}>
            <Text style={styles.newTextText}>Sale</Text>
            <Text style={styles.newTextPar}>You’ve never seen it before!</Text>
          </View>
          <View style={styles.newItemsView}>
            <FlatList
              ItemSeparatorComponent={ItemSeparator}
              data={saleItems}
              style={{flex: 1}}
              renderItem={({item, index}: saleItemProps) => (
                <SaleItem
                  item={item}
                  index={index}
                  active_heart={active_heart}
                  in_active_heart={in_active_heart}
                  star_img={star_img}
                />
              )}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.newTextView}>
            <Text style={styles.newTextText}>New</Text>
            <Text style={styles.newTextPar}>You’ve never seen it before!</Text>
          </View>
          <View style={styles.newItemsView}>
            <FlatList
              ItemSeparatorComponent={ItemSeparator}
              data={newItems}
              style={{flex: 1}}
              renderItem={({item, index}: saleItemProps) => (
                <SaleItem
                  item={item}
                  index={index}
                  active_heart={active_heart}
                  in_active_heart={in_active_heart}
                  star_img={star_img}
                />
              )}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -50,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    zIndex: 1,
    width: width,
    aspectRatio: 0.75,
    resizeMode: 'contain',
  },
  statusBar: {
    marginTop: -30,
  },
  backgroundImgView: {
    //   position:'absolute',
    width: width,
    resizeMode: 'cover',
    //    backgroundColor:'red'
  },
  fashionSaleText: {
    zIndex: 1,
    color: 'white',
    fontSize: 40,
    fontFamily: 'Metropolis-Bold',
    width: width * 0.4,
    marginTop: width * 0.85,
    marginStart: width * 0.05,
  },
  checkTextStyle: {
    fontFamily: 'Metropolis-Medium',
    fontSize: 16,
  },
  checkButtonStyle: {
    borderRadius: 20,
    zIndex: 1,
    padding: 10,
    width: 150,
    marginStart: width * 0.05,
  },
  flatListsView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: width,
    gap: 20,
  },
  newTextText: {
    fontSize: 25,
    color: '#222222',
    fontFamily: 'Metropolis-Bold',
  },
  newTextView: {
    marginVertical: 30,
    marginStart: 20,
  },
  newTextPar: {
    color: '#9B9B9B',
    fontFamily: 'Metropolis-Medium',
    fontSize: 16,
  },
  newItemsView: {
    marginStart: 20,
    flex: 1,
  },
  separator: {
    width: 20,
    backgroundColor: 'transparent',
  },
  imgBackgrounds: {
    flex: 1,
  },
  new_Collection: {},
  new_Collection_Text: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Metropolis-Bold',
    position: 'absolute',
    top: width * 0.8,
    left: width * 0.3,
  },
  colBackGround: {
    display: 'flex',
    flexDirection: 'row',
    width: width,
  },
  ColImages: {
    display: 'flex',
    flexDirection: 'column',
  },
  rowImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SummerSaleText: {
    color: '#DB3022',
    fontSize: 40,
    fontFamily: 'Metropolis-Bold',
    marginStart: 20,
    marginTop: width / 3,
  },
  blackText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Metropolis-Bold',
    marginStart: 20,
    marginTop: width * 0.8,
  },
  menHoodiesText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Metropolis-Bold',
    marginStart: 40,
    marginTop: width * 0.8,
  },
});
