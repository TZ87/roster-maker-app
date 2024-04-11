import React, { useState, useEffect } from "react";
import './style.css';

function Home() {
  const [workers, setWorkers] = useState([
    "W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"
  ]);
  const [years, setYears] = useState([
    2024,2025,2026,2027
  ]);

  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [daysArray, setDaysArray] = useState([...Array(daysInMonth).keys()].map(day => day + 1));
  const [freeDays, setFreeDays] = useState([]);

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
  }, [selectedMonth]);
  //console.log(selectedMonth, daysInMonth);
 
  const getDaysInMonth = (year, month) => {
     return new Date(year, month, 0).getDate();
  };

  useEffect(()=> {
    fetch(`https://szunetnapok.hu/api/91ba48bb924e7cf64df1db2dcf9648d28fed707ea475eeec6ad1cef91594f2a8/2024${selectedMonth}`)
    .then(resp => {
      return resp.json();
    })
    .then(data=>{
      setFreeDays(data);
     // console.log(data);
    });
  },[selectedMonth]);

  console.log(freeDays);

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
            <th>Név</th>
            {daysArray.map(day => (
              <th key={day}>{day}</th>
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
      </table>
    </div>
  );
}

export default Home;
