import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomImage from './CustomImage'
import { sortby } from '../navigations/types'
import { SheetManager } from 'react-native-actions-sheet'
import { StackScreenProps } from '@react-navigation/stack'
import { ShopStackParamList } from '../navigations/types'
import { useNavigation } from '@react-navigation/native'

const width=Dimensions.get('window').width

interface SearchItemsHeaderProps
{
    showList?:boolean|undefined,
    setShowList?:(value:boolean)=>void,
    choosenSort?:sortby,
    setChoosenSort?:(value:sortby)=>void,
    setNumColumns?:(value:number)=>void
}

type filtersNavigation=StackScreenProps<ShopStackParamList>


const SearchItemsHeader = ({showList,setShowList,choosenSort,setChoosenSort,setNumColumns}:SearchItemsHeaderProps) => {
    const navigation=useNavigation<filtersNavigation>()
    const sortItemsHandler=()=>{
        SheetManager.show('SortItems',{
            payload:{
                fn:setChoosenSort,
                choosen:choosenSort
            }
        })
    }

    const showListHandler=()=>{
        setShowList(()=>!showList)
        if(showList)
           setNumColumns(2)
        else
            setNumColumns(1)
    }
  return (
    <View style={styles.container}>
        <View>
            <TouchableOpacity 
            style={styles.searchButton}
            onPress={()=>navigation?.navigate('filters')}
             activeOpacity={0.9}>
                <CustomImage source={require('../assets/img/filter.png')}/>
                <Text style={styles.buttonText}>Filters</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity 
            style={styles.searchButton} 
            onPress={sortItemsHandler}
            activeOpacity={0.9}>       
                <CustomImage source={require('../assets/img/price_lowest_to_high.png')}/>
                <Text  style={styles.buttonText}>{choosenSort}</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity  
            style={styles.searchButtonLast}
            onPress={showListHandler}
            activeOpacity={0.9}>
                <CustomImage 
                style={styles.listGridImage}
                source={showList?require('../assets/img/grid.png'):require('../assets/img/list.png')}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default SearchItemsHeader

const styles = StyleSheet.create({
    container:
    {
        width:width,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomColor:'black',
        borderBottomWidth:0.3,
        paddingStart:10,
        flex:0.1
    },
    searchButton:
    {
        display:'flex',
        flexDirection:'row',
        gap:3,
    },
    searchButtonLast:
    {
    
    },
    buttonText:
    {
        color:'#222222',
        fontSize:14,
        fontFamily:'Metropolis-Medium'
    },
    listGridImage:
    {
        width:25,
        height:25,
        marginEnd:20
    }
})