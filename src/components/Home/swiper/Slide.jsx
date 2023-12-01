import React from 'react'

//  Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import animationData from '../../../img/Animation - 1701323145997.json'
import animationData2 from '../../../img/Animation - 1701321216910.json'
import animationData3 from '../../../img/cleary.json'
import Lottie from 'lottie-react'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css'

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';



const Slide = () => {
    return (
        <div className='slide-container' >
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"   >
                <SwiperSlide>
                    <div className='homeLayer'>
                        <div className="title">
                            <h1>Project Solution Todo-List Website</h1>
                            <p>This is project for <a href='https://cnxdevsoft.com/' target='_black'>
                                CNXDEVSOFT</a> about to create delete update loading and swipe
                                with call API from JSON server port 3001
                            </p>
                            <Link className='view' to="/todo">Get Start</Link>
                        </div>
                        <div className="ani-container">
                            <Lottie animationData={animationData} className='ani' />
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className='homeLayer'>
                        <div className="title">
                            <h1 style={{ color: "rgb(231 65 34)" }}>Smooth Animation </h1>
                            <p>Using  <a href='https://www.framer.com/motion/' target='_black'>Framermotion</a> library to manage the action and duration of motion
                            </p>
                            <Link style={{ backgroundColor: "rgb(101 138 242)" }} className='view' to="/todo">Get Start</Link>
                        </div>
                        <div className="ani-container">
                            <Lottie animationData={animationData2} className='ani' />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='homeLayer'>
                        <div className="title">
                            <h1 style={{ color: "rgb(237 132 19)" }}>Minimal Style and Cleary Tone </h1>
                            <p>White color is primary and decorate with fresh color that according the palette / Clean layout that user easily to use
                            </p>
                            <Link className='view' to="/todo">Get Start</Link>
                        </div>
                        <div className="ani-container">
                            <Lottie animationData={animationData3} className='ani' />
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>

        </div >
    )
}

export default Slide