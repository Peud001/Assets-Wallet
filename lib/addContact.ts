import { addDoc } from "firebase/firestore";
import Toast from "react-native-root-toast";


export const addContact = async(reference: any, data: any) => {
    const storeDoc = await addDoc(reference, data)
    if (storeDoc){
      Toast.show('Beneficiary Added successfully', {
        duration: Toast.durations.LONG,
      });
    }
}