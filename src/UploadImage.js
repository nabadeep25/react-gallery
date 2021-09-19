import { Button,Input,useToast,VStack,Box } from '@chakra-ui/react';
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage,ref, uploadBytes} from 'firebase/storage';
import React, { useRef, useState } from 'react';

const storage=getStorage();
const db=getFirestore();
const UploadImage=({album})=> {
    const [file, setFile] = useState(null)
   const [isLoading,setIsLoading]=useState(false);
    const fileref=useRef()
    const toast=useToast();
    const handleChange=(e)=>{
     setFile(e.target.files[0])
    }
    const onUpload=async()=>{
      if(!file){
          toast({
          position: "bottom-left",
          render: () => (
            <Box color="white" p={3} bg="red">
              Select File Please
            </Box>
          ),
        }) 
      return;}
    setIsLoading(true);
        const imgref=ref(storage,file.name);
     await uploadBytes(imgref,file).then((snapshot)=>{
            getDownloadURL(imgref).then((u)=>{
           updateUrl(u).then(()=>console.log("uploaded")) })
            }).catch((err)=>console.log(err))
           
           fileref.current.value='';
        setIsLoading(false);
       }
       const updateUrl=async(u)=>{
        const albumRef=doc(db,'collection',album);
            await updateDoc(albumRef,{
                images:arrayUnion(u)})
       }
  return (
    <VStack  >
    <Input mt={10} type='file' ref={fileref} onChange={handleChange} placeholder='Choose a image'
     accept='image' width='70vw' bg='white'/>
    <Button onClick={onUpload} colorScheme='green'  m={10}
    isLoading={isLoading} loadingText='Uploading..'
    > Add Image to Collection</Button>
    
    </VStack>
  );
}
export default UploadImage;