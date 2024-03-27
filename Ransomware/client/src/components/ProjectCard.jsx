import * as React from 'react';
import {
  chakra,
  Container,
  HStack,
  VStack,
  Text,
  Tag,
  Link,
  Image,
  useColorModeValue
} from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';


const ProjectCard = (props) => {
  const textColor = useColorModeValue('gray.500', 'gray.200');
  const [isOpen, setIsOpen] = React.useState(false);
  console.log(props)
  return (
    <>
      <Container maxW="4xl" >
        <VStack spacing={4}>
            <chakra.div>
              <HStack
                minW='60vw'
                p={4}
                bg={['white']}
                rounded="xl"
                borderWidth="1px"
                borderColor={['gray.100', 'gray.700']}
                textAlign="left"
                align="start"
                spacing={4}
                cursor="pointer"
                _hover={{ shadow: 'lg' }}
              >
                <Image
                  src={"ads"}
                  size="sm"
                  width={33}
                  height={33}
                  layout="fixed"
                  rounded="md"
                  objectFit="cover"
                  alt="cover image"
                  fallbackSrc="https://via.placeholder.com/150"
                />
                <VStack align="start" justifyContent="flex-start">
                  <VStack spacing={0} align="start">
                    <HStack>
                      <Text
                        fontWeight="bold"
                        fontSize="md"
                        noOfLines={1}
                        onClick={(e) => e.stopPropagation()}
                        isExternal
                      >
                        {props.title}
                      </Text>
                    </HStack>

                      <Text fontSize="sm" color={textColor}>
                        {props.desc}
                      </Text>

                  </VStack>
                </VStack>
              </HStack>
            </chakra.div>
        </VStack>
      </Container>
    </>
  );
};

export default ProjectCard;