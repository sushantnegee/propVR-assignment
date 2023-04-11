import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
  Tooltip,
  useToast,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AppContext } from "../../ContextApi/ContextProvider";
import { API_LINK } from "../../Config/Api";
import axios from "axios";
import UserListItem from "./UserListItem";

const SideDrawer = ({setSelectedUser}) => {
    const [search,setSearch] = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const btnRef = useRef();
  const {user} =useContext(AppContext);


  const handleSearch = async (search)=>{
    setLoading(true)
    try {
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`,
            }
        }

        const {data} =await axios.get(`${API_LINK}/user?search=${search}`,config);
        setLoading(false)
        setSearchResult(data)
    } catch (error) {
        setLoading(true)
        toast({
            title: "Error Occured!",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
    }
  }
//   const handleChange =(user)=>{
//     setSearch(user);
//   }
  const clickHandleFunction = (user)=>{
    setSelectedUser(user);
    onClose();
  }
  useEffect(()=>{
    handleSearch("");
  },[search])
  return (
    <>
    <Tooltip hasArrow label='click to select user' bg='gray.300' color='black'> 
      <Button ref={btnRef} borderRadius={"25px"} colorScheme="blue" onClick={onOpen}>
          <HiOutlineUserGroup />
          &nbsp; select user
      </Button>
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." onChange={(e)=>handleSearch(e.target.value)}/>
            {loading?<Spinner/>:<Box mt={4}>
            {searchResult?.map((user)=>{
               return <UserListItem user={user} handleFunction={()=>clickHandleFunction(user)} />
            })}</Box>}
          </DrawerBody>

          
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
