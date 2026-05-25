import react,{ useEffect, useState } from 'react'
import axios from "axios"


import './App.css'

function App() {
  const [jokes,setJokes] = useState([])
 
  useEffect(() => {
    axios.get('/api/jokes')
    .then((response) => {
      setJokes(response.data)
    })
    .catch((error) => {      
      console.error('Error fetching jokes:', error);
    });
  })

  return (
    <>
      <div className="ticks">Wlcome to jokes workd</div>
      <p>Jokes: {jokes.length} </p>
      {jokes.map((joke, index) => (
        <div key={joke.id}>
          <h3>{joke.setup}</h3>
          <p>{joke.punchline}</p>
        </div>
      ))}
    </>
  );
}

export default App
