import './ProductItems.css'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import {Table, TableHeader, TableBody} from '../../components/index'
import makeRequest from '../../../data/fetch'
import { IoEyeSharp } from "react-icons/io5";

const ProductItems = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const settings = {
          method: "GET",
      };
        makeRequest('category/products/items', settings)
          .then((data) => setData(data))
          .catch((error) => console.error('Error fetching data:', error));
    }, []);

    let counter = 0;
    const productItemsData = data.map(productItems =>{
        counter++;
        return <tr key={productItems.id} >
        <th>{counter}</th>
        <td>
            <img className='category-img' alt='' src={productItems.img} />
        </td>
        <th>{productItems.name}</th>
        <th>{productItems.productItemNumber}</th>
        <th><Link to={`/products/items/view/${productItems.productItemNumber}`}>
              <button type="button" className="add-new-btn btn btn-outline-success"><IoEyeSharp/></button>
            </Link>
            </th>
        </tr>
    })
  return (
    <>
    <Link to="/products/items/add-new-item">
    <button type="button" className="add-new-btn btn btn-outline-success">Add New Items</button>
    </Link>
    <Table>
      <TableHeader>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Nr.</th>
                <th scope="col"></th>
                <th scope="col"></th>
      </TableHeader>
      <TableBody>
        {productItemsData}
      </TableBody>
    </Table>
    </>
  )
}

export default ProductItems
