import { Avatar, Skeleton, SkeletonCircle, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';

const LoadingTable = ({h1,h2,h3,h4,h5}) => {
    const arr =  [0,0,0,0,0,0,0,0]
  return (
    <TableContainer pl={10} pr={6} marginTop={'17px'} className="projectTableContainer" width={"100%"}  height={"86vh"} overflowY={'scroll'} borderTop={'1px solid lightgray'}>
          <Table variant="simple" >
            <Thead>
              <Tr>
                <Th>
                  <AiFillStar size={"1.8rem"} color={"#FEBE6F"} />
                </Th>
                <Th w={"30%"}>{h1?h1:"Project Name"}</Th>
                <Th>{h2?h2:"Owner"}</Th>
                <Th>{h3?h3:"Start Date"}</Th>
                <Th>{h4?h4:"End Date"}</Th>
                <Th>{h5?h5: <BsThreeDots size={"1.5rem"} />}</Th>
              </Tr>
            </Thead>
            
            <Tbody>
              {arr.map((elem, i) => {
                return <Tr>
                <Td><Skeleton h={'26px'}/>
                </Td>
                <Td><Skeleton h={'26px'}>skelton Project</Skeleton></Td>
                <Td>
                <SkeletonCircle size='10' />
                </Td>
                <Td><Skeleton h={'26px'}>10-04-2023</Skeleton></Td>
                <Td><Skeleton h={'26px'}>10-04-2023</Skeleton></Td>
                <Td margin={"auto"}><Skeleton h={'26px'}>. . .</Skeleton></Td>
              </Tr>
              })}
            </Tbody>
          </Table>
        </TableContainer>
  )
}

export default LoadingTable