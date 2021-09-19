import { useRef, useState } from 'react';
import {collection,addDoc, getFirestore} from 'firebase/firestore'

import { getDownloadURL, getStorage,ref, uploadBytes} from 'firebase/storage';
import { Box, Button,FormControl,FormLabel,Input, useToast} from '@chakra-ui/react';
import ImageGrid from './components/ImageGrid';


const db=getFirestore();
const storage=getStorage();


const AlbumForm=()=> {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const toast=useToast();
    const fileRef=useRef();
       const handleChange=(e)=>{
     setFile(e.target.files[0])
     console.log('e.t',e.target.files[0])
     console.log('files',file)
    }
     const onUpload=async ()=>{
     if(!file){
    toast({
          position: "bottom-left",
          render: () => (
            <Box color="white" p={3} bg="red">
              Please select file..
            </Box>
          ),
        })
       return
     }
       setIsloading(true);
        const imgref=ref(storage,file.name);
       await uploadBytes(imgref,file).then((snapshot)=>{
            getDownloadURL(imgref).then((u)=>{
              //url.push(u);
              setUrl([...url,u]);
              console.log("upload",url)
              
            })
            }).catch((err)=>console.log(err))
           
           setFile(null);
            fileRef.current.value='';
            setIsloading(false);
       }
       

    const handleClick=async()=>{
      if(!(url.length>0 && name && description))
      { toast({
          position: "bottom-left",
          render: () => (
            <Box color="white" p={3} bg="red">
              Please Fill all fields
            </Box>
          ),
        })
      return

      }
const collectionRef=collection(db,'collection');
const data={name:name,
description:description,
images:url}

const docref=await addDoc(collectionRef,data);
toast({
          position: "top",
          render: () => (
            <Box color="white" p={3} bg="green">
              Album Created Successfully
            </Box>
          ),
        })
setName('');
setDescription('');
setUrl([]);
}
  return (
    <Box p={10} bg='gray.100' >
      <FormControl  isRequired>
       <FormLabel>Album/Collection name</FormLabel>
      <Input placeholder="Album name" value={name} onChange={(e)=>setName(e.target.value)}
       type='text' bg='white'/>
      </FormControl>
      <FormControl  isRequired mb={5}  >
       <FormLabel>Description</FormLabel>
      <Input placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}
       type='text' bg='white' />
      </FormControl>
      <ImageGrid imageList={url} size={150} p={5} sx={5}  c={6}/>

      <FormControl  >
       <FormLabel>Image</FormLabel>
      <Input ref={fileRef} type='file' onChange={handleChange} placeholder="Choose an Image" accept='image' bg='white' />
      </FormControl>

    
    
     <Button mt={5} colorScheme="green" variant="solid" onClick={onUpload} isLoading={isloading}
     loadingText="Uploading Image .."
     >
    Add Image
    </Button>
    <br></br>
    
    {url.length>0? (<Button m={5} colorScheme="teal" variant="solid" onClick={handleClick}>Create Album</Button>):(<div>Select Alteast one image to create Album</div>)}
    </Box >
  );
}
export default AlbumForm;

