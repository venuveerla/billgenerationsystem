import React, { useState } from 'react';
import './form.css';
import { useNavigate,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";

function Addaproduct()
{
    const[pid,productid]=useState("");
    const[pname,productname]=useState("");
    const[price,priceq]=useState("");
    const navigate=useNavigate();
    const star={
        color:'red',
        fontSize:'24px',
        marginLeft:'5px',

    }
    const handlesubmit=(e)=>
    {
        e.preventDefault();

        let data={pid,pname,price};
        // console.log(data);
        fetch(" http://localhost:8000/products",{
           method:"POST",
           headers:{'content-type':'application/json'},
           body:JSON.stringify(data)
        }).then((res)=>{
            toast.success('Product added sucessfully.')
            navigate('/generatebill');
        }).catch((err)=>{
           toast.error('Failed:'+err.message);
        });
    }
    return(
        <div>
        <div className="container">
        <form action="" id="form" onSubmit={handlesubmit}>
        <h4>Add a product</h4>
        <div className="input-group">
        <div>
         <label htmlFor="p_id">Product_id</label>
           <span style={star}>*</span>
        </div>
        <input type="text" id="p_id"  value={pid} onChange={e=>productid(e.target.value)} name="pid" required/>
        <div className="error"></div>
        </div>
        <div className="input-group">
        <div>
        <label htmlFor="product_name">productname</label>
        <span style={star}>*</span>
        </div>
        <input type="text" id="product_name" value={pname} onChange={e=>productname(e.target.value)} name="username" required/>
        <div className="error"></div>
        </div>
        <div className="input-group">
            <div>
                <label htmlFor="priceper">price per quantity</label>
                <span style={star}>*</span>
            </div>
        <input type="number" id="priceper" value={price} onChange={e=>priceq(e.target.value)} name="price" required/>
        <div className="error"></div>
        </div>   
        <div className="d-flex justify-content-center ">
            <button  className="btn btn-success me-2">Add new Product</button>
            <Link to='/details' className="btn btn-sm btn-primary me-2">Go back</Link>
        </div>
        </form>
        </div>
        </div>
    );
   
}
export default Addaproduct;