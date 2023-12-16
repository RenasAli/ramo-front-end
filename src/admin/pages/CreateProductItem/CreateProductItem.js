import './CreateProductItem.css'
import { useState, useEffect } from 'react';
import makeRequest from '../../../data/fetch'
import { storage } from '../../../data/firebase';
import {Option} from '../../components/index'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
const CreateProductItem = () => {
    const [postData, setPostData] = useState({});
    const [image, setImage] = useState(null);
    const [ProductData, setProductData] = useState([]);

    const handleChange = (e) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };

    const handleUpload = () => {
        if(image == null) return;
        const imageRef = ref(storage, `images/product/${image.name + v4()}`);
        uploadBytes(imageRef, image)
        .then(() => {
           return getDownloadURL(imageRef);
         })
         .then((url) => {
            handleImageOnChange(url);
         })
         .catch((error) => {
           console.error('Error uploading image:', error);
         });
    };

    const handleImageOnChange = (url) => {
        setPostData({ ...postData, img: url }) 
    };

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
        makeRequest('category/products/items', settings)
        .then((data) => {
            setPostData(data)
            window.location.reload()
        })
        .catch((error) => console.error('Error fetching data:', error));
        
    }

    useEffect(() => {
        const settings = {
          method: "GET",
      };
        makeRequest('category/products', settings)
          .then((data) => setProductData(data))
          .catch((error) => console.error('Error fetching data:', error));      
      }, []);
      
    const productList = ProductData.map(item =>{
        return <Option key={item.productId} value={item.productId} name={item.productName} />
    });
  return (
    <>
    <div className="col-md-6">
        <label htmlFor="inputtitle" className="form-label">Titel</label>
        <input type="text" className="form-control"  onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
    </div>
    <div className="col-md-6">
        <label htmlFor="inputtitle" className="form-label">Brand</label>
        <input type="text" className="form-control"  onChange={(e) => setPostData({ ...postData, brand: e.target.value })} />
    </div>
    <div className="col-md-6">
        <label htmlFor="inputtitle" className="form-label">Farve</label>
        <input type="text" className="form-control"  onChange={(e) => setPostData({ ...postData, color: e.target.value })} />
    </div>
    <div className="col-md-6">
        <label htmlFor="inputtitle" className="form-label">Pris</label>
        <input type="number" className="form-control"  onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
    </div>
    <div className="col-md-6">
        <label htmlFor="inputtitle" className="form-label">Type</label>
        <input type="text" className="form-control"  onChange={(e) => setPostData({ ...postData, type: e.target.value })} />
    </div>
    <div className="col-md-6">
        <label htmlFor="inputtitle" className="form-label">Serie</label>
        <input type="text" className="form-control"  onChange={(e) => setPostData({ ...postData, serie: e.target.value })} />
    </div>
    <div className="col-md-6">
        <label htmlFor="inputtitle" className="form-label">Højde</label>
        <input type="number" className="form-control"  onChange={(e) => setPostData({ ...postData, hight: e.target.value })} />
    </div>
    <div className="col-md-6">
        <label htmlFor="inputtitle" className="form-label">Bredde</label>
        <input type="number" className="form-control"  onChange={(e) => setPostData({ ...postData, width: e.target.value })} />
    </div>
    <div className="col-md-6">
        <label htmlFor="inputtitle" className="form-label">Dybde</label>
        <input type="number" className="form-control"  onChange={(e) => setPostData({ ...postData, depth: e.target.value })} />
    </div>
    <div className="col-md-8">
        <label htmlFor="inputCategoryDescription" className="form-label">Beskrivelse</label>
        <textarea className="form-control"  rows='9' onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
    </div>
    <div className="col-md-6">
        <label htmlFor="basic-url" className="form-label">URL</label>
        <input type="text" className="form-control"   onChange={(e) => setPostData({ ...postData, url: e.target.value })}/>
    </div>
    <div className="col-md-6">
        <label htmlFor="basic-file" className="form-label">Produkt Navn</label>
        <select className="form-control form-control-lg" onChange={(e) => setPostData({ ...postData, productId: e.target.value })}>
            <option >Vælge en Produkt Navn</option>
            {productList}
        </select>
    </div>
    <div className="col-md-3">
        <label htmlFor="basic-file" className="form-label">Billede</label>
        <input type="file"  className="form-control" accept='image/*' onChange={handleChange}/>
        <button onClick={handleUpload} className="add-new-btn btn btn-outline-success">OPRET</button>
    </div>
    
    <div className="col-12">
        <button onClick={postHandle} className="add-new-btn btn btn-outline-success">OPRET</button>
    </div>
   </>
  )
}

export default CreateProductItem
