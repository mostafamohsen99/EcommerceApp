import { StyleSheet, Text, View,Dimensions,Keyboard,TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import CustomImage from '../../components/CustomImage'
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import { StackScreenProps } from '@react-navigation/stack'
import { SignStackParamList } from '../../navigations/types'
import { getAuth,sendPasswordResetEmail} from '@react-native-firebase/auth'

const {width}=Dimensions.get('window')

type NewPasswordProps=StackScreenProps<SignStackParamList,'NewPassword'>


const NewPassword = ({route,navigation}:NewPasswordProps) => {
    const [password,setPassWord]=useState<string|undefined>()
    const [isFocusedPassword,setIsFocusedPassword]=useState<boolean|undefined>(false)
    const [isBlurredPassword,setIsBlurredPassword]=useState<boolean|undefined>(false);
    const [validPassword,setValidPassword]=useState<boolean|undefined>(false);
    const [keyboardHeight,setKeyboardHeight]=useState(0)
    const passwordError='please enter valid password including special characters'
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,}$/;
    useEffect(()=>{
        const keyboardDidShowListener=Keyboard.addListener('keyboardDidShow',(event)=>{
            setKeyboardHeight(event.endCoordinates.height)
        })
    
        const keyboardDidHideListener=Keyboard.addListener('keyboardDidHide',()=>{
            setKeyboardHeight(0)
        })
        return()=>{
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove()
        }
    },[])
    useEffect(()=>{
      passwordRegex.test(password)?setValidPassword(true):setValidPassword(false)
    },[password])

 
  return (
    <View style={styles.container}>
             <TouchableOpacity 
            style={[styles.backImgView]} 
            activeOpacity={1}
            onPress={()=>navigation.goBack()}
            >
                   <CustomImage
                    style={styles.backImg}
                    source={require('../../assets/img/icon.jpg')}
                    />
          </TouchableOpacity>
          <View style={[styles.forgotPasswordView]}>
                    <Text style={[styles.forgotPasswordText]}>New Password</Text>
         </View>
         <View style={styles.forgotParagraph}>
          <Text style={styles.forgotParagraphText}>Please, enter the new password</Text>
         </View>
         <View style={styles.textInputs}>
            <View style={styles.email}>
            <CustomTextInput 
                label='Password'
                value={password}
                onChangeText={setPassWord}
                onFocus={()=>setIsFocusedPassword(true)}
                onBlur={()=>setIsBlurredPassword(true)}
                isFocus={isFocusedPassword}
                isBlur={isBlurredPassword}
                validity={validPassword}
                maxLength={15}
                />
                <View style={{backgroundColor:'#F9F9F9'}}>
                    {isBlurredPassword&&!validPassword&&<Text style={styles.errorText}>{passwordError}</Text>}
                </View>
            </View>
          </View>
          <CustomButton 
          title='Send' 
          textColor='white' 
          backgroundColor='#DB3022'
          //onPress={confirmPassword}
          textStyle={styles.textButtonStyle}
          buttonStyle={[styles.buttonStyle]}
          />
    </View>
  )
}

export default NewPassword

const styles = StyleSheet.create({
    container:
    {
      flex:1,
      justifyContent:'flex-start',
      alignItems:'flex-start',
      flexDirection:'column'
    },
    backImgView:
    {
        flexDirection:'row',
        justifyContent:'space-around',
        width:40,
        height:undefined,
        aspectRatio:1.2,
        marginTop:52,
        marginLeft:8,
        backgroundColor:'white',
        overflow:'hidden'
    },
    backImg:
    {   
        width:'80%',
        aspectRatio:1.
    },
    forgotPasswordView:
    {
        justifyContent:'flex-start',
        marginTop:30,
        marginStart:10
    },
    forgotPasswordText:
    {
        fontSize:width*0.07,
        color:'#222222',
        fontFamily:'Metropolis-Bold'
    },
    textInputs:
    {
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginTop:23,
        gap:width*0.04,
        marginStart:20,
    },
    email:
    {

    },
    errorText:
    {
        color:'red',
        fontSize:width*0.04,
        marginLeft:width*0.04,
        marginTop:width*0.01
    },
    buttonStyle:
    {
        marginStart:16,
        marginTop:23,
        margin:'auto',
        width:width*0.94,
        borderRadius:50,
        padding:20,
    },
    textButtonStyle:
    {
        textTransform:'uppercase',
        fontSize:16,
        fontFamily:'Metropolis-Medium',
    },
    forgotParagraph:
    {
        marginStart:12,
        marginTop:84
    },
    forgotParagraphText:
    {
        fontSize:16,
        color:'#222222',
        fontFamily:'Metropolis-Medium'
    }
})