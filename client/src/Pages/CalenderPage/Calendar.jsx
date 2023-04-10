import { useContext, useEffect, useRef, useState } from "react";
import {
  SevenColGrid,
  Wrapper,
  HeadDays,
  DateControls,
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
  range,
  sortDays
} from "../../Components/Calendar/Utils";
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from 'react-icons/md'

import {Box, Container} from '@chakra-ui/react'
import './Calendar.css'
import { AppContext } from "../../ContextApi/ContextProvider";
import axios from "axios";
import { API_LINK } from "../../Config/Api";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 3, 1));
  const [events, setEvents] = useState(MOCKAPPS);
  const dragDateRef = useRef();
  const dragindexRef = useRef();
  const [showPortal, setShowPortal] = useState(false);
  const [portalData, setPortalData] = useState({});
  const [taskData,setTaskData] = useState([])

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
      const filteredData = data.filter((elem)=>
         elem.assignedTo._id == user._id).map((elem)=>{
          // console.log(elem)
          // const date = elem.dueDate.substring(0, 10).split('-');
          return {date: new Date(elem.dueDate.substring(0,10)),title:elem.title,color:getDarkColor}
          // return {date: new Date(date[0],date[1],date[2]),title:elem.title,color:getDarkColor}
        })
      setEvents(filteredData);
    } catch (error) {
      console.log("error ==>", error.message);
    }
  }
  console.log(taskData)
  useEffect(()=>{
    fetchTasks()
  },[])

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

  const handleOnClickEvent = (event) => {
    setShowPortal(true);
    setPortalData(event);
  };

  const handlePotalClose = () => setShowPortal(false);

  const handleDelete = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((ev) => ev.title !== portalData.title)
    );
    handlePotalClose();
  };

  return (
    <Box className="calendar-wrapper" w={'80%'} h={"99vh"} borderRadius={'5px'} border={'1px solid lightgray'}>
      <Box w={'100%'} display={'flex'} justifyContent={'space-around'} p={'10px 0'} alignContent={'center'}>
        <MdOutlineArrowBackIos onClick={() => prevMonth(currentDate, setCurrentDate)} size={'1.5rem'}/>
        {getMonthYear(currentDate)} 
        <MdOutlineArrowForwardIos onClick={() => nextMonth(currentDate, setCurrentDate)} size={'1.5rem'}/>
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
            onClick={(e) =>
              addEvent(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                ),
                e
              )
            }
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
                      onClick={() => handleOnClickEvent(ev)}
                      draggable
                      className="StyledEvent"
                      id={`${ev.color} ${ev.title}`}
                      key={ev.title}
                      bgColor={ev.color}
                    >
                      {ev.title}
                    </StyledEvent>
                  )
              )}
            </EventWrapper>
          </div>
        ))}
      </SevenColGrid>
      {showPortal && (
        <Portal
          {...portalData}
          handleDelete={handleDelete}
          handlePotalClose={handlePotalClose}
        />
      )}
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
              console.log("clicked p");
            }}
          >
            see more...
          </SeeMore>
        )}
      </>
    );
};

const Portal = ({ title, date, handleDelete, handlePotalClose }) => {
  return (
    <PortalWrapper>
      <h2>{title}</h2>
      <p>{date.toDateString()}</p>
      <ion-icon onClick={handleDelete} name="trash-outline"></ion-icon>
      <ion-icon onClick={handlePotalClose} name="close-outline"></ion-icon>
    </PortalWrapper>
  );
};


export default Calendar;