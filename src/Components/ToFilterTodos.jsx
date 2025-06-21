import React from "react";
import { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const ToFilterTodos = ({
  todos,
  setTodos,
  dateTime,
  searchText,
  setSearchText,
  dateFilter,
  setDateFilter,
  setDateFilteredTodos,
}) => {
  const [filterbox, setFilterbox] = useState(false);

  const handleClearAll = () => {
    const confirmed = window.confirm("Do you want to delete all todos?");
    if (confirmed) {
      localStorage.removeItem("todos");
      setTodos([]);
    }
  };

  const handleDate = () => {
    const [y, m, d] = dateFilter.split("-");
    const filteredDate = `${d}-${m}-${y}`;

    const newTodos = todos.filter((i) => {
      const { date } = dateTime(i.modifiedAt);
      return date === filteredDate;
    });
    setDateFilteredTodos(newTodos);
  };

  const handleClearFilter = () => {
    setDateFilteredTodos([]);
    setSearchText("");
    setDateFilter("");
  };

  return (
    <div className="relative">
      <div className="flex">
        <div className={`md:hidden fixed w-2/3 h-[80vh] bg-gray-600 p-2 top-14 left-0 rounded-r-md shadow-xl shadow-gray-950 transition-transform duration-300 ease-in-out z-40 ${filterbox?"translate-x-0":"-translate-x-full"}`}>
        <div className="flex justify-between">
          <p className="text-zinc-200 text-4xl font-semibold text-shadow-gray-900 text-shadow-lg mb-4">Apply Filters</p>
          <button
            onClick={() => setFilterbox(!filterbox)}
          >
            {filterbox ? <IoClose className="size-10 text-white"/> : ""}
          </button>
          </div>
          <input
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="bg-gray-300 p-2 rounded w-full mb-4"
            type="text"
            placeholder="Search here....."
            value={searchText}
          />
          <div className="flex gap-1 py-2">
            <input
              onChange={(e) => {
                setDateFilter(e.target.value);
              }}
              className="bg-gray-300 p-2 my-2 rounded  mb-2"
              type="date"
              value={dateFilter}
            />
            <button
              onClick={handleDate}
              className="bg-gray-800 font-semibold rounded text-white px-3 my-2 hover:bg-gray-700 hover:font-bold transition-all"
            >
              Filter
            </button>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleClearFilter}
              className="bg-gray-800 font-semibold rounded text-white p-2 my-2 hover:bg-gray-700 hover:font-bold transition-all"
            >
              Clear filter
            </button>
            <button
              onClick={handleClearAll}
              className="md:w-auto bg-gray-800 font-semibold rounded text-white p-2 my-2 hover:bg-gray-700 hover:font-bold transition-all"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
      <div className="flex md:hidden justify-start">
          <button
            onClick={() => setFilterbox(!filterbox)}
          >
            {filterbox ? "" : <MdMenuOpen className="size-10 text-gray-700"/>}
          </button>
        </div>

      

      <div className="hidden md:flex flex-row justify-between gap-1 bg-gray-500 p-1">
        <div className="flex">
          <button
            onClick={handleClearAll}
            className="md:w-auto bg-gray-800 font-semibold rounded text-white p-2 m-1 hover:bg-gray-700 hover:font-bold transition-all"
          >
            Clear all
          </button>
        </div>

        <div className="flex">
          <input
            onChange={(e) => {
              setDateFilter(e.target.value);
            }}
            className="bg-gray-300 rounded-lg w-full p-2 m-1 mr-2 border-none"
            type="date"
            value={dateFilter}
          />
          <button
            onClick={handleDate}
            className="bg-gray-800 font-semibold rounded text-white p-2 m-1 hover:bg-gray-700 hover:font-bold transition-all"
          >
            Filter
          </button>
        </div>

        <div className="flex">
          <button
            onClick={handleClearFilter}
            className="bg-gray-800 font-semibold rounded text-white p-2 m-1 hover:bg-gray-700 hover:font-bold transition-all"
          >
            Clear filter
          </button>
        </div>

        <div className="flex">
          <input
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
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
