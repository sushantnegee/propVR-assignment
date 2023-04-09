import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { AppContext } from "../ContextApi/ContextProvider";
import { API_LINK } from "../Config/Api";
import axios from "axios";
import ProjectTableBody from "../Components/Project/ProjectTableBody";
import CreateProjectModal from "../Components/Modals/CreateProjectModal";
import SideBar from "../Components/misc/SideBar";

const ProjectPage = () => {
  const [projectData, SetProjectData] = useState([]);
  const { user, fetchAgain } = useContext(AppContext);
  const fetchProjects = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${API_LINK}/projects/`, config);
      console.log(data);
      SetProjectData(data);
      // console.log("fetched");
    } catch (error) {
      console.log("error ==>", error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user, fetchAgain]);
  return (
    // <Container>
    <Box
      w={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      margin={"0 auto"}
      // border="2px solid red"
    >
      {/* <CreateProjectModal>
      <Button>Create Project</Button>
      </CreateProjectModal> */}
      <SideBar/>
      <Box w={"75%"} margin={"40px auto"}>
        <TableContainer width={"100%"}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <AiFillStar size={"1.8rem"} color={"#FEBE6F"} />
                </Th>
                <Th w={"30%"}>Project Name</Th>
                <Th>Owner</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th>Add Project+</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projectData.map((elem, i) => {
                console.log("elem", elem);
                console.log("user", user);
                console.log("elem.owner", elem.owner);
                if (
                  (elem.owner._id && user._id && elem.owner._id == user?._id) ||
                  elem.team.some((obj) => obj._id === user?._id)
                ) {
                  return <ProjectTableBody data={elem} key={elem._id} />;
                }
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    // </Container>
  );
};

export default ProjectPage;
