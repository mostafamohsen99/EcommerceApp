import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import SignStackNavigation from './SignStackNavigation'

const Navigation = () => {
  return (
    <NavigationContainer>
      <SignStackNavigation/>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})