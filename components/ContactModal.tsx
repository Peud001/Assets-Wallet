import { View, Text, Image, TouchableOpacity, Modal, TextInput, ActivityIndicator, FlatList, ImageSourcePropType } from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '../constants/images';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './FormInput';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseDb, firebaseStorage } from '@/services/auth';
import { DocumentData, addDoc, collection, getDocs } from 'firebase/firestore';
import Toast from 'react-native-root-toast';
import { getContacts } from '@/lib/fetchContacts';

export type ModalInputType = {
  id: string
  firstName: string
  lastName: string
  accountNumber: string
  image: string
}

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  accountNumber: z.string().min(10, 'Account number is required').max(50, 'Account number is too long')
})

const RecentContact = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      id:'',
      firstName: '',
      lastName: '',
      accountNumber: '',
      image: ''
    },
    resolver: zodResolver(formSchema)
  })


  const handlePress = async(data: ModalInputType) => {
    setIsLoading(true)
    const validatedData = formSchema.parse(data)
   try{
    //Image.resolveAssetSource resolves the locally added image and .uri extract uri from the resolved image
    const finalImage = imageUri || Image.resolveAssetSource(images.user).uri 
    //converting the image to blob before saving on the database
    const contactImage = await fetch(finalImage)
    const contactImageBlob = await contactImage.blob()
    const storageRef = ref(firebaseStorage, `ContactImages/${Date.now()}_${validatedData.firstName}_${validatedData.lastName}`)
    //uploading the image onto the storage
    const uploadedImage = await uploadBytes(storageRef, contactImageBlob)
    const downloadUrl = await getDownloadURL(uploadedImage.ref)
    const collectionRef = collection(firebaseDb, 'contactData')
    const storeDoc = await addDoc(collectionRef, {...validatedData, image: downloadUrl, id: Date.now()})
    if (storeDoc){
      Toast.show('Beneficiary Added successfully', {
        duration: Toast.durations.LONG,
      });
    }
    reset()
    setImageUri('')
    setIsVisible(false)
    getContacts()
   }catch(error){
    console.log(error)
    Toast.show('Failed, Please try again', {
      duration: Toast.durations.LONG,
    });
   }finally{
    setIsLoading(false)
   }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    })

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
      >
        <View className='flex-1 justify-center items-center bg-white bg-[#00000090]'>
          <View className='bg-white p-5 rounded-lg w-[90%]'>
          <TouchableOpacity
          disabled={isLoading} 
          className='items-end'
          onPress={() => {
            setIsVisible(false)
            setImageUri('')
            reset()
          }}
          >
            <AntDesign name="closecircleo" size={28} color="black" />
            </TouchableOpacity>
            <View>
            <TouchableOpacity
            onPress={pickImage}
            disabled={isLoading}
            >
           {
            imageUri?  <Image
            source={{uri: imageUri}}
            className='w-[100px] h-[100px] self-center mb-4 rounded-full'
            /> :  <Image
            source={images.user}
            className='w-[100px] h-[100px] self-center mb-4'
            />
           }
            </TouchableOpacity>
             <FormInput
             control={control}
             name='firstName'
             placeholder='First Name'
             isLoading={isLoading}
             keyboardType='default'
             />
             <FormInput
             control={control}
             name='lastName'
             placeholder='Last Name'
             isLoading={isLoading}
             keyboardType='default'
             />
             <FormInput
             control={control}
             name='accountNumber'
             placeholder='Account Number'
             isLoading={isLoading}
             keyboardType='numeric'
             />
              
            </View>
            <TouchableOpacity
              onPress={handleSubmit(handlePress)}
              className='mb-4 border rounded-xl p-2'
            >
              <Text className=' text-center'>{isLoading?  <ActivityIndicator size="large" color="#0000ff" /> : 'Add beneficiary'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View>
        <View className='flex-row justify-between items-center'>
          <Text className='py-5 text-lg text-gray-400 font-bold'>Contacts</Text>
          <TouchableOpacity onPress={() => setIsVisible(prev => !prev)} className='flex-row bg-btnBg p-3 items-center rounded-2xl'>
            <Ionicons name="add-circle-outline" size={24} color="gray" />
            <Text className='text-gray-400 font-bold text-lg pl-2'>Add</Text>
          </TouchableOpacity>
        </View>
        <View>
        </View>
      </View>
    </View>
  );
};

export default RecentContact;
