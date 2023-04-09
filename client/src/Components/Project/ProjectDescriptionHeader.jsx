import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import {GrAdd} from 'react-icons/gr'
import {HiOutlineUserGroup} from 'react-icons/hi'
import ProjectTeamMembers from './ProjectTeamMembers'

const ProjectDescriptionHeader = () => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}  p={2} mb={'2'}>
        <Text fontWeight={'600'} fontSize="2xl">Tasks</Text>
        <Box>
            {/* <Button mr={'3'} borderRadius={'25px'}><HiOutlineUserGroup/>&nbsp; Team members</Button> */}
            <ProjectTeamMembers/>
            <Button  variant="solid" _hover={{ bg: "blue.500" }} bg={'#4461D7'} color={'white'} mr={'1'} borderRadius={'25px'}><GrAdd color={'#4461D7'}/>&nbsp; Add Task</Button>
        </Box>
    </Box>
  )
}

export default ProjectDescriptionHeader