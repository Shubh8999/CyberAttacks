import React from "react";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar({ onWatchdogModeClick, onNormalModeClick,watchdogMode }) {
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header bg={bg} w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex alignItems="center">
            <chakra.a href="/" title="Choc Home Page" display="flex" alignItems="center">
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <img src={logo} width={'150px'} height={'100px'}/>
          </Flex>
          <Flex alignItems="center">
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
            </HStack>
            <Button colorScheme="brand" size="sm" mr={2}>
              Get Started
            </Button>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />
                <Button w="full" variant="ghost">
                  Features
                </Button>
                <Button w="full" variant="ghost">
                  Pricing
                </Button>
                <Button w="full" variant="ghost">
                  Blog
                </Button>
                <Button w="full" variant="ghost">
                  Company
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </Flex>
          <Flex justify="flex-end" p={4}>
          {watchdogMode ? (
            <Button colorScheme="red" onClick={onNormalModeClick}>
              Revert to Normal Mode
            </Button>
          ) : (
            <Button colorScheme="purple" onClick={onWatchdogModeClick}>
              Switch to Watchdog Mode
            </Button>
          )}
          </Flex>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
