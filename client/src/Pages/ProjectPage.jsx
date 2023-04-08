import {
  Avatar,
  Box,
  Container,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
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

const ProjectPage = () => {
  const [projectData,SetProjectData] = useState([]);
  const { user } = useContext(AppContext);
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
  }, []);
  return (
    // <Container>
    <Box w={"90%"} margin={"0 auto"} border="2px solid red">
      <Box w={"90%"} margin={"40px auto"}>
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
              {projectData.map((elem,i)=>{
                return <ProjectTableBody data={elem} key={elem._id}/>
              })
              }
              </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    // </Container>
  );
};

export default ProjectPage;
