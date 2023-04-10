import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import workzone from "../Images/workzone..png";
import { RiSpaceShipLine } from "react-icons/ri";
import { BsFillCaretRightFill } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import CreateProjectModal from "../Modals/CreateProjectModal";
import { AppContext } from "../../ContextApi/ContextProvider";
import "./SideBar.css";

const SideBar = () => {
  const { user } = useContext(AppContext);

  const logoutHandler =()=>{

  }
  return (
    <Box className="sideMainContainer"  width={"45vh"} bgColor={"#0B0F1F"} p={7} >
      <Box>
        <img className="sideBarLogo" width={"70%"} src={workzone} alt="fdf" />
        {/* <CreateProjectModal> */}
          <Box
          className="SideBarProjectTab"
          mt={"9"}
          p={"7px"}
          w={"80%"}
          border={"2px solid white"}
          fontSize={"lg"}
          bgColor={"#0B0F1F"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          color={"white"}
          textAlign={"center"}
          borderRadius={"20px"}
          >
            <RiSpaceShipLine className="sideBarMenuIcon" size={"1.7rem"} />
            <Text className="sideBarMenuText" size={"lg"}>Project</Text>
            <BsFillCaretRightFill className="sideBarMenuIcon"/>
          </Box>
        {/* </CreateProjectModal> */}
        <Box
          mt={"2"}
          p={"7px"}
          w={"80%"}
          border={"2px solid white"}
          fontSize={"lg"}
          bgColor={"#0B0F1F"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          color={"white"}
          textAlign={"center"}
          borderRadius={"20px"}
        >
          <BiCalendar className="sideBarMenuIcon" size={"1.7rem"} />
          <Text className="sideBarMenuText" size={"lg"}>Calendar</Text>
          <BsFillCaretRightFill className="sideBarMenuIcon" />
        </Box>
      </Box>
      <Box h={'58vh'}>

        </Box>
      {/* user profile */}
      {/* <div style={{ display: "flex", justifyContent: "flex-end" }}> */}
      <Menu isLazy >
        <MenuButton w={'100%'}>

        <Button
        p={1}
        borderRadius={"29px"}
        display={"flex"}
        justifyContent={"flex-start"}
        bgColor={"#0B0F1F"}
        alignContent={"start"}
        w={"80%"}
        h={"60px"}
        border={'2px solid white'}
        color={"white"}
      >
        <Avatar mr={2} size="md" cursor="pointer" name={user?.name} src={user?.pic} />
        <Text>{user?.name}</Text>
      </Button>
          {/* <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} /> */}
        </MenuButton>
        <MenuList placement='right-end'>
          {/* <ProfileModal user={user}> */}
            <MenuItem>My Profile</MenuItem>{" "}
          {/* </ProfileModal> */}
          <MenuDivider />
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </MenuList>
      </Menu>
      {/* </div> */}

      
    </Box>
  );
};

export default SideBar;
