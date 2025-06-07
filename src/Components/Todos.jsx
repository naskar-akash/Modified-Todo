import { useState ,useEffect} from "react";
import React from "react";
import "./Todos.css";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";



const Todos = () => {
const [todo, setTodo] = useState("");
const [todos, setTodos] = useState([]);
const [showFinished, setShowFinished] = useState(false)

useEffect(() => {
  let todostring = localStorage.getItem("todos")
  if(todostring){
    let todos = JSON.parse(todostring)
    setTodos(todos)
  }
}, [])


useEffect(() => {
  if(todos.length > 0 ){
  localStorage.setItem("todos",JSON.stringify(todos))
  }
}, [todos])


const handleAdd = () => { 
  const newTodo = {
    id: uuidv4(),
    todo,
    modifiedAt: new Date().toISOString(),
    isCompleted: false,
    isEditing: false
  };
  
  setTodos(prevTodos => [...prevTodos, newTodo]);
  setTodo("");
};


const handleChange = (e) => {
  setTodo(e.target.value)
}


const handleCnge = (e,id) => {
  const updatedTodos = todos.map((t) =>
    t.id === id? { ...t, todo: e.target.value }: t);
  setTodos(updatedTodos);
}

const handleEdit = (e,id) => {
   const newTodos = todos.map((i) =>
      i.id === id ? { ...i, isEditing: true } : i
    );
    setTodos(newTodos);
}

const handleDelete = (e,id) => {
      let newTodos = todos.filter(item=>{
        return item.id != id;
      })
      setTodos(newTodos)
}

const handleSave = (e,id,newTodo) => {
   const newTodos = todos.map((t) =>
      t.id === id ? { ...t, todo: newTodo, isEditing: false } : t
    );
    setTodos(newTodos);
}


const handleCheck = (e,id) => {
  let newTodos = todos.filter(item=>{
    return item.id === id;
  })
  let index = todos.findIndex(item=>{
    return item.id === id;
  })
  newTodos = [...todos]
  newTodos[index].isCompleted = !newTodos[index].isCompleted
  setTodos(newTodos)
}

const navigate = useNavigate();

const handleShowTodos = () => {
  navigate("/Todos/Showtodos")
}


const toggleFinished = () =>{
  setShowFinished(!showFinished)
}


  return (
    <>
      <div className="container bg-gray-300 rounded-xl mx-auto my-2 py-2 px-4 min-h-[70vh]">
        <h2 className="main-logo">@Todo-Add your todos here</h2>
        <div className="flex gap-10 w-full">
          <div className="left px-2 w-3/4 border-r-2 border-cyan-600">
            <div className="add-todo">
              <h2>Add Toodos</h2>
              <div className="flex gap-1 flex-col my-2">
                <input onChange={handleChange} className='bg-white rounded-lg mx-2 px-2 py-1' type="text" value={todo}/>
                <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-600 font-bold text-white rounded mx-2 px-2 hover:bg-violet-800 py-1 hover:font-extrabold transform-fill disabled:cursor-not-allowed">Add</button>
              </div>
            </div>


            <div className="todo-list">
              <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
              <h2>Your Todos</h2>

            {todos.length === 0 && <div className="my-3 mx-3">No todos to display</div> }
              {todos.map(item=>{
                return (showFinished || !item.isCompleted) && <div key={item.id} className="todos flex justify-between w-2/3 my-3">
        
                  {item.isEditing?(<>
    
                      <input onChange={(e)=>{handleCnge(e,item.id)}} className="bg-white rounded-lg mx-2 px-2 py-1" type="text" value={item.todo}/>
                      <button onClick={(e)=>{handleSave(e,item.id,item.todo)}} className="bg-blue-800 font-bold text-white rounded px-2 hover:bg-blue-950 mx-1">Save</button>

                  </>):(<>
                      <div className="flex gap-2">
                      <input onChange={(e)=>{handleCheck(e,item.id)}} type="checkbox" checked={item.isCompleted} id={item.id} />
                      <div className={item.isCompleted?"line-through":""}>{item.todo }</div>
                      </div>
                    <div className="buttons flex h-full"> 
                      <button onClick={(e)=>{handleEdit(e,item.id)}} className="bg-blue-800 font-bold text-white rounded px-2 hover:bg-blue-950 mx-1">Edit</button>
                      <button onClick={(e)=>{handleDelete(e,item.id)}} className="bg-blue-800 font-bold text-white rounded px-2 hover:bg-blue-950 mx-1">Delete</button>
                    </div>  

                  </>)}
                    
                  </div>
              })}

            </div>
          </div>


          <div className="right flex flex-col justify-center mx-2">
            <div className="flex flex-col my-4 px-3">
              <h2>Click to show todos</h2>
              <button onClick={handleShowTodos} className="mx-5 bg-blue-800 rounded text-white font-bold hover:bg-blue-950 w-1/2">Click</button>
            </div>
          </div>
        </div>
      </div>
    </> 
  );
};

export default Todos;
