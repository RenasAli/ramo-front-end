import './VVSOrderView.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import makeRequest from '../../../data/fetch';
import { useParams} from 'react-router-dom';
const VVSOrderView = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState();
    const [editOrderItem, setEditOrderItem] = useState({});
    const {vvsOrderNr} = useParams()

    useEffect(() => {
        const token = localStorage.getItem('token');
        const settings = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
          },
      };
        makeRequest(`plumber/order-number/${vvsOrderNr}`, settings)
          .then((data) => {
            setData(data)
        })
          .catch((error) => console.error('Error fetching data:', error));
          
      }, [vvsOrderNr]);

      const EditOrderHandle = async () => {
        const token = localStorage.getItem('token');
        const settings = {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify(editOrderItem),
        };
        makeRequest(`plumber/${data.orderId}`, settings)
        .then((data) => {
            setEditOrderItem(data);
            setStatus("Ændring er gemt")
        })
        .catch((error) => {
            setStatus("Ændring fejler")
            console.error('Error fetching order data:', error)});
        
      }


      

  return (
   <>
   <Row>
        
        <Col>
        <div className="checkout-container container">
            <h4>VVS Bestilling Info</h4>
            <p className={status === "Ændring er gemt"? "status-success": "status-error"}>{status}</p>
            <p>Ordre nr. {data.orderNumber}</p>
            <p>dato: {data.date} </p>

            

            <label ><i className="fa fa-user"></i> Evt. firma</label>
            <input type="text" className='checkout-input' name="company" defaultValue={data.customerCompanyName !== null ? data.customerCompanyName: ""}  onChange={(e) => setEditOrderItem({ ...editOrderItem, customerCompanyName: e.target.value})}/>

            <label ><i className="fa fa-user"></i> Fulde navn</label>
            <input type="text" className='checkout-input' name="firstname" defaultValue={data.customerName} onChange={(e) => setEditOrderItem({ ...editOrderItem, customerName: e.target.value})}/>


            <div className="row">
                <div className="col-50">
                    <label >Email</label>
                    <input type="email" className='checkout-input' name="email" defaultValue={data.customerEmail} onChange={(e) => setEditOrderItem({ ...editOrderItem, customerEmail: e.target.value})}/>
                </div>

                <div className="col-50">
                    <label >Tlf.</label>
                    <input type="tel" className='checkout-input' name="phone" defaultValue={data.customerTlf}  onChange={(e) =>{ e.target.value !== null ? 
                         setEditOrderItem({ ...editOrderItem, customerTlf: e.target.value}) : setEditOrderItem({ ...editOrderItem, customerTlf: data.customerTlf})}} />
                </div>

            </div>

            <label><i className="fa fa-address-card-o"></i> Adresse</label>
            <input type="text" className='checkout-input' name="address" defaultValue={data.address} onChange={(e) => setEditOrderItem({ ...editOrderItem, address: e.target.value})}/>

            <div className="row">
                <div className="col-50">
                    <label >By</label>
                    <input type="text" className='checkout-input' name="city" defaultValue={data.city} onChange={(e) => setEditOrderItem({ ...editOrderItem, city: e.target.value})}/>
                </div>

                <div className="col-50">
                    <label >Post nr.</label>
                    <input type="number" className='checkout-input' name="zip" defaultValue={data.zipCode} onChange={(e) => setEditOrderItem({ ...editOrderItem, zipCode: e.target.value})}/>
                </div>
            </div>

            <label><i className="fa fa-address-card-o"></i> Beskrivelse</label>
            <textarea type="text" className='checkout-input' name="description" defaultValue={data.description !== null ? data.description: ""} onChange={(e) => setEditOrderItem({ ...editOrderItem, description: e.target.value})}/>

        </div>
        </Col>
        <Col> 
        <div className="checkout-container container">
            <h4>Bestilling Status</h4>

            <label htmlFor="basic-file" className="form-label">Ordre Status</label>
            <select className="form-control form-control-lg" onChange={(e) => setEditOrderItem({ ...editOrderItem, orderStatus: e.target.value})}>
            {data.orderStatus === 'Modtaget' ? <option value='Modtaget' selected>Modtaget</option> :
                 <option value='Modtaget'>Modtaget</option>}

            {data.orderStatus === 'I gang' ? <option value='I gang' selected>I gang</option> :
                 <option value='I gang'>I gang</option>}

            {data.orderStatus === 'Færdig' ? <option value='Færdig' selected>Færdig</option> :
                 <option value='Færdig'>Færdig</option>}

            {data.orderStatus === 'Montering fejler' ? <option value='Montering fejler' selected>Montering fejler</option> :
                 <option value='Montering fejler'>Montering fejler</option>}

            {data.orderStatus === 'Annulleret' ? <option value='Annulleret' selected>Annulleret</option> :
                 <option value='Annulleret'>Annulleret</option>}

            </select>
            
            <button type="submit" onClick={EditOrderHandle} className="checkout-submit-btn btn" > Gem ændring</button>
        </div>
        
        
        </Col>
      </Row>
   </>
  )
}

export default VVSOrderView
