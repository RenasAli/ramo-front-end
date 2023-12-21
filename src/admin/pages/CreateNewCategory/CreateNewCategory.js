import './CreateNewCategory.css'
import { useState } from 'react';
import makeRequest from '../../../data/fetch'
import { storage } from '../../../data/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';



const CreateNewCategory = () => {
    const [postData, setPostData] = useState({});
    const [image, setImage] = useState(null);
    const navigate = useNavigate();


    const handleChange = (e) => {
        if (e.target.files[0]) {
        setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if(image == null) return;
        const imageRef = ref(storage, `images/category${image.name + v4()}`);
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
        setPostData({ ...postData, categoryImg: url }) 
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
        makeRequest('category', settings)
        .then((data) => {
            setPostData(data)
            navigate(`/category/${data.categoryId}`)
        })
        .catch((error) => console.error('Error fetching data:', error));
    }

  return (
   <>
   
    <div className="col-md-6">
        <label htmlFor="inputtitle" className="form-label">Kategori Titel</label>
        <input type="text" className="form-control" onChange={(e) => setPostData({ ...postData, categoryName: e.target.value })}/>
    </div>
    <div className="col-md-8">
        <label htmlFor="inputCategoryDescription" className="form-label">Kategori Beskrivelse</label>
        <textarea className="form-control"  rows='9' onChange={(e) => setPostData({ ...postData, categoryDescription: e.target.value })}/>
    </div>
    <div className="col-md-6">
        <label htmlFor="basic-url" className="form-label">URL</label>
        <input type="text" className="form-control"  onChange={(e) => setPostData({ ...postData, categoryUrl: e.target.value })}/>
    </div>
    <div className="col-md-3">
        <label htmlFor="basic-file" className="form-label">Billede</label>
        <input type="file"  className="form-control" accept='image/*' onChange={handleChange} />
        <button onClick={handleUpload} className="add-new-btn btn btn-outline-success">OPRET</button>
    </div>
    <div className="col-12">
        <button onClick={postHandle} className="add-new-btn btn btn-outline-success">OPRET</button>
    </div>
   </>
  )
}

export default CreateNewCategory
