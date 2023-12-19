import './BestilVVSer.css'
import {useState } from 'react';
import makeRequest from '../../../data/fetch'
import Form from 'react-bootstrap/Form';

const BestilVVSer = () => {
  const [postData, setPostData] = useState({});
  const [validated, setValidated] = useState(false);


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
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    postHandle()
    setValidated(true);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} validated={validated} noValidate >
        <div className="col-60">
            <div className="checkout-container order-plumber-container">
                <div className="row">
                <div className="col-50">
                    
                    <label ><i className="fa fa-user"></i> Evt. firma</label>
                    <input type="text" className='checkout-input' name="company" onChange={(e) => setPostData({ ...postData, customerCompanyName: e.target.value})} />

                    <label ><i className="fa fa-user"></i> Fulde navn</label>
                    <input type="text" className= 'checkout-input form-control'  name="firstname" onChange={(e) => setPostData({ ...postData, customerName: e.target.value})} required/>
                    <div className="row">
                    <div className="col-50">
                        <label >Email</label>
                        <input type="email" className='checkout-input form-control' name="email" onChange={(e) => setPostData({ ...postData, customerEmail: e.target.value})} required/>
                    </div>

                    <div className="col-50">
                        <label >Tlf.</label>
                        <input type="tel" className='checkout-input form-control' name="phone" onChange={(e) => setPostData({ ...postData, customerTlf: e.target.value})} required/>
                    </div>

                    </div>

                    <label><i className="fa fa-address-card-o"></i> Adresse</label>
                    <input type="text" className='checkout-input form-control' name="address" onChange={(e) => setPostData({ ...postData, address: e.target.value})} required/>

                    <div className="row">
                    <div className="col-50">
                        <label >By</label>
                        <input type="text" className='checkout-input form-control' name="city" onChange={(e) => setPostData({ ...postData, city: e.target.value})} required/>
                    </div>

                    <div className="col-50">
                        <label >Post nr.</label>
                        <input type="number" className='checkout-input form-control' name="zip" onChange={(e) => setPostData({ ...postData, zipCode: e.target.value})} required/>
                    </div>

                    </div>
            
                    <label><i className="fa fa-address-card-o"></i> Beskrivelse</label>
                    <textarea type="text" maxLength="500" className='checkout-input' name="descriptipn" onChange={(e) => setPostData({ ...postData, description: e.target.value})} />

                </div>
                </div>
                
                <button type="submit" className="checkout-submit-btn btn" >Bekræfte Bestillingen</button>

            </div>
        </div>
      </Form>
    
    </>
  )
}

export default BestilVVSer
