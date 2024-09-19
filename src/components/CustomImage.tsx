import { StyleSheet, Text, View,Image,ImageSourcePropType,ViewStyle,ImageStyle,ImageURISource} from 'react-native'
import React, { ReactNode } from 'react'

interface CustomImageProps
{
  source:ImageSourcePropType|string,
  uri?:boolean,
  style:ImageStyle,
  containerStyle?:ViewStyle,
  children?:ReactNode,
  key:number
}

const CustomImage:React.FC<CustomImageProps> = (
  {
  source,
  style,
  containerStyle,
  uri
  }
) => {
  return (
    <View style={[styles.container,containerStyle]}>
  
     <Image source={uri?{uri:String(source)}:source} style={[style,styles.image]}/>
    </View>
  )
}

export default CustomImage

const styles = StyleSheet.create({
  container:
  {
    justifyContent:'center',
    alignItems:'center'
  },
  image:
  {
 
  }
})