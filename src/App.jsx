import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
function App() {

  let storageTodos = JSON.parse(localStorage.getItem('todos')) || []

  const [todos, setTodos] = useState(storageTodos)
  const [todo, setTodo] = useState("")
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])



  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    console.log(todos);
    setTodo('')

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckboxChange = (e) => {
    let id = e.target.id
    let ind = todos.findIndex(item => {
      return item.id === id
    })
    let newtodos = [...todos]
    newtodos[ind].isCompleted = !newtodos[ind].isCompleted
    setTodos(newtodos)
  }

  const handleEdit = (e, id) => {
    let t1 = todos.find(item => item.id === id)
    setTodo(t1.todo);
    let newtodos = todos.filter(item => {
      return item.id != id
    })
    setTodos(newtodos)
  }

  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id != id
    })

    let text = "Confirm deletion: Are you sure you want to delete this item?";
    if (confirm(text) == true) {
      alert('Deleted')
      setTodos(newtodos)
    } else {
      alert("You canceled!");
    }
  }
  const toggleChange = () => {
    setshowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="container bg-cyan-100 mx-auto w-[90%] md:w-[70%] rounded-2xl">
        <div className="md:m-6  md:p-8  min-h-[80vh] p-5">
          <div className="addTodo  p-2  ">
            <h2 className='font-bold text-2xl py-5 text-cyan-950 '>Add todo</h2>
            <div className='flex justify-between w-[97%] gap-12'>
              <input onChange={handleChange} value={todo} className=' w-[68%] md:w-[90%] p-2 rounded-md ' type="text" name="" id="" />
              <button onClick={handleAdd} disabled={todo.length <= 3} className='text-white text-sm font-bold bg-cyan-800 hover:bg-cyan-950  p-2 md:px-3 rounded-md disabled:bg-cyan-200 disabled:hover:bg-cyan-200 '>Save</button>
            </div>

          </div>
          <div className='p-2' >
            <input className='cursor-pointer' onChange={toggleChange} type="checkbox" checked={showFinished} name="" id="" /> Show finished
          </div>
          <h2 className='font-bold text-xl text-cyan-950 p-3 '>Your todos</h2>
          {todos.length === 0 && <div className='m-4'> Nothing to display </div>}
          <div className="todos flex flex-col  ">
            {todos.map(item => {
              // console.log(item.todo);
              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex items-center m-3 justify-between w-[92%]">
                <div className='flex gap-2'>
                  <input className='cursor-pointer' onChange={handleCheckboxChange} type="checkbox" checked={item.isCompleted} name='' id={item.id} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex">
                  <button onClick={e => handleEdit(e, item.id)} className='text-white text-sm font-bold bg-cyan-800 hover:bg-cyan-950 mx-1  p-1 px-2 rounded-md '><FaEdit /> </button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='text-white text-sm font-bold bg-cyan-800 hover:bg-cyan-950 mx-1 p-2 rounded-md '><MdDeleteForever />
                  </button>
                </div>
              </div>
            })}

          </div>
        </div>
      </div>
    </>
  )
}

export default App
