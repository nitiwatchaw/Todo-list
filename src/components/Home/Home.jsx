import React from 'react'
import './Home.css'
import Slide from './swiper/Slide'
import { motion } from 'framer-motion'

const Home = () => {
    return (
        <>
            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.4, ease: "easeIn" }}
                exit={{ y: "-100%" }}>
                <Slide />
            </motion.div>
        </>
    )
}

export default Home