import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {act, useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomImage from '../../components/CustomImage';
import CustomButton from '../../components/CustomButton';
import {StackScreenProps} from '@react-navigation/stack';
import {
  listItem,
  ShopStackParamList,
  searchItem,
  searchItemProps,
} from '../../navigations/types';
import FilterModal from '../../components/FilterModal';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {removeAll} from '../../redux/filtersSlice';
import {KidsData, MenData, WomenData} from '../../JSON';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useQueries, useQuery} from 'react-query';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

type colorsProps = {
  id: string;
  color: string;
};
type sizesProps = {
  id: string;
  type: string;
};
type categoriesProps = {
  id: string;
  category: string;
};

const categories: categoriesProps[] = [
  {
    id: '0',
    category: 'All',
  },
  {
    id: '1',
    category: 'Women',
  },
  {
    id: '2',
    category: 'Men',
  },
  {
    id: '3',
    category: 'Kids',
  },
];
const sizes: sizesProps[] = [
  {
    id: '0',
    type: 'XS',
  },
  {
    id: '1',
    type: 'S',
  },
  {
    id: '2',
    type: 'M',
  },
  {
    id: '3',
    type: 'L',
  },
  {
    id: '4',
    type: 'XL',
  },
];
const colors: colorsProps[] = [
  {
    id: '0',
    color: '#020202',
  },
  {
    id: '1',
    color: '#F6F6F6',
  },
  {
    id: '2',
    color: '#B82222',
  },
  {
    id: '3',
    color: '#BEA9A9',
  },
  {
    id: '4',
    color: '#E2BB8D',
  },
  {
    id: '5',
    color: '#151867',
  },
];

