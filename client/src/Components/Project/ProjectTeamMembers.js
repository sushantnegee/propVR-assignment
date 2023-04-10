import {
  Avatar,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AppContext } from "../../ContextApi/ContextProvider";

const ProjectTeamMembers = () => {
  const { selectedProject } = useContext(AppContext);
  console.log("selected Project ==>", selectedProject);
  return (
    <Menu>
      <MenuButton
        // as={Button}
        mr={"3"}
        borderRadius={"25px"}
        // rightIcon={<ChevronDownIcon />}
      >
        <Button mr={"3"} borderRadius={"25px"}>
          <HiOutlineUserGroup />
          &nbsp; Team members
        </Button>
      </MenuButton>
      <MenuList>
        {selectedProject?.team.map((mem, i) => {
          return (
            <MenuItem minH="48px">
              <Avatar
                name={mem.name}
                size={"sm"}
                mr={2}
              />
              <span>{mem.name}</span>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ProjectTeamMembers;
