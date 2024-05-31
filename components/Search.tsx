import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

type searchType = {
    value: string
    placeholder: string
    handleChange: (text: string) => void
}

const Search = ({value, placeholder, handleChange}: searchType) => {
  return (
    <View className='w-full h-14 bg-[#E5E4E2] px-4 rounded-2xl flex-row items-center justify-between border  border-transparent focus:border-[#290067]'>
      <TextInput
      className='flex-1 font-semibold'
      value={value}
      placeholder={placeholder}
      onChangeText={handleChange}
      />
      <TouchableOpacity>
      <FontAwesome name='search' size={24} color='gray'/>
      </TouchableOpacity>
    </View>
  )
}

export default Search