const Filters = ({}) => {
  const navigation = useNavigation<StackScreenProps<ShopStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filters.value);
  const isFocused = useIsFocused();
  const [buttonPressed, setButtonPressed] = useState<Boolean>(false);
  const [menValid, setMenValid] = useState<Boolean>(false);
  const [womenValid, setWomenValid] = useState<Boolean>(false);
  const [kidsValid, setKidsValid] = useState<Boolean>(false);
  const [allData, setAllData] = useState<searchItem[]>([]);
  const [twoWayValue, setTwoWayValue] = useState<number[]>([15, 20]);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const [activeColor, setActiveColor] = useState<string[]>([]);
  const [activeSize, setActiveSize] = useState<string[]>([]);
  const [activeCateogry, setActiveCategory] = useState<string[]>([]);
  const enableScroll = () => setScrollEnabled(true);
  const disableScroll = () => setScrollEnabled(false);
  useEffect(() => {
    if (isFocused) {
      StatusBar.setTranslucent(false);
    }
  }, [isFocused]);
  const handleTwoWaySliderChange = value => {
    setTwoWayValue(value);
  };
  const discardAll = () => {
    setActiveColor([]);
    setActiveSize([]);
    setActiveCategory([]);
    setTwoWayValue([0, 0]);
    dispatch(removeAll());
  };
  const getMenData = async () => {
    let MenItemDocs: searchItem[] = [];
    // console.log('MenItemDocs', MenItemDocs);
    try {
      const querySnapShot = await firestore().collection('MenItems').get();
      for (const doc of querySnapShot.docs) {
        const insideItems: searchItem[] = await Promise.all(
          doc
            .data()
            .insideItems.map(
              async (itemRef: FirebaseFirestoreTypes.DocumentReference) => {
                const itemDoc = await itemRef.get();
                return {...itemDoc.data(), id: itemDoc.id} as searchItem;
              },
            ),
        );
        // console.log('insideItems',insideItems)
        MenItemDocs = [...MenItemDocs, ...insideItems];
      }
      console.log('MenItemDocs', MenItemDocs);
      return MenItemDocs;
    } catch (err) {
      console.log('err', err);
    }
  };
  const getWomenData = async () => {
    let WomenItemDocs: searchItem[] = [];
    try {
      const querySnapShot = await firestore().collection('WomenItems').get();
      for (const doc of querySnapShot.docs) {
        const insideItems: searchItem[] = await Promise.all(
          doc
            .data()
            .insideItems.map(
              async (itemRef: FirebaseFirestoreTypes.DocumentReference) => {
                const itemDoc = await itemRef.get();
                return {...itemDoc.data(), id: itemDoc.id} as searchItem;
              },
            ),
        );
        WomenItemDocs = [...WomenItemDocs, ...insideItems];
      }
      return WomenItemDocs;
    } catch (err) {
      console.log('err', err);
    }
  };

  const getKidsData = async () => {
    let KidsItemDocs: searchItem[] = [];
    try {
      const querySnapShot = await firestore().collection('KidsItems').get();
      for (const doc of querySnapShot.docs) {
        const insideItems: searchItem[] = await Promise.all(
          doc
            .data()
            .insideItems.map(
              async (itemRef: FirebaseFirestoreTypes.DocumentReference) => {
                const itemDoc = await itemRef.get();
                return {...itemDoc.data(), id: itemDoc.id} as searchItem;
              },
            ),
        );
        KidsItemDocs = [...KidsItemDocs, ...insideItems];
      }
      return KidsItemDocs;
    } catch (err) {
      console.log('err', err);
    }
  };
  const queries = [
    menValid && {
      queryKey: ['MenFilter'],
      queryFn: getMenData,
    },
    womenValid && {
      queryKey: ['WomenFilter'],
      queryFn: getWomenData,
    },
    kidsValid && {
      queryKey: ['KidsFilter'],
      queryFn: getKidsData,
    },
  ].filter(Boolean);
  const results = useQueries(queries);
  console.log('results', results);
  const filterData = (data: searchItem[]) => {
    console.log('dataaaa', data);
    let finalData: searchItem[] | undefined = data?.filter(
      ({price, brand, colors, sizes}: searchItem) => {
        let priceValid = true;
        let sizeValid = true;
        let colorsValid = true;
        let brandValid = true;
        const priceInt = parseInt(price);
        if (twoWayValue[0] != 10 && twoWayValue[1] != 15) {
          priceValid = priceInt >= twoWayValue[0] && priceInt <= twoWayValue[1];
        }
        if (activeSize.length !== 0) {
          sizeValid = activeSize.some(item => sizes?.includes(item));
        }
        if (activeColor.length !== 0) {
          colorsValid = activeColor.some(item => colors?.includes(item));
        }
        if (filters?.length !== 0) {
          brandValid = filters?.includes(brand);
        }
        return priceValid && sizeValid && colorsValid && brandValid;
      },
    );
    console.log('finalDataBefore', finalData);
    finalData = finalData.filter(
      (item, index, self) => index === self.findIndex(t => t.id === item.id),
    );
    console.log('finalDataAfter', finalData);
    return finalData;
  };
  const applyAll = () => {
    setButtonPressed(true);
    if (activeCateogry.includes('All')) {
      setMenValid(true);
      setWomenValid(true);
      setKidsValid(true);
    } else {
      if (activeCateogry.includes('Men')) {
        setMenValid(true);
      }
      if (activeCateogry.includes('Women')) {
        setWomenValid(true);
      }
      if (activeCateogry.includes('Kids')) {
        setKidsValid(true);
      }
    }
  };
  const addColor = ({color, id}: colorsProps) => {
    setActiveColor([...activeColor, color]);
  };
  const addSize = ({id, type}: sizesProps) => {
    setActiveSize([...activeSize, type]);
  };
  const addCategory = ({id, category}: categoriesProps) => {
    setActiveCategory([...activeCateogry, category]);
  };
  const removeColor = ({color, id}: colorsProps) => {
    setActiveColor([...activeColor.filter(str => str != color)]);
  };
  const removeSize = ({id, type}: sizesProps) => {
    setActiveSize([...activeSize.filter(str => str != type)]);
  };
  const removeCategory = ({id, category}: categoriesProps) => {
    setActiveCategory([...activeCateogry.filter(str => str != category)]);
  };
  useEffect(() => {
    if (buttonPressed) {
      const isSuccessful = results.every(result => result.isSuccess);
      if (isSuccessful) {
        let allFetched: searchItem[] = results.map(result => {
          if (result.data) return result.data;
        });
        allFetched = allFetched.flat();
        const finalData: searchItem[] = filterData(allFetched);
        console.log('finalData', finalData);
        navigation.navigate('searchItems', {
          name: 'Filter',
          Items: finalData,
        });
      }
    }
  }, [results]);

  return (
    <View>
      <ScrollView></ScrollView>
      <StatusBar translucent={false} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEnabled={scrollEnabled}>
        <View style={styles.priceRangeView}>
          <Text style={styles.priceRangeText}>Price Range</Text>
          <View style={styles.priceRangeSlider}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.firstNumber}>$10</Text>
              <Text style={styles.secondNumber}>$25</Text>
            </View>
            <MultiSlider
              onValuesChangeStart={disableScroll}
              onValuesChangeFinish={enableScroll}
              onValuesChange={handleTwoWaySliderChange}
              sliderLength={width * 0.8}
              touchDimensions={{
                height: 100,
                width: 100,
                borderRadius: 50,
                slipDisplacement: 200,
              }}
              values={twoWayValue}
              min={10}
              max={25}
              step={1}
              snapped={true}
              markerStyle={{
                backgroundColor: '#DB3022',
                width: 25,
                height: 25,
                borderRadius: 12.5,
              }}
              selectedStyle={{backgroundColor: '#DB3022'}}
              unselectedStyle={{backgroundColor: '#9B9B9B'}}
              onToggleOne={() => console.log('Hello One')}
              onToggleTwo={() => console.log('Hello two')}
            />
          </View>
          <Text style={styles.ColorsText}>Colors</Text>
          <View style={styles.colorsView}>
            {colors.map(({id, color}: colorsProps) => {
              return (
                <TouchableOpacity
                  key={id}
                  onPress={() =>
                    activeColor.includes(color)
                      ? removeColor({id, color})
                      : addColor({id, color})
                  }
                  style={[
                    activeColor.includes(color) ? styles.colorBorder : {},
                  ]}>
                  <View
                    style={[
                      styles.colorStyle,
                      {backgroundColor: color},
                    ]}></View>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.ColorsText}>Sizes</Text>
          <View style={styles.sizesView}>
            {sizes.map(({id, type}: sizesProps) => {
              return (
                <TouchableOpacity
                  key={id}
                  onPress={() =>
                    activeSize.includes(type)
                      ? removeSize({id, type})
                      : addSize({id, type})
                  }
                  style={[
                    activeSize.includes(type) ? styles.sizeButtonBorder : {},
                  ]}>
                  <View style={styles.sizeButton}>
                    <Text
                      style={[
                        activeSize.includes(type)
                          ? styles.sizeTextBorder
                          : styles.sizeText,
                      ]}>
                      {type}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.ColorsText}>Categories</Text>
          <View style={styles.categoriesView}>
            {categories.map(({id, category}: categoriesProps) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  key={id}
                  onPress={() =>
                    activeCateogry.includes(category)
                      ? removeCategory({id, category})
                      : addCategory({id, category})
                  }
                  style={[
                    styles.sizeCategory,
                    activeCateogry.includes(category)
                      ? styles.sizeCategoryColorBorder
                      : styles.sizeCategoryColor,
                  ]}>
                  <View>
                    <Text
                      style={
                        activeCateogry.includes(category)
                          ? {color: 'white'}
                          : {color: 'black'}
                      }>
                      {category}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.brandView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: width * 0.85,
              }}>
              <Text style={styles.brandText}>Brand</Text>
              <View style={{flexDirection: 'row', width: width * 0.85}}>
                {filters.map((filter, index) => (
                  <Text style={styles.filterText} key={index}>
                    {filter}
                    {index < filters.length - 1 && ', '}
                  </Text>
                ))}
              </View>
            </View>
            <CustomButton
              buttonStyle={{marginTop: 6, marginStart: 0}}
              isImg
              source={require('../../assets/img/rightArrow.png')}
              imgStyle={{width: 30, height: 30}}
              onPress={() => navigation?.navigate('brand')}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <FilterModal discardFn={discardAll} applyFn={applyAll} />
      </View>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  priceRangeText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Metropolis-Medium',
    marginBottom: 10,
  },
  priceRangeView: {
    display: 'flex',
    flexDirection: 'column',
    width: width * 0.9,
    margin: 'auto',
  },
  priceRangeSlider: {
    backgroundColor: 'white',
    paddingStart: 20,
    paddingVertical: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  firstNumber: {
    fontSize: 14,
    fontFamily: 'Metropolis-Medium',
  },
  secondNumber: {
    marginEnd: 20,
  },
  colorsView: {
    backgroundColor: 'white',
    paddingStart: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    gap: 8,
  },
  ColorsText: {
    color: '#222222',
    fontSize: 18,
    marginVertical: 12,
  },
  colorStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  colorBorder: {
    borderWidth: 2,
    borderRadius: 25,
    padding: 2,
    borderColor: 'red',
  },
  sizesView: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    gap: 15,
  },
  sizeButton: {
    padding: 10,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
  sizeText: {
    color: 'black',
  },
  sizeTextBorder: {
    color: 'white',
  },
  sizeButtonBorder: {
    backgroundColor: '#DB3022',
    borderRadius: 10,
    borderWidth: 0,
  },
  sizeCategory: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
  sizeCategoryColor: {
    backgroundColor: 'white',
  },
  sizeCategoryColorBorder: {
    backgroundColor: '#DB3022',
  },
  categoriesView: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingStart: 10,
    paddingVertical: 15,
  },
  brandView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  brandText: {
    marginTop: 10,
    fontSize: 18,
    color: '#222222',
  },
  buttonContainer: {
    zIndex: 1,
    top: height - 175,
    position: 'absolute',
    width: width,
  },
  filterText: {
    fontSize: 16,
    color: '#9B9B9B',
  },
});
