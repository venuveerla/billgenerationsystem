import React,{useEffect, useState} from 'react';
import { useNavigate ,Link, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";
import axios from 'axios';
import './form.css';
const Update=()=>{
    
    const{id}=useParams();
    const navigate=useNavigate()
    const end={
        display:"flex",
        justifyContent:"center"
    }
    const[values,setValues]=useState({
        pid:'',
        pname:'',
        price:''
    })
    useEffect(()=>
    {
        axios.get("http://localhost:8000/products/"+ id)
        .then(res=>setValues(res.data))
        .catch(err=>console.log(err));
    },[])
    const handleSubmit=(e)=>{
     e.preventDefault();
     axios.put(" http://localhost:8000/products/"+id,values)
     .then(res=>{
        toast.success('Updated sucessfully!')
        navigate('/details');
     })
     .catch(err=>{
        toast.error('Something went wrong!')
        console.log(err)});
    }
    return(
        <div className="container">
        <form action="" id="form" onSubmit={handleSubmit}>
        <h4>Update product details</h4>
        <div className="input-group">
                <label htmlFor="p_id">Product_id</label>
                <input type="text" id="p_id"  value={values.pid} onChange={(e)=>setValues({...values,pid:e.target.value})} name="pid-"/>
        </div>
        <div className="input-group">
                <label htmlFor="product_name">productname</label>
                <input type="text" id="product_name" value={values.pname} onChange={(e)=>setValues({...values,pname:e.target.value})} name="pname_" />
        </div>
        <div className="input-group">
             <label htmlFor="priceper">price per quantity</label>
              <input type="number" id="priceper" value={values.price} onChange={(e)=>setValues({...values,price: e.target.value})} name="price_"/>
        </div>   
            <div style={end}>
            <button className="btn btn-sm btn-success me-2 p-2 ">Update</button>
            <Link to={"/details/"} className="btn btn-sm btn-primary me-2 p-2">Go back</Link>
            </div>
        </form>
        </div>
    );
}
export default Update;