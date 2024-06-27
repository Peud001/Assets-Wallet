import { ModalInputType } from "@/components/ContactModal";
import { firebaseDb } from "@/services/auth";
import { collection, getDocs } from "firebase/firestore";

export const getContacts = async() => {
    try{
      const querySnapshot = await getDocs(collection(firebaseDb, 'contactData'))
      const contacts = querySnapshot.docs.map(doc => doc.data()) as ModalInputType[];
      return contacts
    }catch(error){
      return []
    }
  }