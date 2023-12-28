import './BestilVVSer.css'
import {useState } from 'react';
import makeRequest from '../../../data/fetch'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Link} from 'react-router-dom';

const BestilVVSer = () => {
  const [postData, setPostData] = useState({});
  const [validated, setValidated] = useState(false);
  const [modalShow, setModalShow] = useState(false);


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
      setModalShow(true)  
    })
    .catch((error) => console.error('Error fetching order data:', error));
    
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    postHandle()
    setValidated(true);
  };

  return (
    <>
    
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered 
    show={modalShow} >
      <Modal.Body>
        <h4 className='item-title'>Kære {postData.customerName} </h4>
        <h4 className='item-title'>Din bestilling er Bekræftet. </h4>
        <p className='item-description'>
          <br/>
          Bestilling nr: {postData.orderNumber}<br/>
          Tlf: {postData.customerTlf}<br/>
          Email: {postData.customerEmail}<br/>
          Adresse: {postData.address}, {postData.zipCode}  {postData.city}<br/>
          <hr/>
          Vi vil Kontakt dig inden for 24 timer.<br/>
          Hvis du har spørgsmål, kan du kontakte os på 28 19 96 97<br/>
          eller send en mail til Ramo@ramo-ms.dk <br/>
          Fortsæt en god dag.<br/>
          Mvh Ramo MultiService<br/>
        </p>
      </Modal.Body>
      <Modal.Footer>
        
        <Link to='/'>
          <button type="button" onClick={()=>setModalShow(false)} className="add-order-btn btn btn-outline-success">Luk</button>
        </Link>
      </Modal.Footer>
    </Modal>
    <div className="col-60">
      <div className="checkout-container order-plumber-info-container">
        <h4>Bestil en VVS-Montør på Timepris</h4>
        <p>Har du et stoppet afløb, utætte vandrør eller skal du have udskiftet sanitet?<br/> Uanset opgavens størrelse står vores dygtige VVS-montører klar til at løse den for dig.<br/> Bestil en VVS-montør på timepris og få ro i maven.</p>
        <h6>Vores priser:</h6>
        <li>Booking af en VVS-montør i 1 time: 1.150 kr. (inkl. kørsel og opstartsgebyr).</li>
        <li>Booking af en VVS-montør i mere end 1 time: 795 kr. pr. time + opstartsgebyr (inkl. kørsel).</li><br/>
        <h6>Fast priser:</h6>
        <p>
        Når du bestiller en VVS-montør på timepris, får du altid en fast pris for din opgave.<br/> Prisen afhænger af, hvor mange timer du ønsker at booke.
        </p>
        <h6>Udfyld blot bestillingsformularen nedenfor, og lad os hjælpe dig med dit VVS-arbejde.</h6>
      </div>
      </div>
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
