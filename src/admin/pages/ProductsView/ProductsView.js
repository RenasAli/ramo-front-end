import './ProductsView.css'
import { useEffect, useState } from 'react';
import makeRequest from '../../../data/fetch';
import { useParams} from 'react-router-dom';


const ProductsView = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState();
    const [editProduct, setEditProduct] = useState({});
    const {productId} = useParams();


    useEffect(() => {
        const token = localStorage.getItem('token');
        const settings = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
          },
      };
        makeRequest(`category/products/${productId}`, settings)
          .then((data) => {
            setData(data)
        })
          .catch((error) => console.error('Error fetching data:', error));
          
      }, [productId]);

      const EditProductHandle =  () => {
        const token = localStorage.getItem('token');
        const settings = {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify(editProduct),
        };
        makeRequest(`category/products/${data.productId}`, settings)
        .then((data) => {
            setEditProduct(data);
            setStatus("Ændring er gemt")
        })
        .catch((error) => {
            setStatus("Ændring fejler")
            console.error('Error fetching order data:', error)});
        
      }
      
  return (
    <>
    <div className="checkout-container container">
        <h4>Product Info</h4>
        <p className={status === "Ændring er gemt"? "status-success": "status-error"}>{status}</p>
        <p>Product ID:  {data.productId}</p>

        <label ><i className="fa fa-user"></i> Product Navn</label>
        <input type="text" className='checkout-input' defaultValue={data.productName !== null ? data.productName: ""}  onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value})}/>
 
        <label ><i className="fa fa-user"></i> Beskrivelse</label>
        <textarea type="text" className='checkout-input' defaultValue={data.productDescription !== null ? data.productDescription: ""}  onChange={(e) => setEditProduct({ ...editProduct, productDescription: e.target.value})}/>
            
        <label ><i className="fa fa-user"></i> Product Link</label>
        <input type="text" className='checkout-input' defaultValue={data.productUrl !== null ? data.productUrl: ""}  onChange={(e) => setEditProduct({ ...editProduct, productUrl: e.target.value})}/>
            
        <label ><i className="fa fa-user"></i> Product billede Link</label>
        <input type="text" className='checkout-input' defaultValue={data.productImg !== null ? data.productImg: ""}  onChange={(e) => setEditProduct({ ...editProduct, productImg: e.target.value})}/>
        <img alt='' src={data.productImg} className='viewImage'/>
            
    </div>
    <button type="submit" onClick={EditProductHandle} className="checkout-submit-btn btn" > Gem ændring</button>
    </>

  )
}

export default ProductsView
