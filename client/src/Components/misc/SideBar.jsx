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
    <Box className="sideMainContainer" width={"20%"} bgColor={"#0B0F1F"} p={7}>
      <Box>
        <img width={"70%"} src={workzone} alt="fdf" />
        <CreateProjectModal>
          <Box
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
            <RiSpaceShipLine size={"1.7rem"} />
            <Text size={"lg"}>Project</Text>
            <BsFillCaretRightFill />
          </Box>
        </CreateProjectModal>
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
          <BiCalendar size={"1.7rem"} />
          <Text size={"lg"}>Calendar</Text>
          <BsFillCaretRightFill />
        </Box>
      </Box>
      <Box h={'58vh'}>

        </Box>
      {/* user profile */}
      {/* <div style={{ display: "flex", justifyContent: "flex-end" }}> */}
      <Menu isLazy>
        <MenuButton w={'100%'}>

        <Button
        p={1}
        borderRadius={"29px"}
        display={"flex"}
        justifyContent={"flex-start"}
        alignContent={"start"}
        w={"80%"}
        h={"60px"}
      >
        <Avatar mr={2} size="md" cursor="pointer" name={user.name} />
        <Text>{user.name}</Text>
      </Button>
          {/* <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} /> */}
        </MenuButton>
        <MenuList>
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
