import React, { useState, useEffect, useRef } from 'react'
import './Header.css'
import icon from '../../img/icon.webp'
import { IoMdHome } from "react-icons/io";
import { FcTodoList } from "react-icons/fc";
import { BsClipboardCheckFill } from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom'
import { useQuery } from 'react-query'
import { IoMenu } from "react-icons/io5";
const Header = ({ fetchData }) => {

    let activeClassName = "nav--active"
    const { data } = useQuery('todo', fetchData)

    const [open, setOpen] = useState(false)
    const Ref = useRef();

    useEffect(() => {
        const clickOutSide = (event) => {
            if (!Ref.current || !Ref.current.contains(event.target)) {
                setOpen(false);
                document.body.classList.remove('overflow-hidden');
            }
        }
        const handleResize = () => {
            // Check window width and remove the 'overflow-hidden' class if width is more than 1200px
            if (window.innerWidth >= 621) {
                document.body.classList.remove('overflow-hidden');
            }
        };

        if (open) {
            // Add the 'overflow-hidden' class to the body
            document.body.classList.add('overflow-hidden');
        }

        document.addEventListener('mousedown', clickOutSide)
        window.addEventListener('resize', handleResize);
        return () => {
            document.removeEventListener('mousedown', clickOutSide);
            window.removeEventListener('resize', handleResize);
            document.body.classList.remove('overflow-hidden');
        };
    }, [open])




    return (
        <div className='header' >
            <Link to="/"> <img src={icon} alt="" width={55} /></Link>
            <button onClick={() => { setOpen(!open) }} className='menu__content_box_bar'> <IoMenu /></button>
            <ul className={`${open ? "menu--active" : ""}`} ref={Ref} >
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? activeClassName : undefined}><IoMdHome />Home</NavLink>
                </li>
                <li>
                    <NavLink to="/todo" className={
                        ({ isActive }) => isActive ? activeClassName : undefined
                    }>
                        <FcTodoList />List <span>({data?.data.length})</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/todo-completed" className={({ isActive }) => isActive ? activeClassName : undefined}><BsClipboardCheckFill /> Completed</NavLink>
                </li>
                <button onClick={() => { setOpen(!open) }} className='btn-close'></button>
            </ul>
            {open ? <div className="modal__menu"></div> : undefined}
        </div >
    )
}

export default Header