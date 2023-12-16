import './Order.css'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import {Table, TableHeader, TableBody} from '../../components/index';
import makeRequest from '../../../data/fetch';
import { IoEyeSharp } from "react-icons/io5";


const Order = () => {
  const [data, setData] = useState([]);

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

  const ordersData = data.map(order =>{
    
    return <tr key={order.categoryId} >
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
