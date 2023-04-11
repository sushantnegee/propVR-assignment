import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import TaskTable from "../Components/Tasks/TaskTable";
import ProjectDescriptionHeader from "../Components/ProjectDescription/ProjectDescriptionHeader";
import { useParams } from "react-router-dom";
import { AppContext } from "../ContextApi/ContextProvider";
import axios from "axios";
import { API_LINK } from "../Config/Api";

const ProjectDescription = () => {
  const {selectedProject} = useContext(AppContext);
  return (
    <Box  w={"80%"}  borderLeft={"1px solid lightgray"} >
      <ProjectDescriptionHeader selectedProject = {selectedProject}/>
      <Box className="hideScroll" overflowX={'hidden'} h={"86vh"} >
      <Accordion p={2} allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                p={1}
                mr={'1'}
                mb={"2"}
              >
                <Text fontWeight={"600"} fontSize="xl">
                  Project Details
                </Text>
              </Box>
              <AccordionIcon />  
              {/*box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */}
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box ml={'12'}  w={'fit-content'} p={'4'} boxShadow={'rgba(149, 157, 165, 0.2) 0px 8px 24px'}>
              <Text fontSize={'xl'}> Name : <span style={{color:"rgb(68,97,215)"}}>{selectedProject.name}</span></Text>
              <Text fontSize={'xl'}> Description : <span style={{color:"rgb(7 35 151)"}}>{selectedProject.description}</span></Text>
              <Text fontSize={'xl'}> Due-Date : <span style={{color:"rgb(7 35 151)"}}>{selectedProject.dueDate.substring(0,10)}</span></Text>

            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Accordion defaultIndex={[0]} p={2} allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                p={1}
                mr={'1'}
                mb={"2"}
              >
                <Text fontWeight={"600"} fontSize="xl">
                  Tasks
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          <TaskTable />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      </Box>
    </Box>
  );
};

export default ProjectDescription;
