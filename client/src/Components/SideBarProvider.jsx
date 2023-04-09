import { Box } from '@chakra-ui/react'
import React from 'react'
import SideBar from './misc/SideBar'

const SideBarProvider = ({children}) => {
  return (
    <Box
      w={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      margin={"0 auto"}
    >
        <SideBar/>
        {children}
    </Box>
  )
}

export default SideBarProvider