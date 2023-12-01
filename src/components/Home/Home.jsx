import React from 'react'
import './Home.css'
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import Box from '../../layout/Box/Box'
import { motion } from 'framer-motion'
import animationData from '../../img/Animation - 1701323145997.json'
const Home = () => {
    return (
        <Box>
            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.2, ease: "easeIn" }}
                exit={{ y: "-100%" }}
                className='home-container'

            >
                <div className="title">
                    <h1>Project Solution Todo-List Website</h1>
                    <p>This is project for <a href='https://cnxdevsoft.com/' target='_black'>CNXDEVSOFT</a> about to create delete update loading and swipe with call API from dummyJSON</p>
                    <Link className='view' to="/todo">View</Link>
                </div>
                <Lottie animationData={animationData} className='ani' />
            </motion.div>
        </Box>
    )
}

export default Home