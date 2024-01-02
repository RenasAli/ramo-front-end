import { useEffect, useState } from 'react';
import { CardWrap, Card, FilterBar } from '../../components/index'
import { useParams } from 'react-router-dom';
import makeRequest from '../../../data/fetch'
import Accordion from 'react-bootstrap/Accordion';
import accordionList from '../../../data/accordion-list-data';
import UseSetAccordionBodyItemsToAccordion from '../../../hooks/useSetAccordionBodyItemsToAccordion';

import qs from 'qs'

import './Product.css'

const Product = () => {
  const {productUrl, categoryUrl} = useParams();
  const [data, setData] = useState([]);
  const [productItem, setProductItem] = useState([]);
  const [productName, setProductName] = useState();
  const [productId, setProductId] = useState();
  const [productDescription, setProductDescription] = useState();
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [accordionColorItems, setAccordionColorItems] = useState({});
  const [accordionBrandItems, setAccordionBrandItems] = useState({});
  const [accordionSerieItems, setAccordionSerieItems] = useState({});
  const [accordionTypeItems, setAccordionTypeItems] = useState({});
  const [accordionHightItems, setAccordionHightItems] = useState({});
  const [accordionWidthItems, setAccordionWidthItems] = useState({});
  const [accordionDepthItems, setAccordionDepthItems] = useState({});

 
  useEffect(() => {
    const settings = {
      method: "GET",
    };
    const queryArray = Object.values(selectedCheckbox).filter((item) => typeof item === 'object');
    const groupedData = queryArray.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item.title);
      return acc;
    }, {});
    const query = qs.stringify(groupedData ,{ arrayFormat: 'comma' });
    if(productId != null){
      makeRequest(`category/products/items/filter?productId=${productId}&${query}`, settings)
        .then((productItem) => {
          setProductItem(productItem)
        })
        .catch((error) => console.error('Error fetching data 1:', error));
    }
  }, [selectedCheckbox,productId]);

  useEffect(() => {
    const settings = {
      method: "GET",
    };
    makeRequest(`category/products`, settings)
      .then((data) => {
        
        const filteredData = data.filter(item => item.productUrl === "shop/" + categoryUrl + "/" + productUrl);
        const productItems = filteredData.reduce((acc, curr) => acc.concat(curr.productItems), []);
        const productName = filteredData.reduce((acc, curr) => acc.concat(curr.productName), []);
        const productDescription = filteredData.reduce((acc, curr) => acc.concat(curr.productDescription), []);
        const productId = filteredData.reduce((acc, curr) => acc.concat(curr.productId), []);
        setProductDescription(productDescription)
        setProductName(productName)
        setProductId(productId)
        setData(productItems)
      })
      .catch((error) => console.error('Error fetching data 2:', error));
  }, [productUrl,categoryUrl]);



  const displayProductCards = productItem.map(item =>{
    return <Card key={item.id} title={item.name} url={item.productItemNumber} price={item.price} img={item.img}/>
  });
 
  

  useEffect(() => {
  const processItems = (prevAccordionBodyItems) => {
    
    const updatedBrandItems = { ...prevAccordionBodyItems };
    const updatedSerieItems = { ...prevAccordionBodyItems };
    const updatedTypeItems = { ...prevAccordionBodyItems };
    const updatedHightItems = { ...prevAccordionBodyItems };
    const updatedWidthItems = { ...prevAccordionBodyItems };
    const updatedDepthItems = { ...prevAccordionBodyItems };
    const updatedColorItems = { ...prevAccordionBodyItems };

    data.forEach(item => {

      if (updatedBrandItems[item.brand]) {
        updatedBrandItems[item.brand].quantity += 1;
      } else if(item.brand !== null){
        updatedBrandItems[item.brand] = { ...item, title: item.brand ,quantity: 1 , filterType: "brand"};
      }

      if (updatedSerieItems[item.serie]) {
        updatedSerieItems[item.serie].quantity += 1;
      } else if(item.serie !== null){
        updatedSerieItems[item.serie] = { ...item, title: item.serie ,quantity: 1, filterType: "serie" };
      }

      if (updatedTypeItems[item.type]) {
        updatedTypeItems[item.type].quantity += 1;
      } else if(item.type !== null){
        updatedTypeItems[item.type] = { ...item, title: item.type ,quantity: 1 , filterType: "type"};
      }

      if (updatedHightItems[item.hight]) {
        updatedHightItems[item.hight].quantity += 1;
      } else if(item.hight !== null){
        updatedHightItems[item.hight] = { ...item, title: item.hight ,quantity: 1 , filterType: "hight"};
      }

      if (updatedWidthItems[item.width]) {
        updatedWidthItems[item.width].quantity += 1;
      }else if(item.width !== null){
        updatedWidthItems[item.width] = { ...item, title: item.width ,quantity: 1, filterType: "width" };
      }

      if (updatedDepthItems[item.depth]) {
        updatedDepthItems[item.depth].quantity += 1;
      }else if(item.depth !== null){
        updatedDepthItems[item.depth] = { ...item, title: item.depth ,quantity: 1 , filterType: "depth"};
      }


      if (updatedColorItems[item.color]) {
        updatedColorItems[item.color].quantity += 1;
      } else if(item.color !== null){
        updatedColorItems[item.color] = { ...item, title: item.color ,quantity: 1 , filterType: "color"};
      }

    });
    
    setAccordionBrandItems(updatedBrandItems);
    setAccordionSerieItems(updatedSerieItems);
    setAccordionTypeItems(updatedTypeItems);
    setAccordionHightItems(updatedHightItems);
    setAccordionWidthItems(updatedWidthItems);
    setAccordionDepthItems(updatedDepthItems);
    setAccordionColorItems(updatedColorItems);
  };
  
    processItems();
  }, [data]);
  
 const displayAccordionList = accordionList.map( item =>{
  return<Accordion.Item  className='ramo-accordion-item' eventKey={item.id} key={item.id}>
        <Accordion.Header className='ramo-accordion-header'><h5>{item.title}</h5></Accordion.Header>
        <Accordion.Body className='ramo-accordion-body'> 
            {item.id === 0 && <UseSetAccordionBodyItemsToAccordion accordionBodyItems={accordionBrandItems} selectedCheckbox={selectedCheckbox} setSelectedCheckbox={setSelectedCheckbox} />}
            {item.id === 1 && <UseSetAccordionBodyItemsToAccordion accordionBodyItems={accordionSerieItems} selectedCheckbox={selectedCheckbox} setSelectedCheckbox={setSelectedCheckbox}/>}
            {item.id === 2 && <UseSetAccordionBodyItemsToAccordion accordionBodyItems={accordionTypeItems} selectedCheckbox={selectedCheckbox} setSelectedCheckbox={setSelectedCheckbox}/>}
            {item.id === 3 && <UseSetAccordionBodyItemsToAccordion accordionBodyItems={accordionHightItems} selectedCheckbox={selectedCheckbox} setSelectedCheckbox={setSelectedCheckbox}/>}
            {item.id === 4 && <UseSetAccordionBodyItemsToAccordion accordionBodyItems={accordionWidthItems} selectedCheckbox={selectedCheckbox} setSelectedCheckbox={setSelectedCheckbox}/>}
            {item.id === 5 && <UseSetAccordionBodyItemsToAccordion accordionBodyItems={accordionDepthItems} selectedCheckbox={selectedCheckbox} setSelectedCheckbox={setSelectedCheckbox}/>}
            {item.id === 6 && <UseSetAccordionBodyItemsToAccordion accordionBodyItems={accordionColorItems} selectedCheckbox={selectedCheckbox} setSelectedCheckbox={setSelectedCheckbox}/>}
        </Accordion.Body>
      </Accordion.Item>
 })
  
  
  return (
    <>
    <div className='product-content-info' >
      <p className='product-content-header'>{productName}  </p>
      <span className='product-total'>({productItem.length} Resultater)</span>
      <p>{productDescription}</p>
    </div>
    
    
    
    <div className='product-bg'>
      
        <FilterBar>
        <Accordion className='ramo-accordion'  alwaysOpen>
              {displayAccordionList}
          </Accordion>
        </FilterBar>

        <main className='content'>
        <CardWrap data= {displayProductCards}/>
        </main>

    </div>
    </>
  )
}

export default Product
