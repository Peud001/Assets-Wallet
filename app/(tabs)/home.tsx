import { ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Dashboard1 from '../../components/Dashboard1'
import Dashboard2 from '../../components/Dashboard2'
import Dashboard3 from '../../components/Dashboard3'
import { useColorScheme } from 'nativewind'

const HomeScreen = () => {

  const {colorScheme} = useColorScheme()

  return (
    <SafeAreaView className='dark:bg-bgDarkSecondary dark:text-textPrimary'>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Dashboard1/>
      <Dashboard2/>
      <Dashboard3/>
      <StatusBar
        style={colorScheme === 'light' ? 'dark' : 'light'}
      />

       </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen