import React from 'react'
import './Header.css'
import icon from '../../img/icon.webp'
import { IoMdHome } from "react-icons/io";
import { FcTodoList } from "react-icons/fc";
import { BsClipboardCheckFill } from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom'
import { useQuery } from 'react-query'
const Header = ({ fetchData }) => {

    let activeClassName = "nav-active"
    const { data } = useQuery('todo', fetchData)

    return (
        <div className='header'>
            <Link to="/"> <img src={icon} alt="" width={55} /></Link>

            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? activeClassName : undefined}><IoMdHome />Home</NavLink>
                </li>
                <li>
                    <NavLink to="/todo" className={
                        ({ isActive }) => isActive ? activeClassName : undefined

                    }>
                        <FcTodoList />Todo list <span>({data?.data.length})</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/todo-completed" className={({ isActive }) => isActive ? activeClassName : undefined}><BsClipboardCheckFill /> Completed</NavLink>
                </li>
            </ul>
        </div >
    )
}

export default Header