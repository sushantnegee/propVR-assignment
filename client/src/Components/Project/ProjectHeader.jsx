import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import ProjectTeamMembers from './ProjectTeamMembers'
import CreateProjectModal from '../Modals/CreateProjectModal'
import { GrAdd } from 'react-icons/gr'

const ProjectHeader = () => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}  p={2} mb={'2'}>
        <Text ml={4} fontWeight={'600'} fontSize="2xl">{}</Text>
        <Box>
            {/* <Button mr={'3'} borderRadius={'25px'}><HiOutlineUserGroup/>&nbsp; Team members</Button> */}
            {/* <ProjectTeamMembers/> */}
            <CreateProjectModal>
            <Button  variant="solid" _hover={{ bg: "blue.500" }} bg={'#4461D7'} color={'white'} mr={'5'} borderRadius={'25px'}><GrAdd color={'#4461D7'}/>&nbsp; Add Project</Button>
            </CreateProjectModal>
        </Box>
    </Box>
  )
}

export default ProjectHeader