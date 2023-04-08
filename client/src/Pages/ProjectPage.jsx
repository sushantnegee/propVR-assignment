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
import React from "react";
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'

const ProjectPage = () => {
    const fetchProjects = ()=>{
        
    }
  return (
    // <Container>
    <Box w={"90%"} margin={'0 auto'} border="2px solid red">
      <Box w={'90%'} margin={'40px auto'}>
      <TableContainer width={"100%"}  >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th><AiFillStar size={'1.8rem'} color={'#FEBE6F'}/></Th>
              <Th w={"30%"}>Project Name</Th>
              <Th>Owner</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Add Project+</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td><AiOutlineStar size={'1.8rem'} color="gray"/></Td>
              <Td>project 1</Td>
              <Td><Avatar size={'sm'}/></Td>
              <Td>millimetres (mm)</Td>
              <Td>millimetres (mm)</Td> 
              <Td>millimetres (mm)</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      </Box>
    </Box>
    // </Container>
  );
};

export default ProjectPage;
