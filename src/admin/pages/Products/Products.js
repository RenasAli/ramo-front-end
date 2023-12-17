import  './Products.css';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Table, TableHeader, TableBody} from '../../components/index';
import makeRequest from '../../../data/fetch';
import { IoEyeSharp } from "react-icons/io5";

const AdminProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const settings = {
      method: "GET",
  };
    makeRequest('category/products', settings)
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  let counter = 0;
  const productsData = data.map(pruduct =>{
    counter++;
    return <tr key={pruduct.productId} >
      <th>{counter}</th>
      <td>
        <img className='category-img' alt='' src={pruduct.productImg} />
        
      </td>
      <th>{pruduct.productName}</th>
      <td><Link to={`/products/${pruduct.productId}`}>
              <button type="button" className="add-new-btn btn btn-outline-success"><IoEyeSharp/></button>
            </Link></td>
      
    </tr>
  })

  return (
    <>
    <Link to="/products/add-new-product">
    <button type="button" className="add-new-btn btn btn-outline-success">Add New Pruduct</button>
    </Link>
    <Table>
      <TableHeader>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col"></th>
                <th scope="col"></th>
      </TableHeader>
      <TableBody>
        {productsData}
      </TableBody>
      
    </Table>
    </>
  )
}

export default AdminProducts
