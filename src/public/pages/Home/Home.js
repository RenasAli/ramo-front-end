import './Home.css';
import {Link} from 'react-router-dom';
import{Swiper} from '../../components/index';
import React, { useState, useEffect } from 'react';
import makeRequest from '../../../data/fetch';
import { CardWrap, GroupCard } from '../../components/index'


const Home = () => {
  const [randomSubset, setRandomSubset] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const settings = {
      method: "GET",
  };
    makeRequest('category/products', settings)
      .then((data) => {
        setData(data)})
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const getRandomSubset = (arr, size) => {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, size);
    };

    setRandomSubset(getRandomSubset(data, 6));
  }, [data]);

  const displayProductCards = randomSubset.map(product =>{
    return <GroupCard key={product.productId} title={product.productName} url={`${product.productUrl}`} img={product.productImg}/>
    })

  return (
    <>
    <Swiper/>
   
     
    <div className="header-container">
      <div>  
        <h2 className="header-container-header">Velkommen til en verden<br/> af førsteklasses VVS-løsninger.</h2>
      </div>
    </div>
    <div className='home-product-header'>
          <h4>Se Vores Produkter</h4>
        </div>
    <CardWrap data= {displayProductCards} />
    <div className='order-offer-content'>
      <Link to='/bestil-vvser'>
        <button type="button"
          className="order-offer-btn ">Bestil Gratis Tilbud</button>
        </Link>          
    </div>
   
    
        
        
    </>
  )
}



export default Home
