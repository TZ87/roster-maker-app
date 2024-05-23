import React, { useState, useEffect } from "react";
import './style.css';

function Home() {
  const [workers, setWorkers] = useState([
    "Dolgozó1", "Dolgozó2", "Dolgozó3", "Dolgozó4", "Dolgozó5", "Dolgozó6", "Dolgozó7", "Dolgozó8", "Dolgozó9", "Dolgozó10", "Dolgozó11", "Dolgozó12", "Dolgozó13", "Dolgozó14", "Dolgozó15", "Dolgozó16", "Dolgozó17", "Dolgozó18"
  ]);
 
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState("05");
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [daysArray, setDaysArray] = useState([...Array(daysInMonth).keys()].map(day => day + 1));
  const [freeDays, setFreeDays] = useState([]);
  const [holidays, setHolidays] =useState([]);
  const [monthlyWorkHours, setMonthlyWorkHours]= useState(0);
  const [shifts, setShifts] = useState({});
  const [shiftHours, setShiftHours] = useState(12);
  const [totalDayShifts, setTotalDayShifts] = useState({});
  const [totalNightShifts, setTotalNightShifts] = useState({});
  const [totalWorkHours, setTotalWorkHours] = useState({});



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
    setShifts({});
    setTotalDayShifts({});
    setTotalNightShifts({});
    setTotalWorkHours({});
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

  const calculateMonthlyWorkHours = (daysArray, holidays, workHoursPerDay) => {
    let workdays = daysArray.filter(day => !isWeekend(day) && !holidays.some(holiday => parseInt(holiday.date.substr(8, 2)) === day));
    setMonthlyWorkHours(workdays.length * workHoursPerDay);
  };

  useEffect(() => {
    calculateMonthlyWorkHours(daysArray, holidays, 8); 
  }, [daysArray, holidays]);


const getRandomElements = (array, count) => {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const assignShifts = () => {
  const newShifts = {};
  const workHours = workers.reduce((acc, worker) => {
    acc[worker] = 0;
    return acc;
  }, {});
  const previousNightShiftWorkers = [];

  const totalDayShiftsTemp = {};
  const totalNightShiftsTemp = {};

  workers.forEach(worker => {
    totalDayShiftsTemp[worker] = 0;
    totalNightShiftsTemp[worker] = 0;
  });

  daysArray.forEach(day => {
    const dayStr = day.toString();
    newShifts[dayStr] = { dayShift: [], nightShift: [] };

    
    let availableDayWorkers = workers.filter(worker => !previousNightShiftWorkers.includes(worker) && workHours[worker] + shiftHours <= monthlyWorkHours);
    const dayShiftWorkers = getRandomElements(availableDayWorkers, 4);
    newShifts[dayStr].dayShift = dayShiftWorkers;
    dayShiftWorkers.forEach(worker => {
      workHours[worker] += shiftHours;
      totalDayShiftsTemp[worker] += 1;
    });

    
    let availableNightWorkers = workers.filter(worker => !dayShiftWorkers.includes(worker) && workHours[worker] + shiftHours <= monthlyWorkHours);
    const nightShiftWorkers = getRandomElements(availableNightWorkers, 3);
    newShifts[dayStr].nightShift = nightShiftWorkers;
    nightShiftWorkers.forEach(worker => {
      workHours[worker] += shiftHours;
      totalNightShiftsTemp[worker] += 1;});

    
    previousNightShiftWorkers.length = 0;
    previousNightShiftWorkers.push(...nightShiftWorkers);
  });

  setShifts(newShifts);
  setTotalDayShifts(totalDayShiftsTemp);
  setTotalNightShifts(totalNightShiftsTemp);
  
  const totalWorkHoursTemp = {};
  workers.forEach(worker => {
    totalWorkHoursTemp[worker] = (totalDayShiftsTemp[worker] + totalNightShiftsTemp[worker]) * shiftHours;
  });
  setTotalWorkHours(totalWorkHoursTemp);
};

/*useEffect(() => {
  assignShifts();
}, [selectedMonth]);*/
 
return (
  <div>
    <h1>Üdvözlöm a Roster Maker applikációban!</h1>
    <label>Válasszon egy hónapot 2024-ben: </label>
    
    <select id="monthSelect" value={selectedMonth} onChange={(e) => setSelectedMonth((e.target.value))}>
      {monthOptions.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>

    <p>Havi munkaóra keret: {monthlyWorkHours} óra</p>

    <button onClick={assignShifts}>Műszakok kiosztása</button>

    <table>
      <thead>
        <tr>
          <th>Nap</th>
          {daysArray.map(day => (
            <th key={day} style={{backgroundColor: isWeekend(day) ? 'lightgray' : ''}}>{day}</th>
          ))}
          <th>N</th>
          <th>É</th>
          <th>Ó</th>
        </tr>
        <tr>
          <th>Név</th>
          {daysArray.map(day => (
            <th key={day} style={{backgroundColor: isWeekend(day) ? 'lightgray' : ''}}>{new Date(selectedYear, selectedMonth - 1, day).toLocaleDateString('hu-HU', { weekday: 'short' })}</th>
          ))}
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {workers.map((name, index) => (
          <tr key={index}>
            <td>{name}</td>
            {daysArray.map(day => (
              <td key={day}>{shifts[day] && shifts[day].dayShift.includes(name) && 'N'}
              {shifts[day] && shifts[day].nightShift.includes(name) && 'É'}</td>
            ))}
            <td>{totalDayShifts[name]}</td>
            <td>{totalNightShifts[name]}</td>
            <td>{totalWorkHours[name]}</td>
          </tr>
        ))}
      </tbody>
      {holidays.length > 0 && (
        <tfoot>
          <tr>
            <td colSpan={daysArray.length + 4} style={{ color: 'red' }}>
              A következő áthelyezett munkanapok illetve ünnepnapok vannak az adott hónapban:
            </td>
          </tr>
          {holidays.map((holiday, index) => (
            <tr key={index}>
              <td colSpan={daysArray.length + 4} style={{ color: 'red' }}>
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