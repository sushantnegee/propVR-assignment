import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import workzone from '../Images/workzone..png'
import {RiSpaceShipLine} from 'react-icons/ri'
import {BsFillCaretRightFill} from 'react-icons/bs'
import {BiCalendar} from 'react-icons/bi'
import CreateProjectModal from '../Modals/CreateProjectModal'


const SideBar = () => {
  return (
    <Box width={"20%"} bgColor={"#0B0F1F"} p={7}>
        <img width={'70%'} src={workzone} alt="fdf" />
            <CreateProjectModal>
        <Box mt={'9'} p={"7px"} w={'80%'} border={'2px solid white'} fontSize={'lg'} bgColor={'#0B0F1F'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} color={'white'} textAlign={'center'} borderRadius={'20px'}>
            <RiSpaceShipLine size={'1.7rem'}/>
            <Text size={'lg'}>Project</Text>
            <BsFillCaretRightFill/>
        </Box>
            </CreateProjectModal>
        <Box mt={'2'} p={"7px"} w={'80%'} border={'2px solid white'} fontSize={'lg'} bgColor={'#0B0F1F'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} color={'white'} textAlign={'center'} borderRadius={'20px'}>
            <BiCalendar size={'1.7rem'}/>
            <Text size={'lg'}>Calendar</Text>
            <BsFillCaretRightFill/>
        </Box>
    </Box>
  )
}

export default SideBar