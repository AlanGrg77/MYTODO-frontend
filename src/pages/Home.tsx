import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { getTodos } from "../store/todoSlice";

const Home = () => {
  const dispatch = useAppDispatch()
  const reduxToken = useAppSelector((state)=>state.auth.user.token)
  const todoItems = useAppSelector((state)=> state.todo.todo)
  const localStorageToken = localStorage.getItem("userToken")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editValues, setEditValues] =useState<{id:number, title:string, description:string}| null>(null)
  const navigate = useNavigate()

  console.log("items", todoItems)

  useEffect(()=>{
    if(reduxToken && localStorageToken){
    setIsLoggedIn(true)
  }else{
    setIsLoggedIn(false)
    navigate("/login")
  }
  },[reduxToken,localStorageToken,navigate])
  useEffect(()=>{
    dispatch(getTodos())
  },[])
  const openEditModal = useCallback(()=> setEditModalOpen(true),[])
  const closeEditModal = useCallback(()=> setEditModalOpen(false),[])
  const handleEditModal = async (id:number, title:string, description : string) =>{
    if(id || title || description) {
      setEditValues({id,title,description})
      openEditModal()
    }
  }


  return (
    <>
    <Navbar isLoggedIn = {isLoggedIn} />
    {
      editModalOpen && editValues && <Modal closeEditModal={closeEditModal} todoId={editValues?.id} oldTitle={editValues?.title} oldDescription={editValues?.description} />
    }
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <div className="px-4 py-2">
          <h1 className="text-gray-800 font-bold text-2xl uppercase">
            MYTODO
          </h1>
        </div>
        <form className="w-full max-w-sm mx-auto px-4 py-2">
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <div className="flex flex-col gap-5">
              <input
              className="appearance-none bg-transparent border-2 rounded-2xl w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Add a task"
            />
            <input
              className="appearance-none bg-transparent border-2 w-full h-20 rounded-2xl text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Add Description"
            />
            </div>
            <button 
              className="flex-shrink-0 ml-5  bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
            >
              Add
            </button>
          </div>
        </form>
        <ul className="divide-y divide-gray-200 px-4">
          {todoItems && todoItems.length > 0 && todoItems.map((todoI) =>(
              <li key={todoI.id} className="py-4">
            <div className="flex items-center">
              <input
                id={`todo-${todoI.id}`}
                name={todoI.title}
                type="checkbox"
                checked={todoI.completed}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor={`todo-${todoI.id}`} className="ml-3 flex flex-col text-gray-900">
                <span className="text-lg font-medium">
                  {todoI.title}
                </span>
                <span className="text-sm font-light text-gray-500">
                  {todoI.description}
                </span>
              </label>
              <div className="flex flex-row gap-2.5 ml-25">
                  <div onClick={()=>handleEditModal(todoI.id,todoI.title,todoI.description)}><FaRegEdit /></div>
                  <FaTrash />
                </div>
            </div>
          </li>
            ))
          }
        </ul>
      </div>
    </>
  ); 
};

export default Home;
