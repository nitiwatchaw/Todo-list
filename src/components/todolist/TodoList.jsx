import React, { useState, useEffect } from 'react'
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
import ButtonNone from '../hook/buttonUp';
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
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


    const ButtonUp = () => {
        const { buttonNone, pointer } = ButtonNone();
        const shoot = () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        return (
            <>
                <button className='buttonUp' onClick={shoot} style={{ opacity: buttonNone, pointerEvents: pointer }}>
                    <MdOutlineKeyboardDoubleArrowUp />
                </button>
            </>
        )
    }


    const [isScroll, setIsScroll] = useState(false)

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > 650) {
                setIsScroll(true)

            }
            else {
                setIsScroll(false)
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    })


    return (
        <Box>

            <motion.div
                className="todoContainer"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                exit={{ x: "-100%" }}
            >
                <div className="todoContainer__header">
                    <h2> <HiClipboardList /> LIST ALL  </h2>
                    <div className="todoContainer__subHeader">
                        InComplete: {filteredData?.filter(todo => !todo.completed).length} List
                    </div>
                </div>
                <div className="todoContainer__title">
                    <div >
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


                    <Link to='/todo/form'  ><p><IoMdAddCircle style={{ fontSize: "16px" }} /> Add</p></Link>

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
                                <div key={e.id} className={`content_box ${e.completed ? "completed" : "red"}`} >
                                    <div className="content_box_bar" style={{ backgroundColor: e.completed ? "#b4c4f2" : "#6387f4" }} />
                                    <div className="content_box_title">{e.todo}</div>
                                    <div className="content_box_btn_wrap">
                                        <button className='btn--edit' onClick={() => { handleUpdate(e.id) }} ><MdEditSquare /></button>
                                        <button className='btn--del' onClick={() => { handleButtonDelete(e.id) }}><MdDelete /></button>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                }
                {filteredData && filteredData.length === 0 ? <Lottie animationData={animationData} className='ani_empty' /> : null}

            </motion.div>
            <ButtonUp />

            {isScroll ?
                <Link to='/todo/form' className="btn--scroll">
                    <p><IoMdAddCircle style={{ fontSize: "16px" }} />ADD</p>
                </Link>
                : null}
            <Update showModal={showModal} toggleModal={toggleModal} modalId={modalId} handleUpdate={handleUpdate} />
        </Box >
    )
}

export default TodoList