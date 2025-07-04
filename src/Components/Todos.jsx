import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoIosAddCircle } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import EditTodos from "./EditTodos";
import ToFilterTodos from "./ToFilterTodos";

const Todos = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [dateFilteredTodos, setDateFilteredTodos] = useState([]);

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

  const dateTime = (isoString) => {
    const date = new Date(isoString);
    let day = String(date.getDay() + 15).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = String(date.getFullYear());
    let hour = String(date.getHours()).padStart(2, "0");
    let minute = String(date.getMinutes()).padStart(2, "0");
    let second = String(date.getSeconds()).padStart(2, "0");

    return {
      date: `${day}-${month}-${year}`,
      time: `${hour}-${minute}-${second}`,
    };
  };

  const handleAdd = () => {
    const newTodo = {
      id: uuidv4(),
      title: todoTitle,
      desc: todoDesc,
      modifiedAt: new Date().toISOString(),
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

  const handleRemove = (e, id) => {
    let newTodos = todos.filter((i) => {
      return i.id != id;
    });
    setTodos(newTodos);
  };

  const handleEdit = (e, id) => {
    const newTodo = todos.find((i) => {
      return i.id === id;
    });
    setEditingTodo(newTodo);
    setTodoTitle(newTodo.title);
    setTodoDesc(newTodo.desc);
    setOpen(true);
  };

  const handleSaveCnge = (updatedTodos) => {
    const newTodos = todos.map((i) => {
      return i.id === updatedTodos.id ? updatedTodos : i;
    });
    setTodos(newTodos);
    setTodoTitle("");
    setTodoDesc("");
    setEditingTodo("");
  };

  const filteredTodos = todos.filter((i) => {
    return (i.desc ?? "").toLowerCase().includes(searchText.toLowerCase());
  });

  const displayTodos = searchText
    ? filteredTodos
    : dateFilter
    ? dateFilteredTodos
    : todos;

  return (
    <div className="">
      <ToFilterTodos
        todos={todos}
        setTodos={setTodos}
        dateTime={dateTime}
        searchText={searchText}
        setSearchText={setSearchText}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        setDateFilteredTodos={setDateFilteredTodos}
      />

      <div className="p-2">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">My Todos</h1>
          <div className="flex justify-center">
            <button onClick={() => setShowForm(!showForm)}>
              <IoIosAddCircle className="text-6xl m-1" />
            </button>

            {showForm && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAdd();
                }}
                className="w-full flex flex-col md:flex-row gap-1 m-1 p-1 border rounded shadow"
              >
                <input
                  onChange={(e) => {
                    setTodoTitle(e.target.value);
                  }}
                  className="bg-gray-300 w-full rounded-lg md:px-1 p-1 m-1 border-none"
                  type="text"
                  placeholder="Add title..."
                  value={todoTitle}
                />
                <input
                  onChange={(e) => {
                    setTodoDesc(e.target.value);
                  }}
                  className="bg-gray-300 w-full rounded-lg md:px-1 p-1 m-1 border-none"
                  type="text"
                  placeholder="Add description..."
                  value={todoDesc}
                />
                <button
                  type="submit"
                  disabled={todoTitle.length <= 0 || todoDesc.length <= 3}
                  className="bg-gray-800 rounded text-white px-1 m-1 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="overflow-y-auto max-h-[75vh]">
          <div className="flex flex-wrap justify-center gap-3">
            {displayTodos.length === 0 ? (
              <div className="flex justify-center text-2xl">
                No Todos to Display
              </div>
            ) : (
              displayTodos.map((i) => {
                let { date, time } = dateTime(i.modifiedAt);
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
                        ? "bg-gray-400 hover:bg-gray-200"
                        : "bg-gray-400 hover:bg-gray-200"
                    } rounded-lg shadow-lg w-full sm:w-[280px] min-h-[200px] transition-all hover:shadow-md`}
                  >
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col gap-10">
                        <div className="flex flex-col justify-center">
                          <h3 className="flex justify-center">{i.title}</h3>
                          <p className="flex justify-start truncate max-w-[200px]">
                            {i.desc}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex justify-start gap-3">
                            <p className="font-semibold">{date}</p>
                            <p className="font-semibold">{time}</p>
                          </div>
                          <div className="flex justify-end gap-2 pb-3">
                            <button
                              onClick={(e) => {
                                handleRemove(e, i.id);
                              }}
                            >
                              <MdDeleteOutline className="size-6" />
                            </button>

                            <button
                              onClick={(e) => {
                                handleEdit(e, i.id);
                              }}
                            >
                              <CiEdit className="size-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
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
        <EditTodos
          open={open}
          setOpen={setOpen}
          editingTodo={editingTodo}
          todoTitle={todoTitle}
          setTodoTitle={setTodoTitle}
          todoDesc={todoDesc}
          setTodoDesc={setTodoDesc}
          onSave={handleSaveCnge}
        />
      </div>
    </div>
  );
};

export default Todos;
