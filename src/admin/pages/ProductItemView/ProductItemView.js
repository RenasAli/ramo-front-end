import  './ProductItemView.css'
import { useEffect, useState } from 'react';
import makeRequest from '../../../data/fetch'
import { useParams} from 'react-router-dom';
import { storage } from '../../../data/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const ProductItemView = () => {
    const {productItemNumber} = useParams()
    const [status, setStatus] = useState();
    const [editProductItem, setEditProductItem] = useState({});
    const [data, setData] = useState([]);
    const [image, setImage] = useState(null);
    const [subImage, setSubImage] = useState([]);
    const [postData, setPostData] = useState({});

    
    
   

    const handleUpload =  () => {
        if(image == null) return;
        const imageRef = ref(storage, `images/product/${image.name + v4()}`);
        uploadBytes(imageRef, image)
        .then(() => {
           return getDownloadURL(imageRef);
         })
         .then((url) => {
             handleSumImageOnChange(url)
         })
         .catch((error) => {
           console.error('Error uploading image:', error);
         });
         
    };
    
    const handleChange = (e) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };
    
    useEffect(() => {
        const settings = {
          method: "GET",
        };
        makeRequest(`category/products/items/productItemNumber/${productItemNumber}`, settings)
          .then((data) => {
            
            setSubImage(data.subimages)
            setData(data)
        })
          .catch((error) => console.error('Error fetching data:', error));
          
    }, [productItemNumber]);

    
    const postHandle = () => {
        const token = localStorage.getItem('token');
        const settings = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify(postData),
        };
        makeRequest(`category/products/items/subimages/${data.id}`, settings)
        .then((data) => {
            setPostData(data)
            window.location.reload()
        })
        .catch((error) => console.error('Error fetching data:', error));
        
    }
    const handleSumImageOnChange = (url) => {
        setPostData({ ...postData, subimageUrl: url });
        
    };

    const EditProductItemHandle =  () => {
        const token = localStorage.getItem('token');
        const settings = {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify(editProductItem),
        };
        makeRequest(`category/products/items/${data.id}`, settings)
        .then((data) => {
            setEditProductItem(data);
            setStatus("Ændring er gemt")
        })
        .catch((error) => {
            setStatus("Ændring fejler")
            console.error('Error fetching order data:', error)});
        
      }
    
    const displaySubImages= subImage.map(subImages =>{
        
        return <img className='viewImage' key={subImages.id} alt='' src={subImages.subimageUrl}/>
        
    })

    
  return (
    <>
    <div className="product-view-container container">
        <h4>Produkt Info.</h4>
        <p className={status === "Ændring er gemt"? "status-success": "status-error"}>{status}</p>
        <p>NR.  {data.productItemNumber}</p>

        <label ><i className="fa fa-user"></i>Navn</label>
        <input type="text" className='checkout-input' defaultValue={data.name !== null ? data.name: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, name: e.target.value})}/>

        <label ><i className="fa fa-user"></i> Brand</label>
        <input type="text" className='checkout-input' defaultValue={data.brand !== null ? data.brand: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, brand: e.target.value})}/>

        
        <label ><i className="fa fa-user"></i> Farve</label>
        <input type="text" className='checkout-input' defaultValue={data.color !== null ? data.color: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, color: e.target.value})}/>

        <label ><i className="fa fa-user"></i> URL</label>
        <input type="text" className='checkout-input' defaultValue={data.url !== null ? data.url: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, url: e.target.value})}/>

        <label ><i className="fa fa-user"></i> Type</label>
        <input type="text" className='checkout-input' defaultValue={data.type !== null ? data.type: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, type: e.target.value})}/>

        <label ><i className="fa fa-user"></i> Serie</label>
        <input type="text" className='checkout-input' defaultValue={data.serie !== null ? data.serie: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, serie: e.target.value})}/>

        <label ><i className="fa fa-user"></i> Info</label>
        <textarea type="text" className='checkout-input' defaultValue={data.info !== null ? data.info: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, info: e.target.value})}/>

        <label ><i className="fa fa-user"></i> Beskrivelse</label>
        <textarea type="text" className='checkout-input' defaultValue={data.description !== null ? data.description: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, description: e.target.value})}/>

        <label ><i className="fa fa-user"></i> Pris</label>
        <input type="number" className='checkout-input' defaultValue={data.price !== null ? data.price: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, price: e.target.value})}/>

        <label ><i className="fa fa-user"></i> Højde</label>
        <input type="number" className='checkout-input' defaultValue={data.hight !== null ? data.hight: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, hight: e.target.value})}/>

        <label ><i className="fa fa-user"></i> Bredde</label>
        <input type="number" className='checkout-input' defaultValue={data.width !== null ? data.width: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, width: e.target.value})}/>

        <label ><i className="fa fa-user"></i> Dybde</label>
        <input type="number" className='checkout-input' defaultValue={data.depth !== null ? data.depth: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, depth: e.target.value})}/>

        <label ><i className="fa fa-user"></i> Billede</label>
        <input type="text" className='checkout-input' defaultValue={data.img !== null ? data.img: ""}  onChange={(e) => setEditProductItem({ ...editProductItem, img: e.target.value})}/>

        <img alt='' src={data.img} className='viewImage'/>

        <button type="submit" onClick={EditProductItemHandle} className="checkout-submit-btn btn" > Gem ændring</button>

    </div>

    <div className="product-view-container container">
        <h4>Tilføje subImages</h4>
        {displaySubImages}
    </div>
    
    <div className="product-view-container container">
   
        <div className="col-md-3">
            <h4>Tilføje subImages</h4>
            <label htmlFor="basic-file" className="form-label">Billede</label>
            <input type="file"  className="form-control" accept='image/*' onChange={handleChange}  />
            <button onClick={handleUpload} className="add-new-btn btn btn-outline-success">Hent Billedet</button>
        </div>

        <div className="col-12">
            <button onClick={postHandle} className="add-new-btn btn btn-outline-success">OPRET</button>
        </div>
    </div>
    
    </>
  )
}

export default ProductItemView
