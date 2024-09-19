import { Dimensions, StyleSheet, Text, View,ScrollView,FlatList} from 'react-native'
import React, { createRef, useEffect, useState } from 'react'
import CustomTextInput from '../../components/CustomTextInput'
import CheckBox from '@react-native-community/checkbox'
import BrandsList from '../../components/BrandsList'
import { brandItem,brandItemProps } from '../../navigations/types'
import FilterModal from '../../components/FilterModal'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { removeAll } from '../../redux/filtersSlice'
import { filterModalProps } from '../../navigations/types'
import { useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { ShopStackParamList } from '../../navigations/types'
import { RootState } from '../../redux/store'

const width=Dimensions.get('window').width
const height=Dimensions.get('window').height


const Brands:brandItem[]=[
    {
    id:'0',
    brand:"adidas"
    },
    {
    id:'1',
    brand:"adidas Originals"
    },
    {
    id:'2',
    brand:"Blend"
    },
    {
    id:'3',
    brand:"Boutique Moschino"
    },
    {
    id:'4',
    brand:"Champion"
    },
    {
    id:'5',
    brand:"Diesel"
    },
    {
    id:'6',
    brand:"Jack&Jones"
    },
    {
    id:'7',
    brand:"Naf Naf"
    },
    {
    id:'8',
    brand:"Red Valentino"
    }
]

const Brand = ({}) => {
    const navigation=useNavigation<StackScreenProps<ShopStackParamList>>()
    const filters=useSelector((state:RootState)=>state.filters.value)
    const [searchValue,setSearchValue]=useState<String>('')
    const [brandData,setBrandData]=useState<brandItem[]>(Brands)
    const dispatch=useDispatch<AppDispatch>();
    const ItemSeparator:React.FC=()=>{
        return <View style={styles.separator}/>
      }
  useEffect(()=>{
    setBrandData([...Brands?.filter(item=>item?.brand?.includes(searchValue))])
  },[searchValue])
  const handleRemoveAll=()=>{
    dispatch(removeAll())
  }
  return (
    <View style={styles.container}>
      <View>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <CustomTextInput 
        value={searchValue} 
        img={require('../../assets/img/searchGray.png')} 
        imgStyle={{width:20,height:20}}
        TextInputStyle={{padding:10,marginTop:15,marginStart:15,width:width*0.9}}
        onChangeText={(val)=>setSearchValue(val)}
        />
        <View style={{marginTop:20}}>
        <FlatList
            ItemSeparatorComponent={ItemSeparator}
            data={brandData}
            style={{flex:1}}
            renderItem={({item,index}:brandItemProps)=><BrandsList item={item} index={index}/>}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item)=> item.id}
            scrollEnabled={false}
            />
        </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
            <FilterModal
            discardFn={handleRemoveAll}
            applyFn={()=>navigation?.goBack()}
            />
        </View>
      </View>
    </View>
  )
}

export default Brand

const styles = StyleSheet.create({
    container:{flex:1},
    brandView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:10
    },
    brandText:
    {
        marginStart:20,
        color:'#222222',
        fontSize:20
    },
    brandCheckBox:
    {
        marginEnd:30
    },
    separator:
    {
      height:20,
      backgroundColor:'transparent',
    },
    buttonContainer:
    {
     zIndex:1,
     top:height-175,
     position:'absolute',
     width:width,
    }
})