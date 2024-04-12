import React, { useState, useEffect } from "react";
import './style.css';

function Home() {
  const [workers, setWorkers] = useState([
    "Dolgozó1", "Dolgozó2", "Dolgozó3", "Dolgozó4", "Dolgozó5", "Dolgozó6", "Dolgozó7", "Dolgozó8", "Dolgozó9", "Dolgozó10", "Dolgozó11", "Dolgozó12"
  ]);
 
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState("05");
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [daysArray, setDaysArray] = useState([...Array(daysInMonth).keys()].map(day => day + 1));
  const [freeDays, setFreeDays] = useState([]);
  const [holidays, setHolidays] =useState([]);

  const [monthOptions,setMonthOptions] = useState([
    { value: "01", label: "Január" },
    { value: "02", label: "Február" },
    { value: "03", label: "Március" },
    { value: "04", label: "Április" },
    { value: "05", label: "Május" },
    { value: "06", label: "Június" },
    { value: "07", label: "Július" },
    { value: "08", label: "Augusztus" },
    { value: "09", label: "Szeptember" },
    { value: "10", label: "Október" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]);

  useEffect(() => {
    const days = getDaysInMonth(selectedYear, selectedMonth);
    setDaysInMonth(days);
    setDaysArray([...Array(days).keys()].map(day => day + 1));
    filterHolidaysInSelectedMonth();
  }, [selectedMonth, freeDays]);


const getData = () => {
  fetch('freeDays.json', {headers: {
    'Content-Type' : 'application/json',
    'Accept': 'application./json'
  }}).then((response)=>{
    return response.json()
  }).then((data)=>{
    setFreeDays(data);
  })
}

useEffect(()=>{
  getData()
},[])
 
  const getDaysInMonth = (year, month) => {
     return new Date(year, month, 0).getDate();
  };

  const isWeekend = (day) => {
    const date = new Date(selectedYear, selectedMonth - 1, day);
    const dayOfWeek = date.getDay(); 
    return dayOfWeek === 0 || dayOfWeek === 6; 
  };

  const filterHolidaysInSelectedMonth = () => {
    if (freeDays && freeDays.length > 0) {
           
      const holidaysInSelectedMonth = freeDays.filter(holiday => {
       return holiday.date.substr(5,2)==selectedMonth
      });
  
      if (holidaysInSelectedMonth.length > 0) {
        setHolidays(holidaysInSelectedMonth);
      } else {
        setHolidays([]);
      }
    }
  };
 
  return (
    <div>
      <h1>Üdvözlöm a Roster Maker applikációban!</h1>
      <label>Válasszon egy hónapot 2024-ben: </label>
      
      <select id="monthSelect" value={selectedMonth} onChange={(e) => setSelectedMonth((e.target.value))}>
        {monthOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      
      <table>
        <thead>
          <tr>
            <th>Nap</th>
            {daysArray.map(day => (
              <th key={day} style={{backgroundColor: isWeekend(day)? 'lightgray':''}}>{day}</th>
            ))}
          </tr>
          <tr>
            <th>Név</th>
            {daysArray.map(day => (
              <th key={day} style={{backgroundColor: isWeekend(day)? 'lightgray':''}}>{new Date(selectedYear, selectedMonth - 1, day).toLocaleDateString('hu-HU', { weekday: 'short' })}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {workers.map((name, index) => (
            <tr key={index}>
              <td>{name}</td>
              {daysArray.map(day => (
                <td key={day}>{/*Műszak*/}</td>
              ))}
            </tr>
          ))}
        </tbody>
        {holidays.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan={daysArray.length} style={{ color: 'red' }}>
                  A következő áthelyezett munkanapok illetve ünnepnapok vannak az adott hónapban:
                </td>
              </tr>
              {holidays.map((holiday, index) => (
                <tr key={index}>
                  <td colSpan={daysArray.length} style={{ color: 'red' }}>
                    {holiday.date} - {holiday.name}
                  </td>
                </tr>
              ))}
            </tfoot>
        )}
      </table>
    </div>
  );
}

export default Home;
