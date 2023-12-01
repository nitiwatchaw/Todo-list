import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Form from './components/Form/add/Form'
import Completed from './components/Completed/Completed'
import axios from "axios"
import TodoList from './components/todolist/TodoList'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

function App() {

  const [todos, setTodos] = useState([])


  const fetchData = () => {
    return axios.get('http://localhost:3001/todos')
  }

  const location = useLocation()

  return (
    <>
      <Header fetchData={fetchData} />
      <AnimatePresence mode={'wait'} initial={false}>
        <Routes location={location} key={location.pathname} >
          <Route path='/' element={<Home />} />
          <Route path='/todo' element={<TodoList fetchData={fetchData} todos={todos} />} />

          <Route path='/todo/form' element={<Form />} />
          <Route path='/todo-completed' element={<Completed fetchData={fetchData} />} />

        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
