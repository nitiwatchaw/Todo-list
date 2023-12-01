import React from 'react'
import './Loader.css'
const Loader = (props) => {

    const { children } = props
    return (
        <div className='layout'>{children}</div>
    )
}

export default Loader