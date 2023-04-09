import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { AppContext } from '../../ContextApi/ContextProvider';
import { API_LINK } from '../../Config/Api';
import axios from 'axios';

const EditProjectModal = ({children}) => {
  const [projectName, setProjectName] = useState();
  const [description, setDescription] = useState();
  const [dueDate, setDueData] = useState();
  const [loading, setLoading] = useState(false);

  const {user,fetchAgain,setFetchAgain,selectedProject} = useContext(AppContext)
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
    console.log(selectedProject)

    const handleSubmit = async()=>{
      if (!projectName && !description && !dueDate) {
        toast({
          title: "Please Fill atleast one Fields",
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
        const { data } = await axios.patch(
          `${API_LINK}/projects/${selectedProject._id}`,
          {
            name: projectName,
            description: description,
            dueDate: dueDate,
          },
          config
        );
        onClose();
        setFetchAgain(!fetchAgain);
        toast({
          title: "Project Details Updated!",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
      } catch (error) {
        console.log(error)
        toast({
          title: "Failed to Edit project Details!",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
   
    }
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
            {selectedProject?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir="column" alignItems={"center"}>
            <FormControl>
              <Input
                placeholder="Project Name"
                mb="3"
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Project Description"
                mb="3"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <Input
                placeholder="Due Date"
                mb="3"
                type={"date"}
                // value={selectedProject?.dueDate.substring(0,10)}
                onChange={(e) => {
                  setDueData(e.target.value);
                }}
              />
            </FormControl>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Confirm Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditProjectModal