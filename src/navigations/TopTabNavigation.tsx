import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { TopTabNavigatorParamList } from "./types"
import CategoriesMen from "../screens/Categories/CategoriesMen"
import CategoriesWomen from "../screens/Categories/CategoriesWomen"
import CategoriesKids from "../screens/Categories/CategoriesKids"
import {View,TouchableOpacity,Text,Animated, StatusBar, StyleSheet, Dimensions} from 'react-native'
import { MaterialTopTabBarProps,MaterialTopTabDescriptorMap } from '@react-navigation/material-top-tabs';
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';



const Tab=createMaterialTopTabNavigator<TopTabNavigatorParamList>()
const width=Dimensions.get('window').width

interface TabBarProps extends MaterialTopTabBarProps{
state:TabNavigationState<ParamListBase>;
descriptors:MaterialTopTabDescriptorMap;
navigation: NavigationHelpers<ParamListBase>;
position: Animated.AnimatedInterpolation;
}



const TopTabNavigation = () => {
  return (
    <>
    <StatusBar 
    barStyle={'dark-content'}
    />
     <Tab.Navigator
    initialRouteName="Men"
    id="Men"
    backBehavior="firstRoute"
    screenOptions={{
        tabBarShowLabel: true,
      }}
      tabBar={props=><MyTabBar {...props}/>}
    >
         <Tab.Screen name="Men" component={CategoriesMen}/> 
         <Tab.Screen name="Women" component={CategoriesWomen}/>
        <Tab.Screen name="Kids" component={CategoriesKids}/> 
    </Tab.Navigator>
    </>
  )
}

function MyTabBar({ state, descriptors, navigation, position }:TabBarProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
      
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={styles.buttonStyle}
                  key={route.name}
                >
                  <Text style={styles.buttonText}>
                    {label}
                  </Text>
                  {isFocused&&<View style={styles.underline}
                  ></View>}
                  <Text>
                  </Text>
                </TouchableOpacity>
              );
      })}
    </View>
  );
}


  
const styles=StyleSheet.create({
  buttonStyle:
  {
    backgroundColor:'white',
    flex:1,
    height:width*0.15,
    borderColor:'black',
    borderBottomWidth:0.1,
  },
  buttonText:
  {
    color:'#222222',
    fontSize:20,
    margin:'auto',
    paddingBottom:5
  },
  underline:
  {
    position:'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    backgroundColor: '#DB3022',
  },
})



export default TopTabNavigation

