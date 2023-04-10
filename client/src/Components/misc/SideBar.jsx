import { Avatar, Box, Button, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import workzone from "../Images/workzone..png";
import { RiSpaceShipLine } from "react-icons/ri";
import { BsFillCaretRightFill } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import CreateProjectModal from "../Modals/CreateProjectModal";
import { AppContext } from "../../ContextApi/ContextProvider";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate()
  const {loggedIn,setLoggedIn} = useContext(AppContext)

  const logoutHandler =()=>{
    localStorage.removeItem("userDetails");
    navigate("/");
    setLoggedIn(false);
  }
  return (
    <Box className="sideMainContainer"  width={'20%'} bgColor={"#0B0F1F"} p={7} >
      <Box>
        <Image className="sideBarLogo" w={'80%'}   src={workzone} alt="fdf" />
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
          onClick={()=>navigate('/projects')}
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
          onClick={()=>navigate('/calendar')}
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

        <Box

        p={1}
        borderRadius={"29px"}
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={'center'}
        bgColor={"#0B0F1F"}
        // alignContent={"start"}
        // w={"80%"}
        h={"60px"}
        border={'2px solid white'}
        color={"white"}
      >
        <Avatar mr={2} size="md" cursor="pointer" name={user?.name} src={user?.pic} />
        <Text>{user?.name}</Text>
      </Box>
          {/* <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} /> */}
        </MenuButton>
        <MenuList placement='right-end'>
          {/* <ProfileModal user={user}> */}
            {/* <MenuItem>My Profile</MenuItem>{" "} */}
          {/* </ProfileModal> */}
          {/* <MenuDivider /> */}
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </MenuList>
      </Menu>
      {/* </div> */}

      
    </Box>
  );
};

export default SideBar;
