import './CreateNewProduct.css'
import { useState, useEffect } from 'react';
import makeRequest from '../../../data/fetch'
import { storage } from '../../../data/firebase';
import {Option} from '../../components/index'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const CreateNewProduct = (props) => {
    const [postData, setPostData] = useState({});
    const [image, setImage] = useState(null);
    const [categoryData, setCategoryData] = useState([]);


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
      setPostData({ ...postData, productImg: url }) 
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
        makeRequest('category/products', settings)
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
        makeRequest('category', settings)
          .then((data) => setCategoryData(data))
          .catch((error) => console.error('Error fetching data:', error));
          
      }, []);
      

    const categoryList = categoryData.map(item =>{
        return <Option key={item.categoryId} value={item.categoryId} name={item.categoryName} />
    });

  return (
    <>
    <div className="col-md-6">
        <label htmlFor="inputtitle" className="form-label">Produkt Titel</label>
        <input type="text" className="form-control"  onChange={(e) => setPostData({ ...postData, productName: e.target.value })} />
    </div>
    <div className="col-md-8">
        <label htmlFor="inputCategoryDescription" className="form-label">Produkt Beskrivelse</label>
        <textarea className="form-control"  rows='9' onChange={(e) => setPostData({ ...postData, productDescription: e.target.value })} />
    </div>
    <div className="col-md-6">
        <label htmlFor="basic-url" className="form-label">URL</label>
        <input type="text" className="form-control"   onChange={(e) => setPostData({ ...postData, productUrl: e.target.value })}/>
    </div>
    <div className="col-md-6">
        <label htmlFor="basic-file" className="form-label">Kategori</label>
        <select className="form-control form-control-lg" onChange={(e) => setPostData({ ...postData, categoryId: e.target.value })}>
            <option >Vælge en Kategori</option>
            {categoryList}
        </select>
    </div>
    <div className="col-md-3">
        <label htmlFor="basic-file" className="form-label">Billede</label>
        <input type="file"  className="form-control" accept='image/*' onChange={handleChange}   />
        <button onClick={handleUpload} className="add-new-btn btn btn-outline-success">OPRET</button>
    </div>

    <div className="col-12">
        <button onClick={postHandle} className="add-new-btn btn btn-outline-success">OPRET</button>
    </div>
   </>
  )
}

export default CreateNewProduct
