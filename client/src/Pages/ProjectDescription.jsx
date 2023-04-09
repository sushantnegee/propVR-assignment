import { Box } from '@chakra-ui/react'
import React from 'react'
import TaskTable from '../Components/Tasks/TaskTable'

const ProjectDescription = () => {
  return (
    <Box w={"75%"} margin={"40px auto"} border={'2px solid red'}>
      <TaskTable/>
    </Box>
  )
}

export default ProjectDescription