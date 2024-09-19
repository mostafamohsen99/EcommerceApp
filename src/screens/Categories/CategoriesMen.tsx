import {StatusBar, StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import SummerSales from '../../components/SummerSales';
import {MenData} from '../../JSON';
import ListItem from '../../components/ListItem';
import {
  listItem as listItemInterface,
  listItemProps,
  searchItem,
} from '../../navigations/types';
import {ScrollView} from 'react-native-gesture-handler';
import {CategoriesMenNavigationProp} from '../navigations/types';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useQuery} from 'react-query';

const CategoriesMen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<CategoriesMenNavigationProp>();
  const [menData, setMenData] = useState<listItemInterface[]>([]);
  const ItemSeparator: React.FC = () => {
    return <View style={styles.separator} />;
  };
  useEffect(() => {
    if (isFocused) {
      StatusBar.setTranslucent(false);
    }
  }, [isFocused]);

  const getMenItemDocs = async () => {
    try {
      const MenItemDocs: listItemInterface[] = [];
      const querySnapShot = await firestore().collection('MenItems').get();
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
        MenItemDocs.push(docData);
      }
      return MenItemDocs;
    } catch (error) {
      console.log('Error fetching MenItemDocs', error);
    }
  };

  const {
    data: MenItems,
    isLoading,
    error,
  } = useQuery(['MenItems'], getMenItemDocs);
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent={false} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <SummerSales />
        <FlatList
          ItemSeparatorComponent={ItemSeparator}
          data={MenItems}
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

export default CategoriesMen;

const styles = StyleSheet.create({
  separator: {
    height: 20,
    backgroundColor: 'transparent',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
