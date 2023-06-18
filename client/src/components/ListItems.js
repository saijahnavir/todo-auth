import { useState } from 'react'
import TickIcon from './TickIcon'
import Modal from './Modal'
import ProgressBar from './ProgressBar' 
import Axios from 'axios'

const ListItems = ({task, getData}) => { 
  const [showModal,setShowModal] = useState(false)


    const deleteTask = async () => {
        await Axios.delete(`http://localhost:8000/todos/${task.id}`)
        .then((response) =>{
          if(response.status === 200){
            console.log("delete pressed")
             return getData();
          }
        })
      .catch (err => console.log(err)) 
    };



    return (
      <li className="list-item">

        <div className="info-container">
          <TickIcon/>
          <p className="task-title"> {task.title} </p>
          <ProgressBar/>
        </div>
      
        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
          <button className="delete" onClick={deleteTask}>DELETE</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
      </li>
    )
  }
  
  export default ListItems
  