import React from "react";
import { useState, useEffect } from "react";
import { data } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IoIosAddCircle } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const Todos = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleAdd = () => {
    const newTodo = {
      id: uuidv4(),
      title: todoTitle,
      desc: todoDesc,
      status: "",
    };
    setTodos([...todos, newTodo]);
    setTodoTitle("");
    setTodoDesc("");
    setShowForm(false);
  };

  const handleStatus = (e, id) => {
    const newTodos = todos.map((i) => {
      return i.id === id ? { ...i, status: e.target.value } : i;
    });
    setTodos(newTodos);
  };

  const handleClearAll = () => {
    const confirmed = window.confirm("Do you want to delete all todos?");
    if (confirmed) {
      localStorage.removeItem("todos");
      setTodos([]);
    }
  };

  const handleRemove = (e, id) => {
    let newTodos = todos.filter((i) => {
      return i.id != id;
    });
    setTodos(newTodos);
  };

  const handleEdit = (e,id) => {
    console.log(id)
  }

  const filteredTodos = todos.filter((i) => {
    return (i.desc ?? "").toLowerCase().includes(searchText.toLowerCase());
  });

  const displayTodos = searchText ? filteredTodos : todos;

  return (
    <div>
      <div className="flex justify-between bg-gray-500">
        <div className="flex">
          <button
            onClick={handleClearAll}
            className="bg-gray-800 rounded text-white p-2 m-1"
          >
            Clear all
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
      <div className="p-2">
        <div className="flex gap-[100vh]">
          <h1 className="text-2xl font-bold">My Todos</h1>
          <div className="flex justify-center">
            <button onClick={() => setShowForm(!showForm)}>
              <IoIosAddCircle className="text-6xl m-1" />
            </button>

            {showForm && (
              <form onSubmit={(e)=>{
                e.preventDefault();
                handleAdd();
              }}
                className="w-full max-w-3xl flex gap-1 m-1 p-1 border rounded shadow"
              >
                <input
                  onChange={(e) => {
                    setTodoTitle(e.target.value);
                  }}
                  className="bg-gray-300 w-full rounded-lg px-1 m-1 border-none"
                  type="text"
                  placeholder="Add title..."
                  value={todoTitle}
                />
                <input
                  onChange={(e) => {
                    setTodoDesc(e.target.value);
                  }}
                  className="bg-gray-300 w-full rounded-lg px-1 m-1 border-none"
                  type="text"
                  placeholder="Add description..."
                  value={todoDesc}
                />
                <button
                  type="submit"
                  className="bg-gray-800 rounded text-white px-1 m-1"
                >
                  Add
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {displayTodos.length === 0 ? (
            <div className="flex justify-center text-2xl">
              No Todos to Display
            </div>
          ) : (
            displayTodos.map((i) => {
              return (
                <div
                  key={i.id}
                  className={`flex justify-between p-2 m-2 ${
                    i.status === "Open"
                      ? "bg-blue-600 hover:bg-blue-500"
                      : i.status === "Ongoing"
                      ? "bg-amber-300 hover:bg-amber-200"
                      : i.status === "Done"
                      ? "bg-green-500 hover:bg-green-400"
                      : i.status === "Undo"
                      ? "bg-gray-300 hover:bg-gray-200"
                      : "bg-gray-300 hover:bg-gray-200"
                  } rounded-lg shadow-lg w-[280px] min-h-[200px] transition-all hover:shadow-md`}
                >
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                    <div className="flex flex-col justify-center">
                      <h3 className="flex justify-center">{i.title}</h3>
                      <p className="flex justify-start">{i.desc}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={(e) => {
                          handleRemove(e, i.id);
                        }}
                      >
                        <MdDeleteOutline />
                      </button>

                      <button
                        onClick={(e) => {
                          handleEdit(e, i.id);
                        }}
                      >
                        <CiEdit />
                      </button>
                    </div>
                    </div>
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
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
