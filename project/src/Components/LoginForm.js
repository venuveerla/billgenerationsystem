import React from "react";
import { useState } from "react";
import "./form.css";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
function Login()
{
    const[username,user]=useState("");
    const[password,pass]=useState("");
    const star={
        color:'red',
        fontSize:'24px',
        marginLeft:'5px',

    }
    const navigate=useNavigate();
    const handlesubmit=(e)=>
    {
        e.preventDefault();
        if(validate())
        {
            fetch("http://localhost:8000/user/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                //console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter valid username');
                } else {
                    if (resp.password === password) {
                        toast.success('Success');
                        sessionStorage.setItem('username',username);
                        navigate('/details')
                    }else{
                        toast.error('Please Enter valid credentials');
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate=()=>{
      let result=true;
      if(username==='' || username===null)
      {
        result=false;
        toast.warning('please enter username');
      }
      if(password==='' || pass===null)
      {
        result=false;
        toast.warning('please enter password');
      }
      return result;
    }
    return (
        <div>
        <div className="container">
        <form action="" id="form" onSubmit={handlesubmit}>
        <h4>Login Form</h4>
        <div className="input-group">
        <div>
         <label htmlFor="username">Username</label>
           <span style={star}>*</span>
        </div>
        <input type="text" id="username"  value={username} onChange={e=>user(e.target.value)} name="username" required/>
        </div>
        
        <div className="input-group">
            <div>
                <label htmlFor="password">password</label>
                <span style={star}>*</span>
            </div>
        <input type="password" id="password" value={password} onChange={e=>pass(e.target.value)} name="password" required/>
        </div>   
        <button type="submit" className="btn btn-success">Login</button>
        </form>
        </div>
        </div>
    );
}
export default Login;