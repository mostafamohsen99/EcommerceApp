import { StyleSheet, Text, View,Dimensions} from 'react-native'
import React from 'react'

const width=Dimensions.get('window').width
const SummerSales = () => {
  return (
    <View style={styles.summerSalesView}>
      <Text style={styles.summerSalesText}>Summer Sales</Text>
      <Text style={styles.Upto50Off}>Up to 50% off</Text>
    </View>
  )
}

export default SummerSales

const styles = StyleSheet.create({
    summerSalesView:
    {
        backgroundColor:'#DB3022',
        width:width*0.95,
        marginTop:20,
        margin:'auto',
        borderRadius:20,
        paddingVertical:30,
        marginBottom:10
    },
    Upto50Off:
    {
        color:'white',
        fontSize:18,
         fontFamily:'Metropolis-light',
         margin:'auto'
    },
    summerSalesText:
    {
        color:'white',
        fontSize:26,
        textTransform:'uppercase',
        fontFamily:'Metropolis-Medium',
        margin:'auto'
    }
})