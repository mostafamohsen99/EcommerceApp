import { StyleSheet, Text, View,TouchableOpacity,GestureResponderEvent, ViewStyle, TextStyle, Image,ImageSourcePropType,ImageStyle,Dimensions } from 'react-native'
import React from 'react'
import CustomImage from './CustomImage'


const {width}=Dimensions.get('window')

interface CustomButtonProps
{
    title?:string,
    onPress?:(event:GestureResponderEvent)=>void,
    backgroundColor?:string,
    textColor?:string,
    buttonStyle?:ViewStyle,
    textStyle?:TextStyle,
    isImg?:boolean,
    source?:ImageSourcePropType|undefined,
    imgStyle?:ImageStyle|undefined,
    disabled?:false
}

const CustomButton:React.FC<CustomButtonProps> = ({
    title,
    onPress,
    backgroundColor,
    textColor,
    buttonStyle,
    textStyle,
    isImg=false,
    source,
    imgStyle,
    disabled
}) => {
  return (
    <TouchableOpacity
    style=
    {[styles.button,
    {backgroundColor:disabled?'white':backgroundColor},
    disabled?styles.disabledView:buttonStyle]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={1}
    >
        {
            isImg && !title?(
                <CustomImage source={source} style={[styles.image,imgStyle]} containerStyle={buttonStyle}/>
            ):
            (
            <View style={{flexDirection:'row',gap:5}}>
              {isImg && <CustomImage source={source} style={[styles.image,imgStyle]} containerStyle={buttonStyle}/>}
            <Text 
            style=
            {[styles.text,
             textStyle,
            {color:disabled?'black':textColor}]}>
                {title}
            </Text>   
            </View>
            )
        }
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button:
    {
        borderRadius:5,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    text:
    {
        fontSize:16,
        color:'white'
    },
    image:
    {
   
    },
    disabledView:
    {
        borderColor:'#708090',
        borderWidth:2,
        backgroundColor:'white',
        width:width*0.94,
        borderRadius:50,
        padding:20,
        marginStart:16,
        marginTop:23,
        margin:'auto',
    }
})