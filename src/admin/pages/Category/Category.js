import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import {Table, TableHeader, TableBody} from '../../components/index'
import makeRequest from '../../../data/fetch'
import {CreateNewProduct} from '../index'


import './Category.css'

const Category = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const settings = {
      method: "GET",
  };
    makeRequest('category', settings)
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
      
  }, []);

  let counter = 0;
  const categoryData = data.map(category =>{
    counter++;
    return <tr key={category.categoryId} >
      <th>{counter}</th>
      <td>
        <img className='category-img' alt='' src={category.categoryImg} />
        
      </td>
      <th>{category.categoryName}</th>
      
    </tr>
  })

  const categoryName = () =>{
    return <CreateNewProduct categoryData = {data}/>
  }
  categoryName();
  return (
    <>
    <Link to="/category/add-new-category">
    <button type="button" className="add-new-btn btn btn-outline-success">Add New Category</button>
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
      {categoryData}
      </TableBody> 
    </Table>
    </>
  )
}

export default Category
