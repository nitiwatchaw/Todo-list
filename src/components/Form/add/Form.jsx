import React, { useState } from 'react'
import './Form.css'
import { Link } from 'react-router-dom'
import Box from '../../../layout/Box/Box'
import { MdAddComment } from "react-icons/md";
import { motion } from 'framer-motion'
import { handleSubmit } from '../../service/service';
import { useNavigate } from 'react-router-dom'
const Form = () => {

    const [todo, setTodo] = useState("")
    const [userId, setUserID] = useState("")
    const [completed, setCompleted] = useState(false)

    const navigate = useNavigate();

    const handleFormAddSubmit = (e) => {
        e.preventDefault();
        // Call the function
        handleSubmit(todo, userId, completed, navigate);
    };



    return (
        <Box >
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                exit={{ x: "100%" }}
                className='form__container'
            >
                <h2> <MdAddComment /> ADD TODO</h2>
                <form onSubmit={handleFormAddSubmit} >
                    <div className="form__userID">
                        <label htmlFor="">userID</label>
                        <input type="number" placeholder='user ID' onChange={(e) => { setUserID(e.target.value) }} />
                    </div>
                    <div className="form__desc">
                        <label htmlFor="">Description</label>
                        <textarea placeholder='add some action' onChange={(e) => { setTodo(e.target.value) }} rows="4" />
                    </div>
                    <div className="form__checkbox">
                        <input type="checkbox" id="complete" checked={completed} name="complete" onChange={(e) => { setCompleted(e.target.checked) }} />
                        <label >Complete</label>

                    </div>
                    <div className="form__btn">
                        <button className='add--btn' type="submit" >ADD</button>
                        <button onClick={(e) => { e.preventDefault() }} className='cancle--btn'><Link to='/todo' >CANCLE</Link></button>
                    </div>


                </form>

            </motion.div>
        </Box>
    )
}

export default Form