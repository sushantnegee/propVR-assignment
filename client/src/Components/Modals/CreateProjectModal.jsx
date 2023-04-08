

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Spinner,
    Text,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import React, { useContext, useState } from "react";
  import { AppContext } from "../../ContextApi/ContextProvider";
  import axios from 'axios'
  import { API_LINK } from "../../Config/Api";
  import UserListItem from "../misc/UserListItem";
  // import UserListItem from "../misc/UserListItem";
  
  const CreateProjectModal = ({ children }) => {
    const [title, setTaskTitle] = useState();
    const [description, setDescription] = useState();
    const [dueDate, setDueData] = useState();
    const [status, setStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [assignee, setAssignee] = useState();
    const [searchResult,setSearchResult] = useState();
    const [search,setSearch] = useState();
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
  
    const {user,setFetchAgain,fetchAgain,selectedProject} = useContext(AppContext)
  
    const handleSearch = async (query) => {
      if (!query) {
        return;
      }
  
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`${API_LINK}/user?search=${query}`, config);
        console.log(data);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };
  
    const handleSubmit = async () => {
      if (!title || !description  || !dueDate|| !assignee) {
        toast({
          title: "Please Fill all Fields",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        return;
      }
  
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
  
        const {data} = await axios.post(
          `${API_LINK}/tasks`,
          {
            title: title,
            description: description,
            assignedTo: assignee,
            dueDate:dueDate,
            project: selectedProject._id,
          },
          config
        ); 
        onClose();
        setFetchAgain(!fetchAgain);
        toast({
          title: "New Task Created!",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
      } catch (error) {
        toast({
          title: "Failed to Create new Task!",
          description: error.response.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    };
  
    const handleTask=(userSelected)=>{
      if(assignee==userSelected){
          toast({
              title: "User already Added!",
              status: "error",
              duration: 4000,
              isClosable: true,
              position: "top",
            });
            return 
      }
      setAssignee(userSelected);
    }
  
    console.log('selectedProject ==>',selectedProject)
    // console.log(description)
    // console.log("assignee => ",assignee)
    console.log(dueDate)
    return (
      <>
        <span onClick={onOpen}>{children}</span>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize={"35px"}
              fontFamily={"Work sans"}
              display={"flex"}
              justifyContent={"center"}
            >
              Create Task
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody display={"flex"} flexDir="column" alignItems={"center"}>
              <FormControl>
                <Input
                  placeholder="Task Title"
                  mb="3"
                  onChange={(e) => {
                    setTaskTitle(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Description"
                  mb="3"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormControl>
              
              <FormControl>
              <FormLabel>
                DueDate
              </FormLabel>
                <Input
                  placeholder="Due Date"
                  mb="3"
                  type={"date"}
                  onChange={(e) => {
                    setDueData(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Assign to eg: sushant etc"
                  mb="3"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
              </FormControl>
              {assignee ? (
                <Box
                  mb={"2"}
                  paddng={"20px"}
                  w={"100%"}
                  display="flex"
                  flexWrap={"wrap"}
                >
                  <Text backgroundColor={"skyblue"} fontSize={"m"}>
                    {assignee.name}
                  </Text>
                </Box>
              ) : (
                ""
              )}
              {loading?<Spinner/>:
            searchResult?.slice(0,4).map((elem)=>{
              return <UserListItem key={elem._id} user = {elem} handleFunction={()=>handleTask(elem)}/>
            })}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Create Task
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default CreateProjectModal;
  