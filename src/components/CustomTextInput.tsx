import { StyleSheet,Text,View,TextInputProps,Dimensions,TextInput, Image, ImageSourcePropType, ImageStyle, ViewStyle} from 'react-native'
import React,{useState} from 'react'
import CustomImage from './CustomImage';


const {width}=Dimensions.get('window');
interface CustomTextInputProps extends TextInputProps
{
    label?:string,
    value:any,
    img?:ImageSourcePropType,
    imgStyle?:ImageStyle|undefined,
    TextInputStyle:ViewStyle,
    isFocus?:boolean,
    isBlur?:boolean,
    desc?:string,
    validity?:boolean
}

const CustomTextInput:React.FC<CustomTextInputProps> = ({label,value,isFocus,isBlur,desc,validity,img,imgStyle,TextInputStyle,...props}) => {
  return (
    <View style={[styles.container,TextInputStyle,isBlur&&!validity?{borderColor:'red',borderWidth:2}:{}]}>
        {label&&<Text style={styles.label}>{label}</Text>}
        <View style={styles.rowInput}>
                {img && <CustomImage source={img} style={imgStyle}/>}
                <TextInput
                style={[styles.input]}
                secureTextEntry={label==='Password'?true:false}
                {...props}
                />
                <View style={[styles.signStyle]}>
                    {isFocus?
                    validity?(
                        <Image source={require('../assets/img/right.png')}/>
                    ):(
                        <Image source={require('../assets/img/wrong.png')}/>
                    ):(<></>)
                    }
                </View>
        </View>
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    container:{
        width:width*0.92,
        borderRadius:20,
        backgroundColor:'white',
    },
    label:
    {
        fontSize:width*0.05,
        marginTop:width*0.02,
        marginLeft:width*0.04,
    },
    input:
    {
        padding:width*0.01,
        width:width*0.75,
        fontSize:width*0.05,
        marginLeft:width*0.04,
        marginBottom:width*0.02,
        color:'black',
        borderBottomWidth:0,
    },
    rowInput:
    {
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
        gap:15
    },
    signStyle:
    {
     
    }
})