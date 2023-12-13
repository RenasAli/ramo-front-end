import  './ProductItemView.css'
import { useEffect, useState } from 'react';
import makeRequest from '../../../data/fetch'
import { useParams} from 'react-router-dom';
import { storage } from '../../../data/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {Table, TableHeader, TableBody} from '../../components/index'
import { v4 } from 'uuid';

const ProductItemView = () => {
    const {productItemNumber} = useParams()
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
        const settings = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
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

    
    
    const displaySubImages= subImage.map(subImages =>{
        
        return <img key={subImages.id} alt='' src={subImages.subimageUrl}/>
        
    })

    
  return (
    <>
    <div className="product-view-container container">
        <h4>Produkt Info.</h4>
        <Table>
            <TableHeader>
                        <th scope="col">Colum</th>
                        <th scope="col">Value</th>
            </TableHeader>
            <TableBody>
                <tr>
                    <th>NR. </th>
                    <td>{data.productItemNumber}</td>
                </tr>
                <tr>
                    <th>Navn </th>
                    <td>{data.name}</td>
                </tr>
                <tr>
                    <th>NR. </th>
                    <td>{data.productItemNumber}</td>
                </tr>
                <tr>
                    <th>Mærke </th>
                    <td>{data.brand}</td>
                </tr>
                <tr>
                    <th>Farve </th>
                    <td>{data.color}</td>
                </tr>
                <tr>
                    <th>URL </th>
                    <td>{data.url}</td>
                </tr>
                <tr>
                    <th>Main Billede</th>
                    <td>{data.img}</td>
                </tr>
                <tr>
                    <th>Pris</th>
                    <td>{data.productItemNumber} <span>.00 Kr.</span></td>
                </tr>
                <tr>
                    <th>Type </th>
                    <td>{data.type}</td>
                </tr>
                <tr>
                    <th>Beskrivelse</th>
                    <td>{data.description}</td>
                </tr>
                <tr>
                    <th>Product Type </th>
                    <td>{data.productTypeName}</td>
                </tr>
                <tr>
                    <th>Product Serie </th>
                    <td>{data.serie}</td>
                </tr>
                <tr>
                    <th>Product Højde </th>
                    <td>{data.hight}</td>
                </tr>
                <tr>
                    <th>Product Bredde </th>
                    <td>{data.width}</td>
                </tr>
                <tr>
                    <th>Product Dybde </th>
                    <td>{data.depth}</td>
                </tr>

                <tr>
                    <th>SubImages </th>
                    <td className="sub-images">{displaySubImages}</td>
                </tr>
            </TableBody>
        </Table>
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
