import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Flex, chakra,Heading,te } from '@chakra-ui/react';

const MotionBox = motion(Box);

const Feature = (props) => (
  <>

  <AnimatePresence>
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 2 }}
    >
      <Flex minH={'150px'} boxShadow={'lg'} p={5}  sx={{ '&:hover': { transform: 'scale(1.05)', boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' } }}>
        <Flex shrink={0}>
          <Flex
            alignItems="center"
            justifyContent="center"
            h={12}
            w={12}
            rounded="md"
            bg={props.color}
            boxShadow={`1px 1px 20px 0 ${props.color}`}
            _light={{ bg: 'brand.500' }}
            color="white"
          >
            {props.icon}
          </Flex>
        </Flex>
        <Box ml={4}>
          <chakra.dt
            fontSize="lg"
            fontWeight="medium"
            lineHeight="6"
            _light={{ color: 'gray.900' }}
          >
            {props.title}
          </chakra.dt>
          <chakra.dd mt={2} color="gray.500" _dark={{ color: 'gray.400' }}>
            {props.children}
          </chakra.dd>
        </Box>
      </Flex>
    </MotionBox>
  </AnimatePresence>
  </>
);

export default Feature;
