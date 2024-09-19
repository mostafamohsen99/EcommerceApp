import { StyleSheet, Text, View,Dimensions,Keyboard,TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import CustomImage from '../../components/CustomImage'
import CustomTextInput from '../../components/CustomTextInput'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { SignStackParamList } from '../../navigations/types'
import { StackScreenProps } from '@react-navigation/stack'
import { getAuth,sendPasswordResetEmail} from '@react-native-firebase/auth'


const {width}=Dimensions.get('window')

type forgotPasswordProps=StackScreenProps<SignStackParamList,'ForgotPassword'>

const ForgotPassword = ({route,navigation}:forgotPasswordProps) => {
  const [email,setEmail]=useState<String>();
  const [changeMsg,setChangeMsg]=useState<String>()
  const [isFocusedEmail,setIsFocusedEmail]=useState<boolean|undefined>(false)
  const [isBlurredEmail,setIsBlurredEmail]=useState<boolean|undefined>(false);
  const [validEmail,setValidEmail]=useState<boolean|undefined>(false);
  const [keyboardHeight,setKeyboardHeight]=useState(0)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailError='please enter valid email'
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
  emailRegex.test(email)?setValidEmail(true):setValidEmail(false)
},[email])

const forgotPasswordHandler=()=>{
    const auth=getAuth()
    sendPasswordResetEmail(auth,email)
    .then((result)=>{
        setChangeMsg('password changed successfully Try to login again')
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode',errorCode)
        console.log('errorMessage',errorMessage)
    })
}
//console.log('email_forgot',email)
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
                    <Text style={[styles.forgotPasswordText]}>Forgot Password</Text>
         </View>
         <View style={styles.forgotParagraph}>
          <Text style={styles.forgotParagraphText}>Please, enter your email address. You will receive a link to create a new password via email.</Text>
         </View>
         <View style={styles.textInputs}>
            <View style={styles.email}>
                <CustomTextInput 
                label='Email' 
                value={email}
                onChangeText={setEmail}
                onFocus={()=>setIsFocusedEmail(true)}
                onBlur={()=>setIsBlurredEmail(true)}
                isFocus={isFocusedEmail}
                isBlur={isBlurredEmail}
                validity={validEmail}
                maxLength={30}
                />
                  <View style={{backgroundColor:'#F9F9F9'}}>
                  {isBlurredEmail&&!validEmail&&<Text style={styles.errorText}>{emailError}</Text>}
                  </View>
            </View>
          </View>
          <View style={{margin:20}}>
            <Text style={{fontSize:20,fontWeight:'400',color:'red',marginStart:10}}>{changeMsg}</Text>
          </View>
          <CustomButton 
          title='Send' 
          textColor='white' 
          backgroundColor='#DB3022'
          onPress={forgotPasswordHandler}
          textStyle={styles.textButtonStyle}
          buttonStyle={[styles.buttonStyle]}
          />
    </View>
  )
}

export default ForgotPassword

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