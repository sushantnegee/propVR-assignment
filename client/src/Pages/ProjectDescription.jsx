import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import TaskTable from "../Components/Tasks/TaskTable";
import ProjectDescriptionHeader from "../Components/Project/ProjectDescriptionHeader";

const ProjectDescription = () => {
  return (
    <Box w={"75%"} margin={"40px auto"} border={"2px solid red"}>
      <ProjectDescriptionHeader />

      <Accordion defaultIndex={[0]} allowToggle>
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
