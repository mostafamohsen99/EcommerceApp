import { StyleSheet, Text, View,Dimensions, ImageSourcePropType,KeyboardAvoidingView,ImageURISource,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import firestore from '@react-native-firebase/firestore';
import ActionSheet, { SheetManager, useSheetPayload } from 'react-native-actions-sheet'
import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'
import CustomImage from '../components/CustomImage'
import {launchImageLibrary,ImageLibraryOptions,Asset} from 'react-native-image-picker'
import { useDispatch,useSelector } from 'react-redux'
import { AppDispatch,RootState } from '../redux/store'
import {newComment} from '../redux/CommentsSlice'
import {commentsProps} from '../navigations/types'
import { firebase } from '@react-native-firebase/auth';

const width=Dimensions.get('window').width
const height=Dimensions.get('window').height

const AddComment = () => {
    const payload=useSheetPayload('AddComment')
    const uid=useSelector((state:RootState)=>state.users.uid)
    const dispatch=useDispatch<AppDispatch>()
    const[addNewCom,setAddNewCom]=useState<commentsProps>({ 
        id:'',
        name:'',
        stars:'',
        date:'',
        profileImg:'',
        commentDesc:'',
        imgs:[]})
    const[isRated,setIsRated]=useState<number>(0)
    const [imageUris, setImageUris] = useState<string[]>([]);
    const[descStr,setDescStr]=useState<string>('')
    const starsImg=Array(5).fill(0)
    const [heightVal,setHeightVal]=useState<Number>(650)
    const activeStar:ImageSourcePropType=require('../assets/img/activeSecStar.png')
    const inactiveStar:ImageSourcePropType=require('../assets/img/inactiveSecStar.png')

    const selectImage=()=>{
        const options:ImageLibraryOptions={
            mediaType:'photo',
            includeBase64:false
        }

        launchImageLibrary(options,(response)=>{
            if(response.didCancel)
                console.log('User cancel Image picker')
            else if(response.errorCode)
                console.log('Image Picker Error:',response.errorCode)
            else if(response.assets&&response.assets.length>0)
            {   
                const selectedImageUri=response.assets[0].uri??null
                if(selectedImageUri)
                {
                    const imageWithId={img:selectedImageUri,id:String(Math.random()*1000)}
                    setImageUris((prevUris)=>[...(prevUris??[]),imageWithId])
                    console.log('image',imageUris)
                }
                
            }
        })
    }
    const addCommentHandler=async ()=>{
        const date=new Date()
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

       const userRef=firestore().collection('Users').doc(uid)
       const addCommRef=await firestore().collection('Comments').add({
            userRef:userRef,
            stars:String(isRated),
            date:formattedDate,
            commentDesc:descStr,
            imgs:imageUris
       })
       console.log('addCommRef',addCommRef.id)
       const updateRateReview=firestore().collection('RateReviews').doc(payload?.itemId)
       updateRateReview.update({
        commentRef:firebase.firestore.FieldValue.arrayUnion(addCommRef)
       }).then(()=>{
        console.log('Reference added to array successfully')
       }).catch((error)=>{
        console.error('Error adding reference to array',error)
       })
       const item:boolean=payload.commentAdded
       payload.fn(!item)
        setAddNewCom(addNewCom=>({
            ...addNewCom,
            id:String(Math.floor(Math.random()*1000000000)),
            name:'Mostafa Deeb',
            stars:String(isRated),
            date:String(formattedDate),
            profileImg:require('../assets/img/Profile_Img_Comments/img_1.png'),
            commentDesc:descStr,
             imgs:imageUris
        }))
    }
    useEffect(()=>{
        if(addNewCom.id&&addNewCom.commentDesc&&addNewCom.date&&addNewCom.name&&addNewCom.profileImg&&addNewCom.stars)
        {
                console.log('here')
                console.log('addNewCom',addNewCom)
                dispatch(newComment(addNewCom))
                SheetManager.hide('AddComment')
        }

    },[addNewCom])

  return (
    <ActionSheet
    containerStyle={{ 
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'#F6F6F6',
        flex:0.8
      }}
    >
        <KeyboardAvoidingView
        behavior='height'
        style={{flex:1}}
        >
        <View style={{marginHorizontal:'auto',marginBottom:10}}>
            <Text style={styles.headerStyle}>What is your rate? </Text>
        </View>
        <View style={{flexDirection:'row',gap:30,marginTop:10,width:width*0.8,marginStart:20}}>
        {
            starsImg.map((_,index)=>  
            {
                return(
                 <CustomButton
                 key={index}
                 onPress={()=>setIsRated(index+1)}
                 isImg
                 source={isRated>index?activeStar:inactiveStar}
                 />
                )
            }
            )
        }
        </View>
        <View style={styles.secHeaderStyle}>
            <Text style={styles.secHeaderStyleText}>Please share your opinion
            about the product</Text>
        </View>
        <View style={{marginTop:20}}>
            <CustomTextInput
            onFocus={()=>setHeightVal(height)}
            onBlur={()=>setHeightVal(650)}
            value={descStr}
            multiline={true}
            numberOfLines={8}
            textAlignVertical='top'
            placeholder='your review'
            onChangeText={setDescStr}
            validity={Boolean(descStr.length>0)}
            />
        </View>
        <View style={styles.commentImgView}>
            { imageUris.map((item,index)=>  {
                return(<View  key={index} style={styles.addPhotosView}>
                  <Image
                  key={index}
                  source={{uri:item?.img}}
                  style={{width:100,height:100}}
                  />
            </View>)})}
            <View style={styles.addPhotosView}>
                <View>
                    <CustomButton 
                    isImg 
                    source={require('../assets/img/camera.png')}
                    onPress={selectImage}
                    />
                </View>
                <Text style={styles.addPhotos}>Add your photos</Text>
            </View>
        </View>
        <CustomButton
                buttonStyle={styles.cartButtonStyle}
                onPress={addCommentHandler}
                title='SEND REVIEW' 
                textStyle={styles.cartTextStyle}
                textColor='white'
         />
        </KeyboardAvoidingView>
    </ActionSheet>
  )
}

export default AddComment

const styles = StyleSheet.create({
    headerStyle:
    {
        color:'#222222',
        fontFamily:'Metropolis-SemiBold',
        fontWeight:'400',
        fontSize:20,
        marginTop:30,
    },
    secHeaderStyle:
    {
        width:width*0.65,
        marginStart:40,
        marginTop:30
    },
    secHeaderStyleText:
    {
        margin:'auto',
        fontSize:18,
        color:'black',
        fontFamily:'Metropolis-SemiBold'
    },
    commentImgView:
    {
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:20,
        gap:20
    },
    addPhotosView:
    {
        flexDirection:'column',
        backgroundColor:'white',
        gap:15,
        borderRadius:10,
        paddingVertical:10
    },
    cartButtonStyle:
    {
      marginEnd:12,
      paddingVertical:14,
      backgroundColor:'#DB3022',
      borderRadius:20,
      marginTop:50,
      marginBottom:10
    },
    cartTextStyle:
    {
      fontSize:16,
      fontWeight:'400',
      fontFamily:'Metropolis-Medium'
    },
    addPhotos:
    {
        color:'#222222',
        fontWeight:'400',
        fontFamily:'Metropolis-SemiBold'
    }
})