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
    <Box w={"80%"}  borderLeft={"1px solid lightgray"}>
      <ProjectDescriptionHeader selectedProject = {selectedProject}/>

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
  );
};

export default ProjectDescription;
