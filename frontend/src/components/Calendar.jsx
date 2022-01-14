import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isMobile } from "react-device-detect";

// Requirements
// - Look through NPM and see the available calendar components for React. Pay close attention to how popular they are, how useful the documentation is, and if it will be able to service the needs described in our PRD
// - Be prepared to justify your decision! We will be working with this Calendar all quarter, so it better be good!

// Choose One or Both
// - Implement the Calendar component in React. Don't worry about styling, just make sure it works just to test it out
// - Make a write up in a notion page documenting the options you looked at and the why you chose the one you did

// Possible additions for DatePicker:
// - month and year dropdowns
// - changing the style for specific dates (such as graying out those outside of the selected month or those with no available sapces)

export default function Calendar() {
  // selected date
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <p>Select Date:</p>
      {/* pop up calendar - uses portal version on mobile devices to fit screen size */}
      {isMobile ? (
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          fixedHeight
          withPortal
        />
      ) : (
        <DatePicker selected={date} onChange={(d) => setDate(d)} fixedHeight />
      )}
      {/* placeholder for available spaces */}
      <p>Available Spaces for {date.toLocaleDateString()}: 0</p>
    </div>
  );
}
