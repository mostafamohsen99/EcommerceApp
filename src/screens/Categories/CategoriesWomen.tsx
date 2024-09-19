import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SummerSales from '../../components/SummerSales';
import {WomenData} from '../../JSON';
import {
  listItem as listItemInterface,
  listItemProps,
  searchItem,
} from '../../navigations/types';
import ListItem from '../../components/ListItem';
import {useNavigation} from '@react-navigation/native';
import {CategoriesWomenNavigationProp} from '../../navigations/types';
import {useIsFocused} from '@react-navigation/native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useQuery} from 'react-query';

const CategoriesWomen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<CategoriesWomenNavigationProp>();
  const [womenData, setWomenData] = useState<listItemInterface[]>([]);
  const ItemSeparator: React.FC = () => {
    return <View style={styles.separator} />;
  };
  useEffect(() => {
    if (isFocused) {
      StatusBar.setTranslucent(false);
    }
  }, [isFocused]);
  const getWomenItemDocs = async () => {
    try {
      const WomenItemDocs: listItemInterface[] = [];
      const querySnapShot = await firestore().collection('WomenItems').get();
      for (const doc of querySnapShot.docs) {
        let docData = {
          id: doc.id,
          name: doc.data().name,
          img: doc.data().img,
          insideItems: [] as searchItem[],
        };
        const insideItems = await Promise.all(
          doc
            .data()
            .insideItems.map(
              async (itemRef: FirebaseFirestoreTypes.DocumentReference) => {
                const itemDoc = await itemRef.get();
                return {...itemDoc.data(), id: itemDoc.id} as searchItem;
              },
            ),
        );
        docData.insideItems = insideItems;
        WomenItemDocs.push(docData);
      }
      return WomenItemDocs;
    } catch (error) {
      console.log('Error fetching MenItemDocs', error);
    }
  };
  const {
    data: WomenItems,
    isLoading,
    error,
  } = useQuery(['WomenItems'], getWomenItemDocs);
  //console.log('WomenItems', WomenItems);
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StatusBar translucent={false} />
        <SummerSales />
        <FlatList
          ItemSeparatorComponent={ItemSeparator}
          data={WomenItems}
          style={{flex: 1}}
          renderItem={({item, index}: listItemProps) => (
            <ListItem item={item} index={index} navigation={navigation} />
          )}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default CategoriesWomen;

const styles = StyleSheet.create({
  separator: {
    height: 20,
    backgroundColor: 'transparent',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
