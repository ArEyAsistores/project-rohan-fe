import { Route, Routes } from 'react-router-dom';
import Home from './components/private/Home';
import Login from './components/public/login';
import Register from './components/public/registration';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>

    </Routes>
       
        // <Box>
           
        //    {/* {localStorage.getItem('token')? <Register/> : <Login/> } */}
        //    <Login/>
        // </Box>
       
  )
}

export default App;
