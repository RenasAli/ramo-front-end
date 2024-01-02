import { CardWrap, GroupCard } from '../../components/index'
import { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import makeRequest from '../../../data/fetch'
import './Products.css'

const Products = () => {
  const {categoryUrl} = useParams()
  const [data, setData] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [categoryDescription, setCategoryDescription] = useState();
 
  useEffect(() => {
    const settings = {
      method: "GET",
  };
    makeRequest('category', settings)
      .then((data) => {
        
        const filteredData = data.filter(item => item.categoryUrl === `shop/${categoryUrl}`);
        const products = filteredData.reduce((acc, curr) => acc.concat(curr.products), []);
        const categoryName = filteredData.reduce((acc, curr) => acc.concat(curr.categoryName), []);
        const categoryDescription = filteredData.reduce((acc, curr) => acc.concat(curr.categoryDescription), []);
        setCategoryName(categoryName)
        setCategoryDescription(categoryDescription)
        setData(products)})
      .catch((error) => console.error('Error fetching data:', error));
      
  }, [categoryUrl]);

  const productCards = data.map(product =>{
    
  return <GroupCard key={product.productId} title={product.productName} url={product.productUrl} img={product.productImg}/>
  })

  return (
    <>
     <div className='product-content-info' >
      <p className='product-content-header'>{categoryName}  </p>
      <p>{categoryDescription}</p>
    </div>
      <CardWrap data= {productCards} />
    </>
  )
}

export default Products
