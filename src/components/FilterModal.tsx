import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { ShopStackParamList } from '../navigations/types'
import { filterModalProps } from '../navigations/types'


 const width=Dimensions.get('window').width
 const height=Dimensions.get('window').height


const FilterModal = ({applyFn,discardFn}:filterModalProps) => {
  return (
    <View style={styles.containerView}>
        <View style={styles.buttonHeadView}>
            <CustomButton
            title='Discard'
            buttonStyle={{backgroundColor:'white',borderWidth:1,borderColor:'black',paddingVertical:15,width:150,borderRadius:15}}
            textStyle={{fontSize:16,fontFamily:'Metropolis-Medium'}}
            textColor='#222222'
            onPress={discardFn}
            />
            <CustomButton
            title='Apply'
            buttonStyle={{backgroundColor:'#DB3022',borderWidth:1,borderColor:'transparent',paddingVertical:15,width:150,borderRadius:15}}
            textStyle={{fontSize:16,fontFamily:'Metropolis-Medium'}}
            onPress={applyFn}
            textColor='white'
            />
        </View>
    </View>
  )
}

export default FilterModal

const styles = StyleSheet.create({
  containerView:
  {
    flex:1,
    height:175,
    backgroundColor:'#F9F9F9',
  },
  buttonHeadView:
  {
    flexDirection:'row',
    justifyContent:'space-around',
    gap:20,
    marginTop:30
  }
})