import { useContext, useEffect, useRef, useState } from "react";
import {
  SevenColGrid,
  HeadDays,
  StyledEvent,
  SeeMore,
  PortalWrapper
} from "../../Components/Calendar/Calender.styled";
import { DAYS, MOCKAPPS } from "../../Components/Calendar/CalendarValues";
import {
  datesAreOnSameDay,
  getDarkColor,
  getDaysInMonth,
  getMonthYear,
  getSortedDays,
  nextMonth,
  prevMonth,
} from "../../Components/Calendar/Utils";
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from 'react-icons/md'

import {Box, Container, Text} from '@chakra-ui/react'
import './Calendar.css'
import { AppContext } from "../../ContextApi/ContextProvider";
import axios from "axios";
import { API_LINK } from "../../Config/Api";
import SideDrawer from "../../Components/misc/SideDrawer";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 3, 1));
  const [events, setEvents] = useState(MOCKAPPS);
  const dragDateRef = useRef();
  const dragindexRef = useRef();
  const [showPortal, setShowPortal] = useState(false);
  const [portalData, setPortalData] = useState({});
  const [taskData,setTaskData] = useState([])
  const [selectedUser,setSelectedUser] = useState();

  const {user} = useContext(AppContext);


  const fetchTasks = async()=>{
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${API_LINK}/tasks/`, config);
      // console.log(data);
      const clickedUser = selectedUser || user;
      const filteredData = data.filter((elem)=>
         elem.assignedTo._id == clickedUser._id).map((elem)=>{
          return {date: new Date(elem.dueDate.substring(0,10)),title:elem.title,color:getDarkColor,description:elem.description}
        })
      setEvents(filteredData);
    } catch (error) {
      console.log("error ==>", error.message);
    }
  }
  console.log(taskData)
  useEffect(()=>{
    fetchTasks()
  },[selectedUser])

  const addEvent = (date, event) => {
    if (!event.target.classList.contains("StyledEvent")) {
      const text = window.prompt("name");
      if (text) {
        date.setHours(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        setEvents((prev) => [
          ...prev,
          { date, title: text, color: getDarkColor() }
        ]);
      }
    }
  };

  const drag = (index, e) => {
    dragindexRef.current = { index, target: e.target };
  };

  const onDragEnter = (date, e) => {
    e.preventDefault();
    dragDateRef.current = { date, target: e.target.id };
  };

  const drop = (ev) => {
    ev.preventDefault();

    setEvents((prev) =>
      prev.map((ev, index) => {
        if (index === dragindexRef.current.index) {
          ev.date = dragDateRef.current.date;
        }
        return ev;
      })
    );
  };


  const handlePotalClose = () => setShowPortal(false);


  return (
    <Box className="calendar-wrapper" w={'80%'} h={"99vh"} borderRadius={'5px'} border={'1px solid lightgray'}>
      <Box w={'100%'} display={'flex'} justifyContent={'space-between'} p={'10px 0'} alignContent={'center'}>
        <Box display={"flex"} justifyContent={'space-around'} alignItems={'center'} pl="4" w={'30%'}>
        <MdOutlineArrowBackIos cursor={'pointer'} onClick={() => prevMonth(currentDate, setCurrentDate)} size={'1.5rem'}/>
        {getMonthYear(currentDate)} 
        <MdOutlineArrowForwardIos cursor={'pointer'} onClick={() => nextMonth(currentDate, setCurrentDate)} size={'1.5rem'}/>
        </Box>
         <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'6'}>
          <Text  width={'300px'} color={''} fontWeight={500} fontSize={'1.2rem'}> Calendar of <span style={{color:"#3182CE"}}>{`${selectedUser?.name || (user?.name+" (you)") }`}</span></Text>
         <SideDrawer setSelectedUser = {setSelectedUser}/>
         </Box>
      </Box>
      <SevenColGrid>
        {DAYS.map((day) => (
          <HeadDays className="nonDRAG">{day}</HeadDays>
        ))}
      </SevenColGrid>

      <SevenColGrid
        fullheight={true}
        is28Days={getDaysInMonth(currentDate) === 28}
      >
        {getSortedDays(currentDate).map((day) => (
          <div
            id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`}
            onDragEnter={(e) =>
              onDragEnter(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                ),
                e
              )
            }
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={drop}
          >
            <span
              className={`nonDRAG ${
                datesAreOnSameDay(
                  new Date(),
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  )
                )
                  ? "active"
                  : ""
              }`}
            >
              {day}
            </span>
            <EventWrapper>
              {events.map(
                (ev, index) =>
                  datesAreOnSameDay(
                    ev.date,
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    )
                  ) && (
                    <StyledEvent
                      onDragStart={(e) => drag(index, e)}
                      draggable
                      className="StyledEvent"
                      id={`${ev.color} ${ev.title}`}
                      key={ev.title}
                      bgColor={ev.color}
                    >
                      Title :{ev.title} <br/>
                      {ev.description ? ev.description:""}
                    </StyledEvent>
                  )
              )}
            </EventWrapper>
          </div>
        ))}
      </SevenColGrid>
      
    </Box>
  );
};

const EventWrapper = ({ children }) => {
  if (children.filter((child) => child).length)
    return (
      <>
        {children}
        {children.filter((child) => child).length > 2 && (
          <SeeMore
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            see more...
          </SeeMore>
        )}
      </>
    );
};


export default Calendar;