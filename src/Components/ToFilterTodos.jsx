import React from "react";

const ToFilterTodos = ({todos,setTodos,dateTime,searchText,setSearchText,dateFilter,setDateFilter,setDateFilteredTodos}) => {
  

  const handleClearAll = () => {
    const confirmed = window.confirm("Do you want to delete all todos?");
    if (confirmed) {
      localStorage.removeItem("todos");
      setTodos([]);
    }
  };


  const handleDate = () => {
    const [y,m,d] = dateFilter.split("-")
    const filteredDate = `${d}-${m}-${y}`

    const newTodos = todos.filter(i=>{
        const {date} = dateTime(i.modifiedAt)
        return date === filteredDate;
    })
    setDateFilteredTodos(newTodos)
  }

  const handleClearFilter = () => {
    setDateFilteredTodos([])
    setSearchText("")
    setDateFilter("")
  }

  return (
    <div>
      <div className="flex justify-between bg-gray-500">
        <div className="flex">
          <button
            onClick={handleClearAll}
            className="bg-gray-800 font-semibold rounded text-white p-2 m-1 hover:bg-gray-700 hover:font-bold"
          >
            Clear all
          </button>
        </div>

        <div className="flex">
          <input
            onChange={(e) => {
              setDateFilter(e.target.value)
            }}
            className="bg-gray-300 rounded-lg w-full p-2 m-1 mr-2 border-none"
            type="date"
            value={dateFilter}
          />
          <button
            onClick={handleDate}
            className="bg-gray-800 font-semibold rounded text-white p-2 m-1 hover:bg-gray-700 hover:font-bold"
          >
            Filter
          </button>
        </div>

        <div className="flex">
          <button onClick={handleClearFilter} className="bg-gray-800 font-semibold rounded text-white p-2 m-1 hover:bg-gray-700 hover:font-bold">Clear filter</button>
        </div>

        <div className="flex">
          <input
            onChange={(e)=>{setSearchText(e.target.value)}}
            className="bg-gray-300 rounded-lg w-full p-2 m-1 mr-2 border-none"
            type="text"
            placeholder="Search here....."
            value={searchText}
          />
        </div>
      </div>
    </div>
  );
};

export default ToFilterTodos;
