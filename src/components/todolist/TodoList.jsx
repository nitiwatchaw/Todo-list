import React, { useState } from 'react'
import './TodoList.css'
import { HiClipboardList } from "react-icons/hi";
import { useQuery } from 'react-query'
import { MdEditSquare, MdDelete } from "react-icons/md";
import { FaSquare } from "react-icons/fa";
import { Link } from 'react-router-dom'
import BeatLoader from 'react-spinners/BeatLoader'
import Loader from '../../layout/Loader/Loader';
import Box from '../../layout/Box/Box'
import { IoMdAddCircle } from "react-icons/io";
import { motion } from 'framer-motion'
import { handleDelete } from '../service/service';
import Update from '../Form/update/Update';
import Lottie from 'lottie-react'
import animationData from '../../img/ani-empty.json'
const TodoList = ({ fetchData }) => {


    const { isLoading, data, isError, error } = useQuery('todo', fetchData)

    const [modalId, setModalId] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    if (isError) {
        return <h2>{error.message}</h2>
    }


    const handleButtonDelete = (id) => {
        handleDelete(id)
    }

    //modal
    const [showModal, setShowModal] = useState(false)

    const toggleModal = (id = null) => {
        setShowModal((show) => !show)
        setModalId(id);
    }

    const handleUpdate = (id) => {
        toggleModal(id)

    }
    const filteredData = data?.data.filter((todo) =>
        todo.todo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box>

            <motion.div
                className="container-todo"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                exit={{ x: "-100%" }}
            >
                <div className="main">
                    <h2> <HiClipboardList /> LIST ALL  </h2>
                    <div className="remain">
                        Uncomplete: {data?.data.filter(todo => !todo.completed).length} List
                    </div>
                </div>
                <div className="title">
                    <div className="desc">
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <FaSquare style={{ color: "#b4c4f2" }} /> : Completed
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <FaSquare style={{ color: "#6387f4" }} /> : Not Complete
                        </div>
                    </div>

                    {/* search */}
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search... "
                    />


                    <Link to='/todo/form' ><p><IoMdAddCircle style={{ fontSize: "16px" }} /> Add</p></Link>
                </div>
                {isLoading ?
                    <Loader>
                        <BeatLoader
                            color="#132181"
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            className='loader' />
                    </Loader>
                    :
                    <div className="content">
                        {filteredData.map((e) => {
                            return (
                                <div key={e.id} className={`todoBox ${e.completed ? "completed" : "red"}`} >
                                    <div className="bar" style={{ backgroundColor: e.completed ? "#b4c4f2" : "#6387f4" }} />
                                    <div className="title-todo">{e.todo}</div>
                                    <div className="btn-wrap">
                                        <button className='btn--edit' onClick={() => { handleUpdate(e.id) }} ><MdEditSquare /></button>
                                        <button className='btn--del' onClick={() => { handleButtonDelete(e.id) }}><MdDelete /></button>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                }
                {filteredData && filteredData.length === 0 ? <Lottie animationData={animationData} className='ani-empty' /> : null}

            </motion.div>

            <Update showModal={showModal} toggleModal={toggleModal} modalId={modalId} />
        </Box >
    )
}

export default TodoList