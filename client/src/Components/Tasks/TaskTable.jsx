import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { AppContext } from '../../ContextApi/ContextProvider';
import { API_LINK } from '../../Config/Api';
import axios from 'axios';
import TaskTableBody from './TaskTableBody';
import { useParams } from 'react-router-dom';

const TaskTable = () => {
    const [taskData, setTaskData] = useState([]);
  const { user,selectedProject, fetchAgain } = useContext(AppContext);

  const {id} = useParams()
  
  const fetchTask = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${API_LINK}/tasks`, config);
      let filteredData = data.filter((elem)=>{
        return elem.project._id == id
      })
      console.log("Task Data ===>>>",data);
      console.log("Filtered Data ===>>>",filteredData);
      setTaskData(filteredData);
    } catch (error) {
      console.log("error ==>", error.message);
    }
  };

  useEffect(()=>{
    fetchTask();
  },[fetchAgain])
  return (
    <TableContainer width={"100%"}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <AiFillStar size={"1.8rem"} color={"#FEBE6F"} />
                </Th>
                <Th w={"30%"}>Task Name</Th>
                <Th>Assigned To</Th>
                <Th>Status</Th>
                <Th>Due Date</Th>
                <Th>Priority</Th>
              </Tr>
            </Thead>
            <Tbody>
              {taskData.map((elem, i) => {
                  return <TaskTableBody data={elem} key={elem._id} />;
                }
              )}
            </Tbody>
          </Table>
        </TableContainer>
  )
}

export default TaskTable