import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";
import './pages.css'

const HomePage = () => {
  return (
    <Container maxW={'xl'} centerContent className="authContainer">
      <Box
        display={'flex'}
        justifyContent={'center'}
        padding={3}
        backgroundColor={"white"}
        width={'100%'}
        margin={'70px 0px 15px 0px'}
        borderRadius={'lg'}
        borderWidth={'1px'}
      >
        <Text
          textAlign={"center"}
          fontSize={"4xl"}
          // fontFamily={"Work sans"} 
          color={"black"}
        >
          Team Management App
        </Text>
      </Box>
      <Box
        padding={3}
        width={"100%"}
        m={"0px 0px 80px 0px"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
        
      >
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
