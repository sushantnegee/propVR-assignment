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
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AppContext } from "../../ContextApi/ContextProvider";
import axios from "axios";
import { API_LINK } from "../../Config/Api";
import UserListItem from "../misc/UserListItem";
import UserBadgeItem from "../misc/UserBadgeItem";
// import UserListItem from "../misc/UserListItem";

const CreateProjectModal = ({ children }) => {
  const [projectName, setProjectName] = useState();
  const [description, setDescription] = useState();
  const [dueDate, setDueData] = useState();
  const [status, setStatus] = useState();
  const [team, setTeam] = useState([]);
  const [searchResult, setSearchResult] = useState();
  const [loading,setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { user, setFetchAgain, fetchAgain, selectedProject } =
    useContext(AppContext);

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
      const { data } = await axios.get(
        `${API_LINK}/user?search=${query}`,
        config
      );
      // console.log(data);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    setLoading(true);
    if (!projectName || !description || !dueDate) {
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
      if(!team.includes(user)){
        setTeam([...team,user]);
      }
      const { data } = await axios.post(
        `${API_LINK}/projects`,
        {
          name: projectName,
          description: description,
          dueDate: dueDate,
          owner: user._id,
          team: JSON.stringify(team.map((mem)=>mem._id)),
        },
        config
      );
      onClose();
      setFetchAgain(!fetchAgain);
      toast({
        title: "New Project Created!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
      toast({
        title: "Failed to Create new project!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

console.log(team)
  const handleTeam = (userToAdd) => {
    console.log("userToAdd =>", userToAdd);
    if (team.includes(userToAdd)) {
      toast({
        title: "User already Added!",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setTeam([...team, userToAdd]);
  };

  const handleDelete=(userToDel)=>{
    console.log("inside delete")
    setTeam(team.filter((mem)=>mem._id!==userToDel._id))
}
  // console.log("selectedProject ==>", selectedProject);
  // console.log(description)
  // console.log("assignee => ",assignee)
  console.log(dueDate);
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
            Create Project
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
                onChange={(e) => {
                  setDueData(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add team members to eg: sushant etc"
                mb="3"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </FormControl>

            <Box w={"100%"} display="flex" flexWrap={"wrap"}>
              {team.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>
            {loading ? (
              <Spinner />
            ) : (
              searchResult?.slice(0, 4).map((elem) => {
                return (
                  <UserListItem
                    key={elem._id}
                    user={elem}
                    handleFunction={() => handleTeam(elem)}
                  />
                );
              })
            )}
          </ModalBody>

          <ModalFooter>
            <Button isLoading={loading} colorScheme="blue" onClick={handleSubmit}>
              Create Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProjectModal;
