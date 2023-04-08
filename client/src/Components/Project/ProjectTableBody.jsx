import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { GrFormDown } from "react-icons/gr";
import CreateTaskModal from "../Modals/CreateTaskModal";
import { AppContext } from "../../ContextApi/ContextProvider";

const ProjectTableBody = ({ data }) => {
  const { name, owner, startDate, dueDate } = data;
  const {setSelectedProject} = useContext(AppContext)
  return (
    <Tr>
      <Td>
        <AiOutlineStar size={"1.8rem"} color="gray" />
      </Td>
      <Td>{name}</Td>
      <Td>
        <Avatar
          name={owner.name}
          size={"sm"}
          //   src={'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
        />
      </Td>
      <Td>{startDate.substring(0, 10)}</Td>
      <Td>{dueDate.substring(0, 10)}</Td>
      <Td margin={"auto"}>
        <Menu>
          <MenuButton as={Button} rightIcon={<GrFormDown />}>
            <BsThreeDots size={"1.5rem"} />
          </MenuButton>
          <MenuList>
            <MenuItem>Edit Project</MenuItem>
            <CreateTaskModal>
            <MenuItem onClick={()=>setSelectedProject(data)}>Create Task</MenuItem>
            </CreateTaskModal>
            <MenuItem>Add User</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

export default ProjectTableBody;
