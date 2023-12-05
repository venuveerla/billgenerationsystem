import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Link ,useNavigate} from 'react-router-dom';
const Details=()=>{
const [data,setData]=useState([])
const navigate=useNavigate();
useEffect(()=>{
    axios.get('http://localhost:8000/products')
    .then(res=>setData(res.data))
    .catch(err=>console.log(err))}
,[]);
const handleDelete=(id)=>{
    const confirm=window.confirm('would you like to delete');
    if(confirm){
        axios.delete("http://localhost:8000/products/"+id)
        .then(res=>{
            toast.success('Updated sucessfully!')
            navigate('/details/')
        }
            )
    }
 }
 return(
   <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
       <h3>Product Available list</h3>
       <div className='w-75 rounded by-white border shadow p-4'>
        <div className="d-flex justify-content-end ">
            <Link to='/addproduct' className="btn btn-success me-2">Add new Product(+)</Link>
            <Link to='/generatebill' className="btn btn-sm btn-primary me-2">Generate Bill</Link>
        </div>
          <table className='table table-striped'>
             <thead>
                <tr>
                    <th>s.no</th>
                    <th class="text-center">product_id</th>
                    <th class="text-center">product_name</th>
                    <th class="text-center">price per quantity</th>
                    <th class="text-center">Action</th>
                </tr>
             </thead>
             <tbody>
                  {
                    data.map((d,i)=>(
                        <tr key={i}>
                            <td className='text-align'>{d.id}</td>
                            <td class="text-center">{d.pid}</td>
                            <td class="text-center">{d.pname}</td>
                            <td class="text-center">{d.price}</td>
                            <td class="text-center">
                            <Link to={`/update/${d.id}`} className="btn btn-sm btn-primary me-2">Update</Link>
                            <button className="btn btn-sm btn-danger" onClick={e=>handleDelete(d.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                  }
             </tbody>
          </table>
       </div>
   </div>
 );
 
}
export default Details;