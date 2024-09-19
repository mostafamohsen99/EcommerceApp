import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState,useLayoutEffect } from 'react'
import { brandItemProps } from '../navigations/types'
import CheckBox from '@react-native-community/checkbox'
import { useDispatch,useSelector} from 'react-redux'
import { AppDispatch ,RootState} from '../redux/store'
import { addString,removeString } from '../redux/filtersSlice'


const BrandsList = ({item,index}:brandItemProps) => {
    const[isClicked,setIsClicked]=useState(false);
    const filters=useSelector((state:RootState)=>state.filters.value)
    const dispatch=useDispatch<AppDispatch>()
    const handleAdd=()=>{
      if(filters.includes(item.brand))
      {
       dispatch(removeString(item.brand))
      }
      else
      {
        dispatch(addString(item.brand))
      }
    }
    useEffect(()=>{
      if(filters.includes(item.brand))
      {
        setIsClicked(true)
      }
      else
      {
        setIsClicked(false)
      }
    },[filters.length])  
  return (
    <View style={styles.brandView} key={item.id}>
      <Text 
      style={[styles.brandText,isClicked?{color:'#DB3022'}:{color:'#222222'}]}>{item.brand}</Text>
      <CheckBox
      style={styles.checkBoxButton}
      value={isClicked}
      onChange={handleAdd}
      tintColors={{true:'#DB3022',false:'#222222'}}
      />
    </View>
  )
}

export default BrandsList

const styles = StyleSheet.create({
    brandView:
    {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    brandText:
    {
        marginStart:20,
        color:'#222222',
        fontSize:20
    },
    checkBoxButton:
    {
        marginEnd:20
    }
})