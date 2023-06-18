import ListHeader from './components/ListHeader'
import Axios from 'axios';
import ListItems from './components/ListItems'
import {useEffect, useState} from 'react';

const App = () => {

  const userEmail = "jan@test.com"

  const [tasks, setTasks] = useState(null)

  const getData = () =>{
      Axios.get(`http://localhost:8000/todos/${userEmail}`)
      .then((response) =>{
        console.log(response)
        setTasks(response.data)
      })
  }

  useEffect(()=> getData, [])

  // console.log(tasks)

  //sorting tasks by date 
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))


  return (
    <div className="app">
      <ListHeader listName={'📃My List'} getData={getData}/>
      {sortedTasks?.map((task) => 
      <ListItems  task={task}  getData={getData}/>)}
    </div>
  );
}

export default App;
