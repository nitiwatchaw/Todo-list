import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { handleUpdate } from '../../service/service'
import BeatLoader from 'react-spinners/BeatLoader'
import './Update.css'
const Update = ({ showModal, toggleModal, modalId, }) => {


    const [todo, setTodo] = useState("")
    const [userId, setUserID] = useState("")
    const [completed, setCompleted] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchSingleData = async () => {
        try {
            if (modalId) {
                setLoading(true)
                const response = await fetch(`https://todo-list-il87.onrender.com/todos/${modalId}`);
                const result = await response.json();

                setTodo(result.todo);
                setUserID(result.userId);
                setCompleted(result.completed);
                setLoading(false)
            }
        } catch (error) {
            console.log('Error fetching todo data:', error);
        }
    };


    //get old value


    useEffect(() => {
        fetchSingleData();
    }, [modalId]);


    //updated value
    const handleUpdated = (e) => {
        e.preventDefault();

        handleUpdate(todo, userId, completed, modalId, toggleModal)
    }

    return (
        <Modal show={showModal} onHide={toggleModal} className='modal__container'>
            {loading ?
         
                    <BeatLoader
                        color="#132181"
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        className='loader--modal' />
            

                :
                <>
                    <Modal.Title className='modal__title'>Update Todos <span>{modalId}</span></Modal.Title>
                    <Modal.Body >

                        <form onSubmit={handleUpdated}  >
                            <label htmlFor="" style={{ fontWeight: "bold", marginBottom: "10px" }}>userID</label>
                            <input type="number" placeholder='user ID' value={userId} onChange={(e) => { setUserID(e.target.value) }} />

                            <label htmlFor="" style={{ fontWeight: "bold", marginBottom: "10px" }}>Description</label>
                            <textarea placeholder='add some action' value={todo} onChange={(e) => { setTodo(e.target.value) }} rows="4" />

                            <div className="form__checkbox">
                                <input type="checkbox" id="complete" checked={completed} name="complete" onChange={(e) => { setCompleted(e.target.checked) }} />
                                <label >Complete</label>

                            </div>
                            <div className="wrap-btn">
                                <button className='update--btn' type="submit" >Update</button>
                                <button onClick={(e) => { e.preventDefault(); toggleModal() }} className='cancle--btn'><Link to='/todo' >CANCLE</Link></button>
                            </div>

                        </form>

                    </Modal.Body>
                </>

            }

        </Modal>
    )
}

export default Update