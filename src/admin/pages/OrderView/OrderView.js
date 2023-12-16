import  './OrderView.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Table, TableHeader, TableBody} from '../../components/index';
import { useEffect, useState } from 'react';
import makeRequest from '../../../data/fetch';
import { useParams} from 'react-router-dom';


const OrderView = () => {
    const [data, setData] = useState([]);
    const [orderItem, setOrderItem] = useState([]);
    const [editOrderItem, setEditOrderItem] = useState({});
    const {orderNr} = useParams()

    useEffect(() => {
        const token = localStorage.getItem('token');
        const settings = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
          },
      };
        makeRequest(`order/order-number/${orderNr}`, settings)
          .then((data) => {
            setData(data)
            const orderItems = data.orderItems
            setOrderItem(orderItems)
        })
          .catch((error) => console.error('Error fetching data:', error));
          
      }, [orderNr]);

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
        makeRequest(`order/${data.orderId}`, settings)
        .then((data) => {
            setEditOrderItem(data);
        })
        .catch((error) => console.error('Error fetching order data:', error));
        
    }
      
    
    const displayOrderItems = orderItem.map(orderItem =>{
        return <tr key={orderItem.id}>
                    <td>{orderItem.orderItemNumber}</td>
                    <td>{orderItem.orderItemTitle}</td>
                    <td>{orderItem.orderItemQuantity}</td>
                    <td>{orderItem.orderItemPrice}</td>
                    <td>{orderItem.orderItemTotalPrice}</td>
                </tr>
    })
  
  return (
    <>
     <Row>
        
        <Col>
        <div className="checkout-container container">
            <h4>Bestilling Info</h4>
            <p>Ordre nr. {data.orderNumber}</p>
            <p>dato: {data.date} </p>

            

            <label ><i className="fa fa-user"></i> Evt. firma</label>
            <input type="text" className='checkout-input' name="company" defaultValue={data.customerCompanyName !== null ? data.customerCompanyName: ""}  onChange={(e) => setEditOrderItem({ ...editOrderItem, customerCompanyName: e.target.value})}/>

            <label ><i className="fa fa-user"></i> Fulde navn</label>
            <input type="text" className='checkout-input' name="firstname" defaultValue={data.customerName} onChange={(e) => setEditOrderItem({ ...editOrderItem, customerName: e.target.value})}/>

            <label ><i className="fa fa-user"></i> Beløbet</label>
            <input type="number" className='checkout-input' defaultValue={data.orderTotalAmount}   name="amount" onChange={(e) => setEditOrderItem({ ...editOrderItem, orderTotalAmount: e.target.value})} disabled readOnly />

            <label ><i className="fa fa-user"></i> Moms</label>
            <input type="number" className='checkout-input' name="amount"  defaultValue={data.vat} onChange={(e) => setEditOrderItem({ ...editOrderItem, vat: e.target.value})}disabled readOnly/>

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

            <label><i className="fa fa-address-card-o"></i> Kommentar</label>
            <textarea type="text" className='checkout-input' name="comment" defaultValue={data.comment !== null ? data.comment: ""} onChange={(e) => setEditOrderItem({ ...editOrderItem, comment: e.target.value})}/>

        </div>
        </Col>
        <Col> 
        <div className="checkout-container container">
            <h4>Bestilling Status</h4>

            <label htmlFor="basic-file" className="form-label">Kunden betaler med</label>
            <select className="form-control form-control-lg" onChange={(e) => setEditOrderItem({ ...editOrderItem, paymentMethod: e.target.value})}>
                {data.paymentMethod === 'MobilePay' ? <option value='MobilePay' selected>MobilePay</option> :
                 <option value='MobilePay' >MobilePay</option>}

                {data.paymentMethod === 'Faktura' ? <option value='Faktura' selected>Faktura</option> :
                 <option value='Faktura' >Faktura</option>}
            </select>

            <label htmlFor="basic-file" className="form-label">Betaling Status</label>
            <select className="form-control form-control-lg" onChange={(e) => setEditOrderItem({ ...editOrderItem, paymentStatus: e.target.value})}>
            {data.paymentStatus === 'false' ? <option value='false' selected>Ikke Betalt</option> :
                 <option value='false' >Ikke Betalt</option>}

            {data.paymentStatus === 'true' ? <option value='true' selected>Betalt</option> :
                 <option value='true'>Betalt</option>}
            
            </select>

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
        <div className="checkout-container container">
            <h4>Bestilling Vare</h4>
            <Table>

                <TableHeader>
                    <th scope="col">Nr.</th>
                    <th scope="col">Navn</th>
                    <th scope="col">Antal</th>
                    <th scope="col">Pris</th>
                    <th scope="col">Toatal</th>
                    <th scope="col">xxx </th>
                </TableHeader>

                <TableBody>
                    {displayOrderItems}
                </TableBody> 
            </Table>
        </div>
        
        </Col>
      </Row>
    </>
  )
}

export default OrderView
