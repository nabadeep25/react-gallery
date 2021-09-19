import { Box, Image, SimpleGrid } from '@chakra-ui/react';



const ImageGrid=({imageList,size,p=10,sx=5,sy=5,bg='white',c=4})=> {
  return (
    <>
    <SimpleGrid columns={c} spacingX={sx} spacingY={sy}
    display='flex'
    justifyContent='center'
    
    >
         {imageList?.map((img)=>(
            <Box  bg={bg} borderRadius={size/20}
             width={size}
            height={size}
            display='flex'
            justifyContent='center'
            
            >
         <Image 
         src={img} 
         alt="Image" 
        height={size}
         objectFit='contain'
          p={p}
         
         />
        </Box>
         ))}
         </SimpleGrid>
    
    </>
  );
}
export default ImageGrid;