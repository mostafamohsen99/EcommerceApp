import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { useIsFocused } from '@react-navigation/native';

const Search = () => {
  const isFocused=useIsFocused();
  useEffect(()=>{
    if(isFocused)
    {
      StatusBar.setTranslucent(false)
    }
  },[isFocused])
  return (
    <View>
      <StatusBar translucent={false}/>
      <Text>Search</Text>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})