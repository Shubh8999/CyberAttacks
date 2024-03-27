import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Features from '../components/Features';
import { Center, Spinner, Button } from '@chakra-ui/react';
import { chakra, Box, Flex, Icon, Stack, ScaleFade, Divider,Heading,Text } from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineCloudServer, AiOutlineDownload, AiFillClockCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import TypewriterComponent from 'typewriter-effect';
import Typewriter from 'typewriter-effect';
import Feature from '../components/Features';
import ProjectCard from '../components/ProjectCard';
import ThreeTierPricingHorizontal from '../components/Main';
import FileUploadComponent from './File';
import Navbar from '../components/Navbar';

const Home = () => {
  const prevDataRef = useRef({});
  const [initialized, setInitialized] = useState(false);
  const [data, setData] = useState({});
  const [malwareDetected, setMalwareDetected] = useState(false);
  const [watchdogMode, setWatchdogMode] = useState(false);

  const handleMalwareDetection = (malwareStatus) => {
    console.log(malwareStatus);
    setMalwareDetected(malwareStatus);
  };

  useEffect(() => {
    const updateAdditionalInfo = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_additional_info');
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching additional info:', error);
      }
    };

    const initiateRequest = async () => {
      try {
        setInitialized(true);
        await axios.get('http://127.0.0.1:5000/initiate');
      } catch (error) {
        console.error('Error initiating request:', error);
      }
    };

    if ((malwareDetected || watchdogMode) && !initialized) {
      initiateRequest();
    }

    if(malwareDetected || watchdogMode){
      const intervalId = setInterval(updateAdditionalInfo, 2000);
      return () => clearInterval(intervalId);
    }

  }, [malwareDetected, initialized, watchdogMode]);

  const switchToWatchdogMode = () => {
    setWatchdogMode(true);
    setMalwareDetected(false); // Reset malware detection state
  };

  const revertToNormalMode = () => {
    setWatchdogMode(false);
    setInitialized(false); // Reset initialization state
  };

  return (
    data && (
      <div>
                <Navbar 
          onWatchdogModeClick={switchToWatchdogMode} 
          onNormalModeClick={revertToNormalMode}
          watchdogMode={watchdogMode}
        />
        {!watchdogMode && (
          <FileUploadComponent onMalwareDetection={handleMalwareDetection}/>
        )}
       {(malwareDetected) &&  <Divider borderColor='black' />}
        {((malwareDetected || watchdogMode)&&data.user!=='') && (
          <Flex
            bg="#edf3f8"
            _dark={{ bg: "#3e3e3e" }}
            p={20}
            w="auto"
            justifyContent="center"
            alignItems="center"
          >
        <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}>
        Hybrid{' '}
        <Text as={'span'} color={'purple.400'}>
          Analysis
        </Text>
      </Heading>
            <Box py={12} bg="white" _dark={{ bg: "gray.800" }} rounded="xl">
              <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
                <Box mt={10}>
                  <Stack
                    spacing={{ base: 10, md: 0 }}
                    display={{ md: "grid" }}
                    gridTemplateColumns={{ md: "repeat(2,1fr)" }}
                    gridColumnGap={{ md: 8 }}
                    gridRowGap={{ md: 10 }}
                  >
                    <Feature
                      title='Username'
                      icon={<AiOutlineUser size={'35px'}/>}
                      color='#DA932C'
                    >
                      {data.user}
                    </Feature>
        
                    <Feature
                      title="Download Location"
                      icon={<AiOutlineDownload size={'35px'}/>}
                      color='#2298F1'
                    >
                      {data.folder_document}
                    </Feature>
        
                    <Feature
                      title="Server Destination"
                      icon={<AiOutlineCloudServer size={'35px'}/>}
                      color='#66B92E'
                    >
                      {data.folder_destination}
                    </Feature>
        
                    <Feature
                      title="Date of Execution"
                      icon={<AiFillClockCircle size={'35px'}/>}
                      color="#A84D43"
                    >
                      {data.date_run}
                    </Feature>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Flex>
        )}
        {(malwareDetected || watchdogMode) && (
          <ThreeTierPricingHorizontal info={data.additional_information}/>
        )}
      </div>
    )
  );
}

export default Home;
