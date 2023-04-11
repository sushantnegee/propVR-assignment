import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { AppContext } from "../ContextApi/ContextProvider";
import { API_LINK } from "../Config/Api";
import axios from "axios";
import ProjectTableBody from "../Components/Project/ProjectTableBody";
import './pages.css'
import ProjectHeader from "../Components/Project/ProjectHeader";
import LoadingTable from "../Components/LoadingTable";
import { BsThreeDots } from "react-icons/bs";


const ProjectPage = () => {
  const [projectData, SetProjectData] = useState([]);
  const { user, fetchAgain } = useContext(AppContext);
  const [loading,setLoading] = useState(false);
  
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${API_LINK}/projects/`, config);
      // console.log(data);
      const filteredData = data.filter((elem)=>{
        return (elem.owner._id && user._id && elem.owner._id == user?._id) ||
                  elem.team.some((obj) => obj._id === user?._id)

      })
      SetProjectData(filteredData);
      setTimeout(()=>{

        setLoading(false)
      },2000)
    } catch (error) {
      console.log("error ==>", error.message);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user, fetchAgain]);
  console.log(projectData)
  return (
      <Box w={"80%"}  borderLeft={"1px solid gray"}>
        <ProjectHeader/>
        {loading?<LoadingTable/>
        // <Box  width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} height={'86vh'} borderTop={'1px solid lightgray'}>
        // <img className="LoadinGif" src="https://thumbs.gfycat.com/RelievedSilentArcticwolf.webp" alt="Loading"/>
        // </Box>
        :projectData.length<=0?<Box  width={'100%'} height={'86vh'} borderTop={'1px solid lightgray'}>
          <img className="noProjectImage" src="https://i.pinimg.com/originals/dd/59/ca/dd59cabdd357be5659fbac290414bb6a.jpg" alt="no project"/>
          </Box>:
        <TableContainer marginTop={'17px'} pl={10} pr={6} className="hideScroll" width={"100%"}  height={"86vh"} overflowY={'scroll'} borderTop={'1px solid lightgray'}>
          <Table variant="simple" >
            <Thead>
              <Tr>
                <Th>
                  <AiFillStar size={"1.8rem"} color={"#FEBE6F"} />
                </Th>
                <Th w={"30%"}>Project Name</Th>
                <Th>Owner</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th><BsThreeDots size={"1.5rem"} /></Th>
              </Tr>
            </Thead>
            
            <Tbody>
              {projectData.map((elem, i) => {
                  return <ProjectTableBody data={elem} key={elem._id} />;
                // }
              })}
            </Tbody>
          </Table>
        </TableContainer>}

        
            
      </Box>
    // </Container>
  );
};

export default ProjectPage;
