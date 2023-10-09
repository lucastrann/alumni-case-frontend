import React from 'react';
import '../Pages.css'
import CalendarComp from '../../components/CalendarComp';

const Calendar = () => {
  return (
    <>
      <div className='container'>
        <div className='title'>Calendar page</div>
        <CalendarComp/>
      </div>
    </>
  );
};

export default Calendar;