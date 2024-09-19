import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import AntDesign from 'react-native-vector-icons/AntDesign'

type CustomDropDownProps={
    items:string[],
    name:string
}

const CustomDropDown = ({items,name}:CustomDropDownProps) => {
  return (
    <View>
     <SelectDropdown
    data={items}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={styles.dropdownButtonStyle}>
                {isOpened?
                (<View> 
                    {
                     <Text style={styles.dropdownButtonTxtStyle}>{selectedItem?selectedItem:name}</Text>
                    }
                </View>):(<View>
                    <Text style={styles.dropdownButtonTxtStyle}>{selectedItem?selectedItem:name}</Text>
                </View>)}
                <View>
                    <AntDesign name={isOpened?'up':'down'} style={styles.dropdownButtonArrowStyle}/>
                </View>
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#DB3022'})}}>
          <Text>{item}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
    </View>
  )
}

export default CustomDropDown

const styles = StyleSheet.create({

    dropdownButtonStyle: {
      backgroundColor: 'white',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-around',
       alignItems: 'center',
       height:40,
       width:138,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '400',
      color: 'black',
      marginTop:10,
      fontFamily:'Metropolis',
      
    },
    dropdownButtonArrowStyle: {

      fontSize: 18,
      position:'absolute',
      top:-7,
      left:-10
    },

    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: 'red',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
})