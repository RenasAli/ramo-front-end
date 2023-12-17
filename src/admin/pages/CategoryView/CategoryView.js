import  './CategoryView.css'
import { useEffect, useState } from 'react';
import makeRequest from '../../../data/fetch';
import { useParams} from 'react-router-dom';
const CategoryView = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState();
    const [editCategory, setEditCategory] = useState({});
    const {categoryId} = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const settings = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
          },
      };
        makeRequest(`category/${categoryId}`, settings)
          .then((data) => {
            setData(data)
        })
          .catch((error) => console.error('Error fetching data:', error));
          
      }, [categoryId]);

      const EditCategoryHandle =  () => {
        const token = localStorage.getItem('token');
        const settings = {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify(editCategory),
        };
        makeRequest(`category/${data.categoryId}`, settings)
        .then((data) => {
            setEditCategory(data);
            setStatus("Ændring er gemt")
        })
        .catch((error) => {
            setStatus("Ændring fejler")
            console.error('Error fetching order data:', error)});
        
      }
  return (
    <>
    <div className="checkout-container container">
        <h4>Kategory Info</h4>
        <p className={status === "Ændring er gemt"? "status-success": "status-error"}>{status}</p>
        <p>Category ID:  {data.categoryId}</p>

        <label ><i className="fa fa-user"></i> Kategory Navn</label>
        <input type="text" className='checkout-input' defaultValue={data.categoryName !== null ? data.categoryName: ""}  onChange={(e) => setEditCategory({ ...editCategory, categoryName: e.target.value})}/>
            
        <label ><i className="fa fa-user"></i> Beskrivelse</label>
        <textarea type="text" className='checkout-input' defaultValue={data.categoryDescription !== null ? data.categoryDescription: ""}  onChange={(e) => setEditCategory({ ...editCategory, categoryDescription: e.target.value})}/>
            
        <label ><i className="fa fa-user"></i> Kategory Link</label>
        <input type="text" className='checkout-input' defaultValue={data.categoryUrl !== null ? data.categoryUrl: ""}  onChange={(e) => setEditCategory({ ...editCategory, categoryUrl: e.target.value})}/>
            
        <label ><i className="fa fa-user"></i> Kategory billede Link</label>
        <input type="text" className='checkout-input' defaultValue={data.categoryImg !== null ? data.categoryImg: ""}  onChange={(e) => setEditCategory({ ...editCategory, categoryImg: e.target.value})}/>
        <img alt='' src={data.categoryImg}/>
            
    </div>
    <button type="submit" onClick={EditCategoryHandle} className="checkout-submit-btn btn" > Gem ændring</button>
    </>
  )
}

export default CategoryView
