import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  VStack,
  Spinner
} from '@chakra-ui/react'
import React, { useState } from 'react';
import axios from 'axios';
import { ImFilesEmpty } from "react-icons/im";
import { useToast } from '@chakra-ui/react';

const FileUploadComponent = ({ onMalwareDetection }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleFileChange = (event) => {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
      const uploadedFile = input.files[0];
      setFile(uploadedFile);
    };
    input.click();
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    setFile(uploadedFile);
  };

  const handleFileUpload = () => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      axios.post('http://127.0.0.1:5000/check', formData)
        .then(response => {
          console.log(response);
          setLoading(false);
          toast({
            title: 'File Upload Successful',
            description: response.data,
            status: !response.data.includes('MALWARE') ? 'success' : 'error',
            duration: 5000,
            isClosable: true,
          });
          if (response.data.includes('MALWARE')) {
            onMalwareDetection(true);
          } else {
            onMalwareDetection(false);
          }
        })
        .catch(error => {
          setLoading(false);
          toast({
            title: 'Error Uploading File',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          console.error('Error uploading file:', error);
        });
    } else {
      setLoading(false);
      toast({
        title: 'No File Selected',
        description: 'Please select a file before uploading.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={'5xl'}>
    <Stack
      textAlign={'center'}
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}>
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}>
        Malware{' '}
        <Text as={'span'} color={'purple.400'}>
          Detection
        </Text>
      </Heading>
      <Text color={'gray.500'} maxW={'3xl'}>
        upload file below to check for malware !
      </Text>
      <Flex w={'full'}>
      <Box
      w={'70vw'}
      p={4}
      marginX={'auto'}
      borderRadius="lg"
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Box onClick={handleFileChange}>
        <VStack p={18} border={'1px solid black'} borderStyle={'dashed'} height={'40vh'} display={'flex'} alignItems={'center'}>
          <ImFilesEmpty size={100} />
          <Text marginX={'auto'}>Drop Your file Here</Text>
        </VStack>
      </Box>
      <Box m={5}>
        <Button colorScheme="purple" onClick={handleFileUpload} mb={4}>
          Upload and Check &nbsp;&nbsp;{loading && <Spinner />}
        </Button>
        {file && (
          <Box>
            Selected File: {file.name}
          </Box>
        )}
      </Box>
    </Box>
        
      </Flex>
    </Stack>
  </Container>
  );
};

export default FileUploadComponent;