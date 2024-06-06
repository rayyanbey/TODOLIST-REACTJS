import { useState } from "react";
import Navbar from "./components/Navbar";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);


  const handleEdit = () => {};
  const handleDel = (e) => {
    let id = e.target.name;
    //console.log(id)
    let updatedTodos = [...todos];
    let a = confirm("Are you Sure");
    if (a == true) {
      updatedTodos.pop(id);
      setTodos(updatedTodos);
    }
  };
  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

    let completedTodos = newTodos.filter((todo) => todo.isCompleted);
    setCompleted(completedTodos, { id: uuidv4() });
    console.log(completedTodos);
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 rounded-xl min-h-[70vh]  bg-gradient-to-r from-cyan-400 to-blue-400 w-1/2 flex-row">
        <div className="addTodo my-5">
          <h2 className="text-xl font-semibold text-pretty ">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className=" w-80 rounded-md"
          />
          <button
            onClick={handleAdd}
            className="bg-cyan-600 hover:bg-cyan-300  p-3 py-1 rounded-xl mx-5 text-white"
          >
            Add
          </button>
        </div>


        <h2 className="text-xl font-semibold text-pretty">Your Todos</h2>
        {todos.length === 0 && (
          <div className="font-light text-xl">No Todos to display</div>
        )}
        {todos.map((item) => {
          return (
            <div key={item.id} className="todos">
              <div className="todo flex w-1/2 justify-between mb-3">
                <input
                  onChange={handleCheck}
                  type="checkbox"
                  //value={item.isCompleted}
                  name={item.id}
                  id=""
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <div className="buttons">
                  <button
                    onClick={handleEdit}
                    className="bg-cyan-600 hover:bg-cyan-300 p-3 py-1 rounded-xl mx-1  text-white"
                  >
                    edit
                  </button>
                  <button
                    onClick={handleDel}
                    name={item.id}
                    className="bg-cyan-600 hover:bg-cyan-300 p-3 py-1 rounded-xl mx-1  text-white"
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
