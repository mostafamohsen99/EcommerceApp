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
import {KidsData} from '../../JSON';
import {
  listItemProps,
  searchItem,
  listItem as listItemInterface,
} from '../../navigations/types';
import ListItem from '../../components/ListItem';
import {useNavigation} from '@react-navigation/native';
import {CategoriesKidsNavigationProp} from '../../navigations/types';
import {useIsFocused} from '@react-navigation/native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useQuery} from 'react-query';

const CategoriesKids = () => {
  const navigation = useNavigation<CategoriesKidsNavigationProp>();
  const [kidsData, setKidsData] = useState<searchItem[]>();
  const isFocused = useIsFocused();
  const ItemSeparator: React.FC = () => {
    return <View style={styles.separator} />;
  };
  useEffect(() => {
    if (isFocused) {
      StatusBar.setTranslucent(false);
    }
  }, [isFocused]);

  const getKidsItemDocs = async () => {
    try {
      const kidsItemDocs: listItemInterface[] = [];
      const querySnapShot = await firestore().collection('KidsItems').get();
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
        kidsItemDocs.push(docData);
      }
      return kidsItemDocs;
    } catch (error) {
      console.log('Error fetching MenItemDocs', error);
    }
  };
  const {
    data: KidsItems,
    isLoading,
    error,
  } = useQuery(['KidsItems'], getKidsItemDocs);
  //console.log('KidsItems', KidsItems);
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StatusBar translucent={false} />
        <SummerSales />
        <FlatList
          ItemSeparatorComponent={ItemSeparator}
          data={KidsItems}
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

export default CategoriesKids;

const styles = StyleSheet.create({
  separator: {
    height: 20,
    backgroundColor: 'transparent',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
