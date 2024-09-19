import { StyleSheet, Text, View,Dimensions, ImageSourcePropType, ImageBackground} from 'react-native'
import React, { PureComponent } from 'react'
import { searchItemProps } from '../navigations/types'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomImage from './CustomImage'
import CustomButton from './CustomButton'

const width=Dimensions.get('window').width
const height=Dimensions.get('window').height

type listSearchItemSpecificProps=
{
    item:searchItemProps,
    active_heart:ImageSourcePropType,
    in_active_heart:ImageSourcePropType,
    star_img:ImageSourcePropType
}


class ListSearchItem extends PureComponent<listSearchItemSpecificProps>
{
    constructor(props:listSearchItemSpecificProps)
    {
        super(props)
        this.state={
            isFav:props?.item?.addedToFavorites
        }
    }
    render()
    {
         const {item,active_heart,in_active_heart,star_img}=this.props
         const starsArray=Array(Number(item?.stars)).fill(0)
         return(
                 <View style={styles.itemContainer} key={item.index}>
                <View style={styles.itemImg}>
                    <ImageBackground
                   // source={item?.img}
                    source={{uri:String(item?.img)}}
                    style={styles.backgroundImgView}
                    />
                </View>
                <View style={styles.itemData}>
                    <View style={{marginBottom:-5}}>
                        <Text style={styles.blackword}>{item?.blackword}</Text>
                    </View>
                    <View>
                        <Text>{item?.grayword}</Text>
                    </View>
                    <View style={styles.descHeader}> 
                            {
                                starsArray.map((_,index)=>(
                                    <CustomImage key={index} source={star_img} style={styles.star_img}/>
                                ))
                            }
                    </View>
                    <View>
                        <Text style={styles.priceText}>{item?.price}{`$`}</Text>
                    </View>
                </View>
                <View style={styles.heartView}>
                    <CustomButton 
                    isImg
                    imgStyle={styles.heart_img}
                    source={this.state.isFav?active_heart:in_active_heart}
                    onPress={()=>this.setState({isFav:!this.state.isFav})}
                    />
                </View>
            </View>
         )
    }
}

const styles=StyleSheet.create({
    itemContainer:
    {
        flex:1,
        backgroundColor:'white',
        width:width*0.95,
        margin:'auto',
        flexDirection:'row',
        justifyContent:'flex-start',
        borderRadius:20,
        gap:20
    },
    itemImg:
    {

    },
    itemData:
    {
        flexDirection:'column',
        justifyContent:'flex-start',
        marginTop:10,
        gap:5
    },
    backgroundImgView:
    {
        width:width/5,
        aspectRatio:0.75,
        resizeMode:'center'
    },
    descHeader:
    {
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        gap:3,
    },
    blackword:
    {
        color:'#222222',
        fontSize:16
    },
    priceText:
    {
        color:'#222222',
        fontSize:16
    },
    heartView:
    {
        position:'absolute',
        top:width*0.2,
        left:width*0.8
    },
    heart_img:
    {
        width:50,
        height:50,
    }
})

export default ListSearchItem