import { Button} from '@chakra-ui/react'
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Post from './pages/Post';
import Login from './pages/Login';

import './App.css'

function App() {
 

  return (
     <>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/post' element={<Post />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
     </>
  )
}

export default App
