import { Box, Image, SimpleGrid,Button, Text, useToast } from '@chakra-ui/react';
import { deleteDoc, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getStorage,ref,deleteObject } from 'firebase/storage';
import React,{useEffect, useState} from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom'
import ImageGrid from './components/ImageGrid';

import UploadImage from './UploadImage';
const db=getFirestore();
const storage=getStorage();
const Collection=()=> {
    const [imgCollection, setImgCollection] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)
    const match=useRouteMatch("/:album");
    const {album}=match.params
    const toast=useToast();
 useEffect(()=>{
     const d=onSnapshot(doc(db,'collection',album),(snapshot)=>{
       if(snapshot.data()===undefined){
         return(<Redirect to="/" />)
       }
         setImgCollection(snapshot?.data())
     })

     return d;
 },[])

const deletegallery=async()=>{
   toast({
          position: "top",
          render: () => (
            <Box color="white" p={3} bg="orange">
              Deleting Album...
            </Box>
          ),
        })
   imgCollection?.images.map((i)=>(deleteImages(i)))
  //delete whole document
   const albumRef=doc(db,'collection',album);
   await deleteDoc(albumRef)
    setIsDeleted(true);
     toast({
          position: "top",
          render: () => (
            <Box color="white" p={3} bg="green">
              Deleted
            </Box>
          ),
        })
}
const deleteImages=(url)=>{
  const fileref=ref(storage,url);
  console.log("FRef",fileref)
  deleteObject(fileref).then(()=>console.log('deleted')).catch((err)=>
  console.error(err))
}
 
  return (

    <Box w="100vw"  bgGradient="linear(to-b, green.200, teal.200)"  >
    <section>
      {isDeleted && (<Redirect to="/" />)}
  <Text textAlign='center' bg='white' width='fit-content' fontSize={40} m='auto'
  borderRadius={10}
  px={10} textTransform='capitalize'>{imgCollection.name}</Text>
  <Text textAlign='center'
  bg='white' width='fit-content' fontSize={30} m='auto' my={3}
  borderRadius={10}
  px={10}
  >{imgCollection.description}</Text>
     
   <ImageGrid imageList={imgCollection.images} size={300} />
       
     </section>
     <Button onClick={deletegallery} colorScheme='red' m={10} alignSelf='center' >Delete gallery</Button>
     <br/>
    <UploadImage album={album}/>
     
    </Box>
  );
}
export default Collection;
