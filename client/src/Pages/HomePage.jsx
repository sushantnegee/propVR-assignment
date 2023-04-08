import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";
import backroundImage from '../Components/Images/teamWork.jpg'

const HomePage = () => {
  return (
    <Container centerContent>
      <Box
        padding={3}
        width={"100%"}
        m={"90px 0px 80px 0px"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
        
      >
        <Tabs variant="soft-rounded" colorScheme="orange">
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
