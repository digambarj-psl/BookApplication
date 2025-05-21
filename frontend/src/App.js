import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import CreateItemForm from './components/CreateItemForm'; 
import ItemList from './components/ItemList'; 
 
function App() { 
  const [message, setMessage] = useState(''); 
 
  useEffect(() => { 
    axios.get('http://localhost:4000/api') 
      .then(response => { 
        setMessage(response.data); 
      }) 
      .catch(error => { 
        console.error('There was an error fetching the data!', error.message); 
        console.error('Error stack:', error.stack); 
      }); 
  }, []); 
 
  return ( 
    <div className="App"> 
      <h1>NodeReactApp</h1> 
      <p>{message}</p> 
      <CreateItemForm /> 
      <ItemList /> 
    </div> 
  ); 
} 
 
export default App;