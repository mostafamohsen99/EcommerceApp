import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {PureComponent} from 'react';
import {listItemProps} from '../navigations/types';

const width = Dimensions.get('window').width;

const height = Dimensions.get('window').height;
class ListItem extends PureComponent<listItemProps> {
  handlePress = () => {
    const {item, navigation} = this.props;

    navigation?.navigate('searchItems', {
      id: item?.id,
      name: item?.name,
      Items: item?.insideItems,
    });
  };
  render() {
    const {item, index} = this.props;
    return (
      <TouchableOpacity
        key={index}
        onPress={this.handlePress}
        activeOpacity={1}>
        <View style={styles.container}>
          <View style={styles.listView}>
            <Text style={styles.listText}>{item.name}</Text>
          </View>
          <View style={styles.imgView}>
            <ImageBackground
              // source={item.img}
              source={
                item?.img
                  ? {uri: String(item.img)}
                  : require('../assets/img/Clothes/black_dress.png')
              }
              style={styles.imgItem}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: width * 0.95,
    margin: 'auto',
    borderRadius: 20,
  },
  listView: {
    marginStart: 20,
  },
  listText: {
    color: '#222222',
    fontSize: 20,
    marginTop: 60,
  },
  imgItem: {
    width: width / 3,
    aspectRatio: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    resizeMode: 'stretch',
  },
  imgView: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
