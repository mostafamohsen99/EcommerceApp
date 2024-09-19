import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SignIn from "../screens/BeforeLogin/SignIn";
import SignUp from "../screens/BeforeLogin/SignUp";
import ForgotPassword from "../screens/BeforeLogin/ForgotPassword";
import NewPassword from "../screens/BeforeLogin/NewPassword";
import { SignStackParamList } from "./types";
import TabNavigation from "./TabNavigation";



const SignStack=createStackNavigator<SignStackParamList>()

const SignStackNavigation=()=>{
    return(
        <SignStack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
            headerShown:false
        }} >
            <SignStack.Screen name="SignUp" component={SignUp}/>
            <SignStack.Screen name="SignIn" component={SignIn}/>
            <SignStack.Screen name="ForgotPassword" component={ForgotPassword}/>
            <SignStack.Screen name="NewPassword" component={NewPassword}/>
            <SignStack.Screen name="home" component={TabNavigation}/>
        </SignStack.Navigator>
    )
}

export default SignStackNavigation