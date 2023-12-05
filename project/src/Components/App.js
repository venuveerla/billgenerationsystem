import React from 'react';
import Addaproduct from "./Addaproduct";
import Login from './LoginForm';
import GenerateBill from './BillGeneration';
import Details from './details';
import Update from './update';
import { ToastContainer } from 'react-toastify';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored'></ToastContainer>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/addproduct' element={<Addaproduct/>}></Route>
        <Route path='/generatebill' element={<GenerateBill/>}></Route>
        <Route path='/details' element={<Details/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
