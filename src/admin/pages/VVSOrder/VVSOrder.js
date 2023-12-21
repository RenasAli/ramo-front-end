import './VVSOrder.css';
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import {Table, TableHeader, TableBody} from '../../components/index';
import makeRequest from '../../../data/fetch';
import { IoEyeSharp } from "react-icons/io5";

const VVSOrder = () => {
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
    makeRequest('plumber', settings)
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
  const VVSOrdersData = searchResult.map(VVSOrder =>{
    
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
    <div className="order-search-bar" >
        <input className="search-bar-input"  placeholder="Søg efter ordre" aria-label="Search" onChange={handleInputOnChange} />
    </div>
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
