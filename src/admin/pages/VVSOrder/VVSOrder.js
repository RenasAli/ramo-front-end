import './VVSOrder.css';
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import {Table, TableHeader, TableBody} from '../../components/index';
import makeRequest from '../../../data/fetch';
import { IoEyeSharp } from "react-icons/io5";

const VVSOrder = () => {
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
    makeRequest('plumber', settings)
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
      
  }, []);
  

  const VVSOrdersData = data.map(VVSOrder =>{
    
    return <tr key={VVSOrder.orderId} >
      <th> {VVSOrder.orderNumber}</th>
        <td>{VVSOrder.customerName}</td>
        <td>{VVSOrder.address} <br/> {VVSOrder.zipCode} {VVSOrder.city}</td>
        <td>{VVSOrder.date}</td>
        <td><Link to={`/vvs-order/${VVSOrder.orderNumber}`}>
              <button type="button" className="add-new-btn btn btn-outline-success"><IoEyeSharp/></button>
            </Link>
        </td>
      
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
                <th scope="col"> </th>
      </TableHeader>
      <TableBody>
        {VVSOrdersData}
      </TableBody> 
    </Table>
    </>
  )
}

export default VVSOrder
