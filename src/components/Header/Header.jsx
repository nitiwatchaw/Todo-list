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

    let activeClassName = "nav-active"
    const { data } = useQuery('todo', fetchData)

    const [open, setOpen] = useState(false)

    const menuRef = useRef();

    useEffect(() => {
        const clickOutSide = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', clickOutSide)
        return () => {
            document.removeEventListener('mousedown', clickOutSide);
        };
    }, [open])



    return (
        <div className='header' >
            <Link to="/"> <img src={icon} alt="" width={55} /></Link>
            <button onClick={() => { setOpen(!open) }} className='menu-bar'> <IoMenu /></button>
            <ul className={`${open ? "active" : ""}`} ref={menuRef} >
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
       
        </div >
    )
}

export default Header