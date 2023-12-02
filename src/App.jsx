import React from 'react'
import './App.css'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Form from './components/Form/add/Form'
import Completed from './components/Completed/Completed'
import axios from "axios"
import TodoList from './components/todolist/TodoList'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Slide from './components/Home/swiper/Slide'
function App() {


  const fetchData = () => {
    return axios.get('https://todo-list-m28t.onrender.com/todos')
  }

  const location = useLocation()



  return (
    <>
      <Header fetchData={fetchData} />
      <AnimatePresence mode={'wait'} initial={false}>
        <Routes location={location} key={location.pathname} >
          <Route path='/' element={<Home />} />

          <Route path='/swiper' element={<Slide />} />


          <Route path='/todo' element={<TodoList fetchData={fetchData} />} />

          <Route path='/todo/form' element={<Form />} />
          <Route path='/todo-completed' element={<Completed fetchData={fetchData} />} />

        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
