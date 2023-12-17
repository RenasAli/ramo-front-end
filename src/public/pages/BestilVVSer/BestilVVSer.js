import './BestilVVSer.css'
import {useState } from 'react';
import makeRequest from '../../../data/fetch'

const BestilVVSer = () => {
  const [postData, setPostData] = useState({});

  const postHandle = () => {
    const settings = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...postData, orderStatus: 'Modtaget' }),
    };
    makeRequest('plumber', settings)
    .then((data) => {
      setPostData(data) 
        
    })
    .catch((error) => console.error('Error fetching order data:', error));
    
  }

  return (
    <>
        
        <div className="col-60">
            <div className="checkout-container order-plumber-container">
                <div className="row">
                <div className="col-50">
                    
                    <label ><i className="fa fa-user"></i> Evt. firma</label>
                    <input type="text" className='checkout-input' name="company" onChange={(e) => setPostData({ ...postData, customerCompanyName: e.target.value})} />

                    <label ><i className="fa fa-user"></i> Fulde navn</label>
                    <input type="text" className='checkout-input' name="firstname" onChange={(e) => setPostData({ ...postData, customerName: e.target.value})} />

                    <div className="row">
                    <div className="col-50">
                        <label >Email</label>
                        <input type="email" className='checkout-input' name="email" onChange={(e) => setPostData({ ...postData, customerEmail: e.target.value})} />
                    </div>

                    <div className="col-50">
                        <label >Tlf.</label>
                        <input type="tel" className='checkout-input' name="phone" onChange={(e) => setPostData({ ...postData, customerTlf: e.target.value})} />
                    </div>

                    </div>

                    <label><i className="fa fa-address-card-o"></i> Adresse</label>
                    <input type="text" className='checkout-input' name="address" onChange={(e) => setPostData({ ...postData, address: e.target.value})} />

                    <div className="row">
                    <div className="col-50">
                        <label >By</label>
                        <input type="text" className='checkout-input' name="city" onChange={(e) => setPostData({ ...postData, city: e.target.value})} />
                    </div>

                    <div className="col-50">
                        <label >Post nr.</label>
                        <input type="number" className='checkout-input' name="zip" onChange={(e) => setPostData({ ...postData, zipCode: e.target.value})} />
                    </div>

                    </div>
            
                    <label><i className="fa fa-address-card-o"></i> Beskrivelse</label>
                    <textarea type="text" maxLength="500" className='checkout-input' name="descriptipn" onChange={(e) => setPostData({ ...postData, description: e.target.value})} />

                </div>
                </div>
                
                <button type="submit" onClick={postHandle} className="checkout-submit-btn btn" >Bekræfte Bestillingen</button>

            </div>
        </div>

    
    </>
  )
}

export default BestilVVSer
