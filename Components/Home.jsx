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
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [daysArray, setDaysArray] = useState([...Array(daysInMonth).keys()].map(day => day + 1));

  const [monthOptions,setMonthOptions] = useState([
    { value: 1, label: "Január" },
    { value: 2, label: "Február" },
    { value: 3, label: "Március" },
    { value: 4, label: "Április" },
    { value: 5, label: "Május" },
    { value: 6, label: "Június" },
    { value: 7, label: "Július" },
    { value: 8, label: "Augusztus" },
    { value: 9, label: "Szeptember" },
    { value: 10, label: "Október" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ]);

  useEffect(() => {
    const days = getDaysInMonth(selectedYear, selectedMonth);
    setDaysInMonth(days);
    setDaysArray([...Array(days).keys()].map(day => day + 1));
  }, [selectedYear, selectedMonth]);
  console.log(selectedYear, selectedMonth, daysInMonth);
 
  const getDaysInMonth = (year, month) => {
     return new Date(year, month, 0).getDate();
  };

  return (
    <div>
      <h1>Üdvözlöm a Roster Maker applikációban!</h1>
      <label>Válasszon egy hónapot: </label>
      <select id="yearSelect" value={selectedYear} onChange={(e) => setSelectedYear((e.target.value))}>
        {years.map((year, index) => (
          <option key={index} value={year}>{year}</option>
        ))}
      </select>
      <select id="monthSelect" value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
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
