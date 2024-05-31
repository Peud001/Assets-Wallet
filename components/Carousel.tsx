import { View, Text, Image } from 'react-native'
import React from 'react'
import PagerView from 'react-native-pager-view'
import images from '../constants/images'

const Carousel = () => {

  return (
    <PagerView initialPage={0}>
        <View key='1'>
            <Image className='w-[100px]' source={images.promo1}/>
        </View>
        <View key='2'>
            <Image source={images.promo2}/>
        </View>
    </PagerView>
  )
}

export default Carousel