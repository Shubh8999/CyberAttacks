'use client'

import {
  Box,
  Flex,
  Divider,
  HStack,
  Heading,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'
import Typewriter from 'typewriter-effect';
import { MdSecurity } from "react-icons/md";
import { LuFileLock2,LuFileClock } from "react-icons/lu";
import { FaFileCircleCheck } from "react-icons/fa6";
import { BiSolidErrorAlt } from "react-icons/bi";
import { MdError } from "react-icons/md";

const options = [
  { id: 1, desc: '1 lorem ipsum' },
  { id: 2, desc: 'Lorem, ipsum dolor.' },
  { id: 3, desc: 'Monthly Updates' },
]

const PackageTier = ({ title, options, icon}) => {

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: 'flex-start',
        md: 'space-around',
      }}
      direction={{
        base: 'column',
        md: 'row',
      }}
      alignItems={{ md: 'center' }}>
     
      <Flex size={'md'} minWidth={'10vw'} alignItems={'center'} fontSize={'2xl'} fontWeight={'bolder'}> {icon} &nbsp;{title}</Flex>
      <List minWidth={'30vw'} spacing={3} textAlign="start">
        {options.map((desc, index) => (
          <ListItem key={index}>
            <HStack>
                {title !== "Errors" ? <ListIcon as={FaCheckCircle} color="green.500" /> :<ListIcon as={MdError} color="red.500" />}
                <Typewriter
                key={index}
                options={{
                    strings: desc,
                    autoStart: true,
                    loop: false,
                    deleteSpeed: 0,
                    cursor: "",
                }}
                />
            </HStack>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
const ThreeTierPricingHorizontal = (props) => {
  return (
    <Box py={6} px={5} width="full">
      <Stack spacing={4} width={'100%'} direction={'column'}>
        <Stack
          p={5}
          alignItems={'center'}
          justifyContent={{
            base: 'flex-start',
            md: 'space-around',
          }}
          direction={{
            base: 'column',
            md: 'row',
          }}>
          <Stack
            width={{
              base: '100%',
              md: '40%',
            }}
            textAlign={'center'}>
            <Heading size={'lg'}>
              Current <Text color="purple.400">Status</Text>
            </Heading>
          </Stack>
          <Stack
            width={{
              base: '100%',
              md: '60%',
            }}>
            <Text textAlign={'center'}>
            <Spinner size={'sm'}/>&nbsp;
            {props?.info&&[...new Set(props?.info['Script information'])]?.slice(-1)[0]}
            </Text>
          </Stack>
        </Stack>
        <Divider />

    {props?.info&& props?.info['Awaken watchdogs'].length !==0 && (
        
        <PackageTier
        title={'Awaken Watchdogs'}
        icon={<MdSecurity color={'green'}/>}
        checked={true}
        typePlan="$32.00"
        options={[...new Set(props?.info['Awaken watchdogs'])]}
        />
      )}


    {props?.info&& props?.info['Scuffed files'].length !==0 && (

    <PackageTier
    title={'Scuffed Files'}
    icon={<LuFileLock2 color={'red'}/>}
    checked={true}
    typePlan="$32.00"
    options={[...new Set(props?.info['Scuffed files'])]}
    />
    )}


    {props?.info&& props?.info['SMA files'].length !==0 && (

    <PackageTier
    title={'SMA Files'}
    icon={<LuFileClock color={'orange'}/>}
    checked={true}
    typePlan="$32.00"
    options={[...new Set(props?.info['SMA files'])]}
    />
    )}

    {props?.info&& props?.info['DMA files'].length !==0 && (

    <PackageTier
    icon={<LuFileClock color={'orange'}/>}
    title={'DMA Files'}
    checked={true}
    typePlan="$32.00"
    options={[...new Set(props?.info['DMA files'])]}
    />
    )}


    {props?.info&& props?.info['Analysed files'].length !==0 && (

    <PackageTier
    title={'Analysed Files'}
    icon={<FaFileCircleCheck color={'green'}/>}
    checked={true}
    typePlan="$32.00"
    options={[...new Set(props?.info['Analysed files'])]}
    />
    )}


    {props?.info&& props?.info['Errors'].length !==0 && (

    <PackageTier
    title={'Errors'}
    icon={<BiSolidErrorAlt color={'red'}/>}
    checked={true}
    typePlan="$32.00"
    options={[...new Set(props?.info['Errors'])]}
    />
    )}


    {props?.info&& props?.info['Others'].length !==0 && (

    <PackageTier
    title={'Errors'}
    checked={true}
    typePlan="$32.00"
    options={[...new Set(props?.info['Others'])]}
    />
    )}
      </Stack>
    </Box>
  )
}

export default ThreeTierPricingHorizontal