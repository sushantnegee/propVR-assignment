import { Avatar, Box, Menu, MenuButton, MenuItem, MenuList, Td, Tooltip, Tr } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import EditProjectModal from '../Modals/EditProjectModal'
import CreateTaskModal from '../Modals/CreateTaskModal'
import { AppContext } from '../../ContextApi/ContextProvider'

const TaskTableBody = ({data}) => {
  const {title,assignedTo,status,dueDate,priority} = data;
  const {setSelectedProject} = useContext(AppContext)
  return (
    <Tr>
      <Td>
        <AiOutlineStar size={"1.8rem"} color="gray" />
      </Td>
      <Td  className="HoverUnderline"><Link to={`/projects/${data._id}`}>{title}</Link></Td>
      <Td>
      <Tooltip hasArrow label={assignedTo.name} placement='bottom'  bg='gray.300' color={'black'}>
        <Avatar
          name={assignedTo.name}
          size={"sm"}
          //   src={'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
        />
        </Tooltip>
      </Td>
      <Td>{status}</Td>
      <Td>{dueDate.substring(0, 10)}</Td>
      <Td  p={'1'}><Box display={'flex'} justifyContent={'center'} alignItems={'center'} textAlign={'center'} borderRadius={'5px'} width={'100%'} h={'40px'} bg={priority=='none'?"#E1E6EE":priority=="low"?"#4ECD97":priority=="medium"?"#FFC63C":"#E12D42"} color={priority=='none'?"black":"white"}>{priority}</Box></Td>
    </Tr>
  )
}

export default TaskTableBody