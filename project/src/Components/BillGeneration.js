import React from 'react';
import {useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./bill.css";
function GenerateBill()
{
    const [data_val,set_data]=useState({})
    const [data,setData]=useState([]);
    const [values,setvalues]=useState([]);
    const [total_price,price_t]=useState(0);
    const [pid,product_id]=useState(1);
    const [quant,quantity]=useState(0);
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:8000/products")
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[]);
    const handlePrint=()=>{
        let tdElement1 = document.getElementById('product_details');
          let trElement1 = tdElement1.parentNode;
          trElement1.removeChild(tdElement1);
           let tdElement = document.getElementById('btn');
           let trElement = tdElement.parentNode;
          trElement.removeChild(tdElement);
          window.print();
          navigate("/details/")
   }
   const [d1,setd1]= useState([]);
   useEffect(()=>
    {
        if(pid!=0){
            axios.get("http://localhost:8000/products/"+ pid)
        .then(res=>setd1(res.data))
        .catch(err=>console.log(err));
        }     
    },[pid])
    const addProduct=()=>{
        //  console.log(d1);
        const quant1=Number(quant);
        d1.price=d1.price*quant1;
        const prices=d1.price;
        price_t(total_price+d1.price);
        // console.log(prices)
        data_val.pid=pid;
        data_val.quantity=quant1;
        data_val.pname=d1.pname;
        data_val.price=prices;
        console.log(data_val);
        set_data({});
    } 
    useEffect(()=>
    {
            if((data_val.pid)!=0){
                setvalues([...values,data_val]);
                console.log(values);
            }
        
    },[data_val])
    
    return (  
      <div className="containers">
        <div className="forms" id="forms">
        <div className="top">
            <div className="title">
                <h1>GV Medical Stores</h1>
            </div>
            <div className="userdata">
                <div className="in">
                    Name:<input type="text"/>
                </div>
                <div className="in">
                    Date:<input type="date"/>
                </div>
            </div>
            <div className="userdata" id="product_details">
                <div className="in">
                    select product:
                    <select id="selecto" value={pid} onChange={e=>product_id(Number(e.target.value))}>{
                        data.map((d,i)=>(
                            <option key={i} value={i+1} >{d.pname}</option>      
                        ))
                        }
                </select>
                </div>
                <div className="in">
                    quantity:<input type="number" value={quant} onChange={e=>quantity(e.target.value)} id="q"/>
                </div>
                <button type="submit" onClick={addProduct}>add(+)</button>
            </div>
        </div>
        <div className="middle">
            <table className="tables">
                <thead>
                    <tr  >
                     <th className='th'>pid</th>
                    <th className='th'>Medicine Name</th>
                    <th className='th'>quantity</th>
                    <th className='th'>price</th>
                    </tr>
                </thead>
                <tbody>
                {
                    values.map((t,i)=>(
                        <tr key={i} className='tr'>
                            <td className=' td'>{t.pid}</td>
                            <td class="td">{t.pname}</td>
                            <td class="td">{t.quantity}</td>
                            <td class="td">{t.price}</td>
                        </tr>
                    ))
                  }          
                </tbody>
            </table>
        </div>
        <div className="bottom">
            <div className="price">
                <h3>Total Price:</h3>
                <h2>{total_price} ₹</h2>
            </div>
            <div className="print">
                <button type="submit" id="btn" className="submit" onClick={handlePrint} >print</button>
            </div>
        </div>
    </div>
    </div>
   
    );
    
}
export default GenerateBill;