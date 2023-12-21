import './Order.css'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import {Table, TableHeader, TableBody} from '../../components/index';
import makeRequest from '../../../data/fetch';
import { IoEyeSharp } from "react-icons/io5";


const Order = () => {
  const [data, setData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const settings = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token 
      },
  };
    makeRequest('order', settings)
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
      
  }, []);

  useEffect(() => {
    setSearchResult(data)
  }, [data]);

  const handleInputOnChange = (e) =>{
    const filter = data.filter((item) => { 
      for (const key in item){
        if(item[key] &&
        String(item[key]).toLowerCase().includes(e.target.value)){
            return true
        }
      }
      return false
    })
    setSearchResult(filter)
  }
    
  

  const ordersData = searchResult.map(order =>{
    return <tr key={order.orderId} >
      <th> {order.orderNumber}</th>
        <td>{order.customerName}</td>
        <td>{order.address} <br/> {order.zipCode} {order.city}</td>
        <td>{order.date}</td>
        <td>{order.orderTotalAmount} kr.</td>
        <td><Link to={`/order/${order.orderNumber}`}>
              <button type="button" className="add-new-btn btn btn-outline-success"><IoEyeSharp/></button>
            </Link></td>
      
    </tr>
  })
  return (
    <>
    <div className="order-search-bar" >
        <input className="search-bar-input"  placeholder="Søg efter ordre" aria-label="Search" onChange={handleInputOnChange} />
        
    </div>
    <Table>
      <TableHeader>
                <th scope="col">Order Nr.</th>
                <th scope="col">Kunde Navn</th>
                <th scope="col">Adresse</th>
                <th scope="col">Dato</th>
                <th scope="col"> Total Beløb</th>
                <th scope="col"> </th>
      </TableHeader>
      <TableBody>
        {ordersData}
      </TableBody> 
    </Table>
    </>
  )
}

export default Order
