import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigatorParamList } from "./types";
import Home from "../screens/Home/Home";
import Shop from "../screens/Shop/Shop";
import Bag from "../screens/Bag/Bag";
import Profile from "../screens/Profile/Profile";
import Favorites from "../screens/Favorites/Favorites";
import { View,Text,TouchableOpacity,StyleSheet} from "react-native";
import CustomImage from "../components/CustomImage";
import TopTabNavigation from "./TopTabNavigation";
import ShopStackNavigation from "./ShopStackNavigation";
import useTabBarVisibility from "../../Hooks/useTabBarVisibility";


const Tab=createBottomTabNavigator<BottomTabNavigatorParamList>();

const Inactive_Images=[
    require('../assets/img/tabBarIcons/Home_in_active.png'),
    require('../assets/img/tabBarIcons/Shop_in_active.png'),
    require('../assets/img/tabBarIcons/Bag_in_active.png'),
    require('../assets/img/tabBarIcons/Favorites_in_active.png'),
    require('../assets/img/tabBarIcons/Profile_in_active.png'),
]

const active_Images=[
    require('../assets/img/tabBarIcons/Home_active.png'),
    require('../assets/img/tabBarIcons/Shop_active.png'),
    require('../assets/img/tabBarIcons/Bag_active.png'),
    require('../assets/img/tabBarIcons/Favorites_active.png'),
    require('../assets/img/tabBarIcons/Profile_active.png')
]

interface MyTabBarProps{
    state?:any,
    descriptors?:any,
    navigation?:any
}

const TabNavigation=()=>{
    return(
        <Tab.Navigator
        initialRouteName="Home"
        id="Home"
        backBehavior="firstRoute"
        tabBar={props=><MyTabBar {...props}/>}
        screenOptions={{
            headerShown:false
            }}>
            <Tab.Screen name="Home" component={Home}></Tab.Screen>
            <Tab.Screen name="Shop" 
            component={ShopStackNavigation}
            options={{headerShown:false}}
            >
            </Tab.Screen>
            <Tab.Screen name="Bag" component={Bag}></Tab.Screen>
            <Tab.Screen name="Favorites" component={Favorites}></Tab.Screen>
            <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
        </Tab.Navigator>
    )
}

const MyTabBar=({state,descriptors,navigation}:MyTabBarProps)=>{
    const shouldHideTabBar=useTabBarVisibility();
    if(shouldHideTabBar)
        return ;
    return(
        <View style={{flexDirection:'row',backgroundColor:'white',paddingBottom:5,paddingTop:10,borderColor:'black',borderWidth:0.25}}>
            {
                state.routes.map((route:any,index:number)=>{
                    const {options}=descriptors[route.key]
                    const label=options.tabBarLabel!== undefined?
                    options.tabBarLabel:
                    options.title!==undefined?
                    options.title:
                    route.name 
                    const isFocused=state.index===index

                    const onPress=()=>{
                        const event=navigation.emit({
                            type:'tabPress',
                            target:route.key,
                            canPreventDefault:true
                        })

                        if(!isFocused && !event.defaultPrevented)
                        {
                            navigation.navigate(route.name,route.params)
                        }
                    }

                    const onLongPress=()=>{
                        navigation.emit({
                            type:'tabLongPress',
                            target:route.key
                        })
                    }

                    return(
                        <TouchableOpacity
                        key={route.name}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1,justifyContent:'center',marginStart:10,flexDirection:'column',padding:7}}
                       >
                                    <CustomImage
                                  //  source={require('../assets/img/tabBarIcon/')}
                                    source={!isFocused?Inactive_Images[index]:active_Images[index]}
                                    style={styles.tab_bar_img}
                                    />
                                    <Text style={[{ color: !isFocused ? '#9B9B9B' : '#DB3022' },{margin:'auto'}]}>
                                    {label}
                                    </Text>
                         </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles=StyleSheet.create({
    tab_bar_img:
    {
        width:30,
        height:30
    }
})


export default TabNavigation
