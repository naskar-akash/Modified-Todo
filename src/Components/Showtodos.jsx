import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";

const Showtodos = () => {
 const [todos, setTodos] = useState([]);
 const [dateFilter, setDateFilter] = useState("")
 const [filteredTodos, setFilteredTodos] = useState([])
 const [isfiltered, setIsfiltered] = useState(false)
 const [search, setSearch] = useState("")
 const [searchedTodos, setSearchedTodos] = useState([])

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const dateTime = (isoString) => {
    const date = new Date(isoString)

    let day = String(date.getDate()).padStart(2,"0")
    let month = String(date.getMonth()+1).padStart(2,"0")
    let year = String(date.getFullYear())

    let hour = String(date.getHours()).padStart(2,"0")
    let minutes = String(date.getMinutes()).padStart(2,"0")
    let seconds = String(date.getSeconds()).padStart(2,"0")
      return{
        date:`${day}-${month}-${year}`,
        time:`${hour}-${minutes}-${seconds}`
      }
  }
  const handleFilterDates = () =>{
    let [y,m,d] = dateFilter.split("-");
    let formattedDate = `${d}-${m}-${y}`

    let newTodos = todos.filter(i=>{
      const {date} = dateTime(i.modifiedAt)
      return date == formattedDate;
    })
    setFilteredTodos(newTodos)
    setIsfiltered(true)
  }


  const handleDateFilterCnge = (e) =>{
    setDateFilter(e.target.value)
  }

  const handleSearch = (e) =>{
    setSearch(e.target.value)
  }

  const searchBtn = ()=>{
    let text = search;
    
    let newTodos = todos.filter(i=>{
     return i.todo.toLowerCase().includes(text.toLowerCase())
    })
    setSearchedTodos(newTodos)
    setIsfiltered(true)
    console.log(newTodos)
  }

  const toDisplayFinalTodos = () =>{
    if (search.trim() != "") {
      return searchedTodos;
    } else if(dateFilter) {
      return filteredTodos;
    }else{
      return todos;
    }
  }


  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between bg-gray-500 mx-1 py-1 rounded-xl">
        <button
          onClick={goBack}
          className="bg-gray-50 p-2 m-1 rounded text-gray-800 hover:bg-gray-700 hover:text-white"
        >
          <GrPrevious />
        </button>
        <div className="flex">
          <input onChange={(e)=>{handleDateFilterCnge(e)}} className="bg-amber-100 rounded-lg px-1 w-40" type="date" value={dateFilter} id="" />
          <button onClick={handleFilterDates} className="bg-orange-300 text-gray-500 rounded px-1 mx-2 hover:bg-orange-600 transition-all hover:text-white">filter by dates</button>
        </div>

        <div className="flex">
          <input onChange={(e)=>{handleSearch(e)}} className="bg-blue-50 w-80 px-2 rounded-lg" type="text" value={search} />
          <button onClick={searchBtn} className="bg-blue-600 px-1 mx-2 text-white rounded hover:bg-blue-700 transition-all hover:font-bold">
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-column justify-center">
        <h2 className="mx-2">Your Todos are here</h2>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border-2 text-xl text-center">Todos</th>
              <th className="p-2 border-2 text-xl text-center">Date</th>
              <th className="p-2 border-2 text-xl text-center">Time</th>
              <th className="p-2 border-2 text-xl text-center">Status</th>
            </tr>
          </thead>

          <tbody>
          {toDisplayFinalTodos().length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-xl text-gray-600">
                   No Todos to Display
                </td>
              </tr>
          ) : (
            toDisplayFinalTodos().map((item) => {
            let {date, time} = dateTime(item.modifiedAt)
            return (
                <tr key={item.id} className={item.isCompleted?"bg-green-400":"bg-red-400"}>
                  <td className="py-2 border-2 px-3">{item.todo}</td>
                  <td className="py-2 border-2 px-3">{date}</td>
                  <td className="py-2 border-2 px-3">{time}</td>
                  <td className="py-2 border-2 px-3">{item.isCompleted ? "Completed" : "Incompleted"}</td>
                </tr>
            );
          })
        )}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Showtodos;
