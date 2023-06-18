import {useState} from 'react'
import Axios from 'axios'

const Modal = ({mode, setShowModal, getData, task}) => {

  const editMode = mode === 'edit' ? true : false

  const [data, setData]=useState({
    user_email: editMode ? task.user_email : 'jan@test.com',
    title: editMode ?task.title : null,
    progress:editMode ? task.progress : 0,
    date: editMode ? task.date : new Date()
  })


  const handleChange = (e) =>{
    console.log('changing!',e)
    const {name, value} = e.target
    console.log(name)
    console.log(value)

    setData(data => ({
      ...data,
      [name] : value
    }))
    // console.log("from client : ",data)
  }

// editing a task
  const editData = (e) =>{
    e.preventDefault();
    Axios.put(`http://localhost:8000/todos/${task.id}`,{data}).then((response) =>{
      if(response.status === 200){
        console.log("updated!")
        setShowModal(false)
        getData()
      }
    }).catch(
      err => console.log(err)
    )
  }

  
   /*posting data to database*/
   const postData = (e) => {
    e.preventDefault();
    // console.log("post called : ",data)
    Axios.post('http://localhost:8000/todos',{data})
    .then((response) =>{
      if(response.status === 200){
        console.log("Posted!")
        setShowModal(false)
        getData()
      }
    })
    .catch(err => console.log(err))
  }


  


    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>{mode} your Task :</h3>
            <button onClick={() => setShowModal(false)}> X </button>
          </div>

          <form>
            <input 
            required 
            maxLength={30}
            placeholder=" Enter your task here"
            name="title"
            value={data.title}
            onChange={handleChange}
            /> <br/>
            <label htmlFor="range"><h2>Drag to select Current progress</h2></label>
            <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
            />
            <input className={mode} type="submit" onClick={editMode? editData : postData}/>
          </form>
        </div>
      </div>
    );
  }
  
  export default Modal;
  