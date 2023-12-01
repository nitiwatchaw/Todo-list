import React from 'react'
import './Completed.css'
import { ImCheckboxChecked } from "react-icons/im";
import Loader from '../../layout/Loader/Loader';
import Box from '../../layout/Box/Box';
import BeatLoader from 'react-spinners/BeatLoader'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { PiNotches } from "react-icons/pi";
import { container, item } from '../../motion/animation'
const Completed = ({ fetchData }) => {

    const { isLoading, data, isError, error } = useQuery('todo', fetchData)

    if (isError) {
        return <h2>{error.message}</h2>
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
        </Box>
    )
}

export default Completed