import { StyleSheet, Text, View,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import ActionSheet,{SheetManager, useSheetPayload} from 'react-native-actions-sheet'
import { sortWaysProps } from '../navigations/types'


const width=Dimensions.get('window').width

const SortItems = () => {
    const payload=useSheetPayload("SortItems")
    const sortWays:sortWaysProps[]=[
        {
          id:'0',
          name:'Popular',
          function:()=>{payload.fn('Popular')
            SheetManager.hide('SortItems')
          }
        },
        {
          id:'1',
          name:'Newest',
          function:()=>{payload.fn('Newest')
            SheetManager.hide('SortItems')
          }
        },
        {
          id:'2',
          name:'Customer review',
          function:()=>{payload.fn('Customer review')
            SheetManager.hide('SortItems')
          }
        },
        {
          id:'3',
          name:'Price: lowest to high',
          function:()=>{payload.fn('Price:lowest to high'),
            SheetManager.hide('SortItems')}
        },
        {
          id:'4',
          name:'Price: highest to low',
          function:()=>{payload.fn('Price:highest to low'),
            SheetManager.hide('SortItems')}
        }
      ]
  return (
   <ActionSheet
   containerStyle={{
    paddingHorizontal: 12,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  }}
   >
      <View style={styles.container}>
              <View style={styles.sortByView}>
                <Text style={styles.sortByText}>Sort by</Text>
              </View>
              <View style={styles.sortContainer}>
                {
                  sortWays.map((item:sortWaysProps)=>{
                    return(
                      <TouchableOpacity onPress={item.function} key={item.id} style={[payload.choosen===item.name?{backgroundColor:'#DB3022'}:{backgroundColor:'transparent'},styles.itemButton]}>
                          <Text style={[styles.sortContainerText,payload.choosen===item.name?{color:'white'}:{color:'#222222'}]}>{item.name}</Text>
                      </TouchableOpacity>
                    )
                  }
                  )
                }
              </View>
           </View>
       
   </ActionSheet>
  )
}

export default SortItems

const styles = StyleSheet.create({
    container:
    {
        flex:1,
        flexDirection:'column',
    },
    sortByView: {
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:40},
    sortByText:
    {
        color:'#222222',
        fontSize:20,
        fontFamily:'Metropolis-SemiBold'
    },
    sortContainer:
    {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        gap:0,
        width:width,
        marginStart:20,
        backgroundColor:'transparent'
    },
    sortContainerText:
    {
        fontSize:16,
        color:'#222222',
    },
    itemButton:
    {
        paddingVertical:10,
        width:width
    }
})