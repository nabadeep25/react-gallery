import React from 'react';
import { Link } from 'react-router-dom';
import AlbumForm from './AlbumForm';
import { Image,Box, SimpleGrid,Text} from "@chakra-ui/react"
import { useSelector } from 'react-redux';

import ImageGrid from './components/ImageGrid';

const Home=()=> {
    const albums=useSelector((state)=>state.albumReducer.albums)
  
  return (
    <Box>
      <Text textAlign='center' fontSize='xxx-large' fontFamily='mono'
      fontWeight='bold'
       >Gallery Apllication</Text>
       {albums.map((album)=>{
         return (
           <Box key={album.id} bg='gray.200' borderRadius={20} mb={10} p={10} >
           <Link to={`${album.id}`}>
           <Text fontSize="50px" color="blue" textTransform='capitalize'>
            {album.name}
           </Text>
           <Text fontSize="30px" color="blue" textTransform='capitalize'>
            {album.description}
           </Text>
            </Link>
        
       
      <ImageGrid imageList={album.images} size={300} />         
         
          
           </Box>
         )
       })}
       
     
   
     <AlbumForm/>
   
    </Box>
  );
}
export default Home;