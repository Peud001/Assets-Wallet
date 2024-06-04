import { ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Dashboard1 from '../../components/Dashboard1'
import Dashboard2 from '../../components/Dashboard2'
import { LinearGradient } from 'expo-linear-gradient'
import Dashboard3 from '../../components/Dashboard3'

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
        colors={['#290067', '#4600AC']}
        start={{x:0, y:0}}
        end={{x:1, y:0}}
        >
      <Dashboard1/>
      <Dashboard2/>
      <Dashboard3/>
       <StatusBar
       backgroundColor='#290067'
       style='light'
       />
       </LinearGradient>
       </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen