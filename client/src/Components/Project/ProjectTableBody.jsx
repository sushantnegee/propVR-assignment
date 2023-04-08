import { Avatar, Td, Tr } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'

const ProjectTableBody = ({data}) => {
    const {name,owner,startDate,dueDate} = data
  return (
    <Tr>
              <Td><AiOutlineStar size={'1.8rem'} color="gray"/></Td>
              <Td>{name}</Td>
              <Td><Avatar size={'sm'} src={'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}/></Td>
              <Td>{startDate.substring(0,10)}</Td>
              <Td>{dueDate.substring(0,10)}</Td> 
              <Td margin={'auto'}><BsThreeDots size={'1.5rem'}/></Td>
    </Tr>
  )
}

export default ProjectTableBody