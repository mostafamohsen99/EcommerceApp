import { ImageBackground, StyleSheet, Text, View,Dimensions, ImageSourcePropType, TouchableOpacity} from 'react-native'
import React, { PureComponent,useState } from 'react'
import {saleItemProps } from '../navigations/types'
import CustomImage from './CustomImage'
import CustomButton from './CustomButton'



const width=Dimensions.get('window').width
const height=Dimensions.get('window').height

type saleItemSpecificProps=
{
    item:saleItemProps,
    active_heart:ImageSourcePropType,
    in_active_heart:ImageSourcePropType,
    star_img:ImageSourcePropType
}


class NewItem extends PureComponent<saleItemSpecificProps>{
    constructor(props:saleItemSpecificProps)
    {
        super(props)
        this.state={
            isFav:props.item.added_to_favorites
        }
    }
    render(){
        const {item,active_heart,in_active_heart,star_img}=this.props;
        const starsArray=Array(Number(item?.stars)).fill(0)
        return(
            <View style={styles.itemContainer}>
              <ImageBackground
                source={item?.cloth_image}
                style={styles.backgroundImgView}
              >
                 <View style={styles.percentageView}>
                        <Text style={styles.percentageText}>{item?.percentage}{`%`}</Text>
                 </View>
                 <CustomButton 
                 isImg
                 imgStyle={styles.heart_img}
                 source={this.state.isFav?active_heart:in_active_heart}
                 onPress={()=>this.setState({isFav:!this.state.isFav})}
                 >
                        {/* <CustomImage
                        source={item?.added_to_favorites?active_heart:in_active_heart}
                        style={styles.heart_img}
                        /> */}
                 </CustomButton>
                </ImageBackground>
                <View style={styles.descView}>
                        <View style={styles.descHeader}> 
                            {
                                starsArray.map((_,index)=>(
                                    <CustomImage key={index} source={star_img} style={styles.star_img}/>
                                ))
                            }
                        <View style={styles.rateNum}>
                                <Text>{`(`}{item?.rate}{`)`}</Text>
                        </View>
                        </View>
                        <View style={styles.descParagraphs}>
                                <Text style={styles.gray_word}>{item?.gray_word}</Text>
                                <Text style={styles.black_word}>{item?.black_word}</Text>
                                <View style={styles.descDiscounts}>
                                    <Text style={styles.before_discount}>{item?.before_discount}{`$`}</Text>
                                    <Text style={styles.after_discount}>{item?.after_discount}{`$`}</Text>
                                </View>
                        </View>
                </View>
            </View>
        )
    }
}

export default NewItem

const styles = StyleSheet.create({
    itemContainer:
    {
        flex:1
    },
    backgroundImgView:
    {
        width:width/2.5,
        aspectRatio:0.8,
        resizeMode:'center'
    },
    percentageView:
    {
        backgroundColor:'#DB3022',
        width:50,
        borderRadius:10,
        padding:6,
        marginStart:10,
        marginTop:10
    },
    percentageText:
    {
        color:'white',
        margin:'auto'
    },
    heart_img:
    {
        width:50,
        height:50,
        top:140,
        left:50,
    },
    descView:
    {
        display:'flex',
        flexDirection:'column',
        marginTop:20,
        gap:10
    },
    descHeader:
    {
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        gap:3,
        marginStart:10
    },
    star_img:
    {
        width:20,
        height:20
    },
    descParagraphs:
    {
        display:'flex',
        flexDirection:'column'
    },
    descDiscounts:
    {
        display:'flex',
        flexDirection:'row',
        gap:10,
        padding:10
    },
    gray_word:
    {
        color:'#9B9B9B',
        fontSize:16,
        fontFamily:'Metropolis-Medium'
    },
    black_word:
    {
        color:'#222222',
        fontFamily:'Metropolis-Bold',
        fontSize:20
    },
    before_discount:
    {
        color:'#9B9B9B',
        fontFamily:'Metropolis-Medium',
        fontSize:20,
        textDecorationColor:'#9B9B9B',
        textDecorationLine:'line-through',
        textDecorationStyle:'solid',
    },
    after_discount:
    {
        fontSize:20,
        fontFamily:'Metropolis-Medium',
        color:'#DB3022'
    }
})