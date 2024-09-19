import { createStackNavigator, StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageSourcePropType} from 'react-native';
import { RouteProp, useNavigation,useNavigationState } from '@react-navigation/native';
import { ShopStackParamList } from "./types";
import Search from "../screens/Search/Search";
import TopTabNavigation from "./TopTabNavigation";
import CustomButton from "../components/CustomButton";
import SearchItems from "../screens/SearchItems/SearchItems";
import Filters from "../screens/Filters/Filters";
import Brand from "../screens/Brand/Brand";
import SpecificItem from "../screens/SpecificItem/specificItem";

const ShopStack=createStackNavigator<ShopStackParamList>()



interface CustomHeaderProps {
 navigation?:StackScreenProps<ShopStackParamList>,
 route?:RouteProp<ShopStackParamList,'searchItems'>,
 specificItemRoute?:RouteProp<ShopStackParamList,'specificItem'>,
 title?:string,
 rightIcon?:ImageSourcePropType
}

const ShopStackNavigation= () => {
  const routeName=useNavigationState(state=>state.routes[state.index].name)
  return (
  <ShopStack.Navigator
    initialRouteName="shop"
    screenOptions={{
      header: ({navigation}) => <CategoriesHeader  navigation={navigation}/>
    }}
  >
    <ShopStack.Screen 
     name='shop' 
     component={TopTabNavigation}/>
    <ShopStack.Screen
     name='searchCategories' 
     component={Search}
     />
     <ShopStack.Screen
     name="searchItems"
     options={({route,navigation})=>({
      header: () => <CategoriesHeader route={route} navigation={navigation}/>
     })}
     component={SearchItems}
     />
     <ShopStack.Screen
     name="filters"
     component={Filters}
     options={{
      header:({navigation})=><CategoriesHeader title="Filters" navigation={navigation} 
      />
    }}
     />
     <ShopStack.Screen
     name="brand"
     component={Brand}
     options={{
      header:({navigation})=><CategoriesHeader title="Brand" navigation={navigation} 
      />
     }}
     />
     <ShopStack.Screen
     name="specificItem"
     component={SpecificItem}
     options={{
      header:({route,navigation})=><CategoriesHeader specificItemRoute={route} navigation={navigation} rightIcon={require('../assets/img/share.png')}/>
     }}
     />
  </ShopStack.Navigator>
  )
}

const CategoriesHeader=({navigation,route,title,rightIcon,specificItemRoute}:CustomHeaderProps)=>{
  return (
    <View style={styles.container}>
      <CustomButton
      isImg
      source={require('../assets/img/icon.png')}
      imgStyle={{width:30,height:30,backgroundColor:'transparent'}}
      onPress={()=>navigation?.goBack()}
      />
      <Text style={styles.title}>{route ?route?.params?.name :specificItemRoute?specificItemRoute?.params?.searchItem?.blackword:
      title? title:'Categories'}</Text>
      <CustomButton
      isImg
      source={rightIcon?require('../assets/img/share.png'):require('../assets/img/search.png')}
      imgStyle={rightIcon?{width:25,height:25}:{width:30,height:30}}
      onPress={()=>navigation?.navigate('searchCategories')}
      />
    </View>
  );
}

export default ShopStackNavigation

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  backButton: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    color: '#222222',
    fontSize: 18,
    fontFamily:'Metropolis-Medium'
  },
});