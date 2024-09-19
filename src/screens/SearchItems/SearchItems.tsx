import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  ImageSourcePropType,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  searchItemsScreenProps,
  searchItemProps,
  searchItem,
  ShopStackParamList,
} from '../../navigations/types';
import SearchItemsHeader from '../../components/SearchItemsHeader';
import SearchItem from '../../components/SearchItem';
import ListSearchItem from '../../components/ListSearchItem';
import {sortby, searchItem as searchItemType} from '../../navigations/types';
import {sortWaysProps} from '../../navigations/types';
import {StackScreenProps} from '@react-navigation/stack';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
type specificItemNavigation = StackScreenProps<
  ShopStackParamList,
  'specificItem'
>;

const SearchItems = ({route, navigation}: searchItemsScreenProps) => {
  const [showList, setShowList] = useState<Boolean>(false);
  const navItem = useNavigation<specificItemNavigation>();
  const [numColumns, setNumColumns] = useState<number>(2);
  const [choosenSort, setChoosenSort] = useState<sortby>('Popular');
  const [allItems, setAllItems] = useState<searchItemType[]>(
    route?.params?.Items,
  );
  const isFocused = useIsFocused();
  const active_heart: ImageSourcePropType = require('../../assets/img/activated.png');
  const in_active_heart: ImageSourcePropType = require('../../assets/img/inactive.png');
  const star_img: ImageSourcePropType = require('../../assets/img/Star.png');
  const ItemSeparator: React.FC = () => {
    return <View style={styles.separator} />;
  };
  const rowItemSeparator: React.FC = () => {
    return <View style={styles.verticalSeparator} />;
  };
  const specificItem = ({item, index}: searchItemProps) => {
    console.log('iteeeeeeeeeeeeeeeeeeeeeeeem', item);
    console.log('showList', showList);
    return (
      <TouchableOpacity
        onPress={() => {
          navItem.navigate('specificItem', {
            searchItem: item,
          });
        }}
        style={{flex: 1}}
        activeOpacity={1}>
        {showList ? (
          <ListSearchItem
            item={item}
            index={index}
            active_heart={active_heart}
            in_active_heart={in_active_heart}
            star_img={star_img}
          />
        ) : (
          <SearchItem
            item={item}
            index={index}
            active_heart={active_heart}
            in_active_heart={in_active_heart}
            star_img={star_img}
          />
        )}
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    if (isFocused) {
      setAllItems(route?.params?.Items);
      StatusBar.setTranslucent(false);
    }
  }, [isFocused]);

  useEffect(() => {
    switch (choosenSort) {
      case 'Popular':
        setAllItems(
          [...allItems].sort((a, b) =>
            a?.blackword?.localeCompare(b?.blackword),
          ),
        );
        break;
      case 'Customer review':
        setAllItems(
          [...allItems].sort((a, b) => a.stars?.localeCompare(b?.stars)),
        );
        break;
      case 'Newest':
        setAllItems(
          [...allItems].sort((a, b) => a.date?.localeCompare(b?.date)),
        );
        break;
      case 'Price:lowest to high':
        setAllItems(
          [...allItems].sort(
            (a, b) => parseFloat(a?.price) - parseFloat(b?.price),
          ),
        );
        break;

      case 'Price:highest to low':
        setAllItems(
          [...allItems].sort(
            (a, b) => parseFloat(b?.price) - parseFloat(a?.price),
          ),
        );
        break;
    }
  }, [choosenSort]);
  console.log('item-----------', allItems);
  return (
    <View style={styles.container} key={route.params.id}>
      <StatusBar translucent={false} />
      <SearchItemsHeader
        showList={showList}
        setNumColumns={setNumColumns}
        setShowList={setShowList}
        choosenSort={choosenSort}
        setChoosenSort={setChoosenSort}
      />
      <View style={styles.newItemsView}>
        <FlatList
          key={`flatList-${numColumns}`}
          ItemSeparatorComponent={rowItemSeparator}
          data={allItems}
          style={{flex: 1}}
          renderItem={specificItem}
          keyExtractor={item => item.id}
          horizontal={false}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};

export default SearchItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newItemsView: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    height: 100,
    color: 'black',
  },
  verticalSeparator: {
    height: 20,
  },
  View: {},
});
