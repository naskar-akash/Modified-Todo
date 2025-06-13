import React from "react";
import { useState, useEffect } from "react";
import { data } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      setTodos(JSON.parse(todoString))
    }
  }, [])
  

  useEffect(() => {
    if(todos.length > 0){
    localStorage.setItem("todos",JSON.stringify(todos))
    }
  }, [todos])
  

  const handleAdd = () => {
    const newTodo = { id: uuidv4(), todo, status: "" };
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const handleStatus = (e, id) => {
    const newTodos = todos.map((i) => {
      return i.id === id ? { ...i, status: e.target.value } : i;
    });
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((i) => {
      return i.todo.toLowerCase().includes(searchText.toLowerCase());
    });
  

  const displayTodos = searchText ? filteredTodos : todos;

  return (
    <div>
      <div className="flex justify-between bg-gray-500">
        <div className="flex gap-1 mx-2">
          <input
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            className="bg-gray-300 w-full p-2 m-1 border-none"
            type="text"
            value={todo}
          />
          <button
            onClick={handleAdd}
            className="bg-gray-800 text-white p-2 m-1"
          >
            Add
          </button>
        </div>
        <div className="flex">
          <input
            onChange={(e) => {setSearchText(e.target.value)}}
            className="bg-gray-300 w-full p-2 m-1 border-none"
            type="text"
            placeholder="Search here....."
            value={searchText}
          />
        </div>
      </div>
      <div>
        {displayTodos.length === 0 ? (
          <div className="flex justify-center">No Todos to Display</div>
        ) : (
          displayTodos.map((i) => {
            return (
              <div
                key={i.id}
                className={`flex justify-between p-2 m-2 ${
                  i.status === "Open"
                    ? "bg-blue-600"
                    : i.status === "Ongoing"
                    ? "bg-amber-300"
                    : i.status === "Done"
                    ? "bg-green-500"
                    : i.status === "Undo"
                    ? "bg-gray-300"
                    : "bg-gray-300"
                }`}
              >
                <div className="">{i.todo}</div>
                <div>
                  <input
                    onChange={(e) => handleStatus(e, i.id)}
                    type="radio"
                    checked={i.status === "Open"}
                    name={`status-${i.id}`}
                    value="Open"
                  />{" "}
                  Open
                  <input
                    onChange={(e) => handleStatus(e, i.id)}
                    type="radio"
                    checked={i.status === "Ongoing"}
                    name={`status-${i.id}`}
                    value="Ongoing"
                  />{" "}
                  Ongoing
                  <input
                    onChange={(e) => handleStatus(e, i.id)}
                    type="radio"
                    checked={i.status === "Done"}
                    name={`status-${i.id}`}
                    value="Done"
                  />{" "}
                  Done
                  <input
                    onChange={(e) => handleStatus(e, i.id)}
                    type="radio"
                    checked={i.status === "Undo"}
                    name={`status-${i.id}`}
                    value="Undo"
                  />{" "}
                  Undo
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Todos;
