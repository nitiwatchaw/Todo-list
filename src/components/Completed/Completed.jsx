import React from 'react'
import './Completed.css'
import { ImCheckboxChecked } from "react-icons/im";
import Box from '../../layout/Box/Box';
import BeatLoader from 'react-spinners/BeatLoader'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { PiNotches } from "react-icons/pi";
import { container, item } from '../../motion/animation'
import ButtonNone from '../hook/buttonUp';
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
const Completed = ({ fetchData }) => {

    const { isLoading, data, isError, error } = useQuery('todo', fetchData)

    if (isError) {
        return <h2>{error.message}</h2>
    }

    const ButtonUp = () => {
        const { buttonNone, pointer } = ButtonNone();
        const shoot = () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        return (
            <>
                <button className='buttonUp' onClick={shoot} style={{ backgroundColor: "rgb(255 82 115 / 49%)", opacity: buttonNone, pointerEvents: pointer }}>
                    <MdOutlineKeyboardDoubleArrowUp />
                </button>
            </>
        )
    }



    return (
        <Box>
            <div className="container-todo">
                <div className="title-completed">
                    <h2> <ImCheckboxChecked />Completed List</h2>
                    <p>All things you have done</p>
                </div>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="completed-content">

                    {isLoading ?
                        <BeatLoader
                            color="#132181"
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            className='loader-com' />
                        :
                        <>
                            {data?.data.filter(todo => todo.completed).map((e) => {
                                return (
                                    <motion.div
                                        variants={item}
                                        key={e.id}
                                        className='complete-list'>
                                        {e.todo}
                                        <PiNotches />
                                    </motion.div>
                                )
                            })}
                        </>
                    }

                </motion.div>
            </div>
            <ButtonUp />
        </Box>
    )
}

export default Completed