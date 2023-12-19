import './Checkout.css'
import { useEffect, useState } from 'react';
import mobilePayLogo from '../../../assets/logo/mobilepay-logo.jpg'
import invoiceLIcon from '../../../assets/logo/Factura.png'
import { useSelector , useDispatch} from 'react-redux';
import makeRequest from '../../../data/fetch'
import {getTotalProducts, decrementQuantity, removeFromCart, incrementQuantity} from '../../../redux/cartReducer';
import Form from 'react-bootstrap/Form';



const Checkout = () => {
    const dispatch = useDispatch()
    const [totalVAT, setTotalVAT] = useState();
    const [postDataToOrder, setPostDataToOrder] = useState({});
    const [createdOrderId, setCreatedOrderId] = useState();
    const [postDataToOrderItem, setPostDataToOrderItem] = useState({});
    const [validated, setValidated] = useState(false);
    const products = useSelector( (state) =>  state.cart.products);
    const totalAmount = useSelector(state => state.cart.productsTotalAmount);
    const totalQuantity = useSelector(state => state.cart.productsTotalQuantity);

    useEffect(() => {
        dispatch(getTotalProducts())
        setTotalVAT(totalAmount - (totalAmount * 80) / 100)
      }, [ dispatch, products, totalAmount]);

      const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        submitOrderHandle()
        setValidated(true);
      };

      const postToOrderHandle = async () => {
        const settings = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...postDataToOrder, orderTotalAmount: totalAmount, vat: totalVAT, orderStatus: 'Modtaget' }),
        };
        makeRequest('order', settings)
        .then((data) => {
            const createdId = data.orderId;
            setCreatedOrderId( createdId);
            setPostDataToOrder(data);
            
        })
        .catch((error) => console.error('Error fetching order data:', error));
        
    }
    
    const postToOrderItemHandle = async (product) => {
        const settings = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...postDataToOrderItem, productItemId: product.id, orderItemQuantity: product.quantity,  orderId: createdOrderId}),
        };
        makeRequest('order/orderItem', settings)
        .then((data) => {
            setPostDataToOrderItem(data)

            
        })
        .catch((error) => console.error('Error fetching order item data:', error));
        
    }

    const addproductItemToOrderItem = async () => {
        const responses = [];
    
        for (const product of products) {
          try {
            const response =  postToOrderItemHandle(await product);
            responses.push(response);
          } catch (error) {
            
            console.error('Error processing product:', product, error);
          }
        }
      };
      useEffect(() => {
        if (createdOrderId){
            addproductItemToOrderItem()
            console.log("the order is done")
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [createdOrderId]);
 
    const submitOrderHandle = async () =>{
        try{
            
            await postToOrderHandle();
            
           
            if (createdOrderId){
                await addproductItemToOrderItem();
                
            } else {
                console.log(" order id is " + createdOrderId)
            }
            
            
        }catch(error){
            console.log("The error of submit order is:" + error)
            
        }
    }

    

    const displayProductsInCart = products.map((product) =>{
        return <div className='cart-order-body' key={product.id}>
                    <div className='cart-body-top'>
                        <img alt='' src={product.image}/>
                        <p>{product.title}</p>
                    </div>
                    <div className='cart-body-bottom'>
                        <div className='cart-btn-wrap'>
                            <button className='qantity-btn' onClick={() => dispatch(incrementQuantity({
                                id: product.id,
                                quantity: product.quantity,
                                price: product.price,
                                totalPrice: product.totalPrice,
                            }))}
                            >+</button>
                            <p className='qantity'>{product.quantity}</p>
                            <button className='qantity-btn' onClick={() => dispatch(product.quantity > 1 ? decrementQuantity({
                                id: product.id,
                                quantity: product.quantity,
                                price: product.price,
                                totalPrice: product.totalPrice,
                            }): removeFromCart({
                                id: product.id
                            }))}
                            >-</button>
                        </div>
                        <p className='cart-price' >{product.totalPrice} kr.</p>

                    </div>
                </div>   
    });

  return (
    <>
    <div className="row">
        <div className="col-60">
            <div className="checkout-container container">
                <Form onSubmit={handleSubmit} validated={validated} noValidate >
                    <div className="row">
                        <div className="col-50">
                            <h3>FAKTURERINGSADRESSE</h3>
                            <label ><i className="fa fa-user"></i> Evt. firma</label>
                            <input type="text" className='checkout-input' name="company" onChange={(e) => setPostDataToOrder({ ...postDataToOrder, customerCompanyName: e.target.value})} />

                            <label ><i className="fa fa-user"></i> Fulde navn</label>
                            <input type="text" className='checkout-input form-control' name="firstname" onChange={(e) => setPostDataToOrder({ ...postDataToOrder, customerName: e.target.value})} required/>

                            <div className="row">
                            <div className="col-50">
                                <label >Email</label>
                                <input type="email" className='checkout-input form-control' name="email" onChange={(e) => setPostDataToOrder({ ...postDataToOrder, customerEmail: e.target.value})} required/>
                            </div>

                            <div className="col-50">
                                <label >Tlf.</label>
                                <input type="tel" className='checkout-input form-control' name="phone" onChange={(e) => setPostDataToOrder({ ...postDataToOrder, customerTlf: e.target.value})} required/>
                            </div>

                            </div>

                            <label><i className="fa fa-address-card-o"></i> Adresse</label>
                            <input type="text" className='checkout-input form-control' name="address" onChange={(e) => setPostDataToOrder({ ...postDataToOrder, address: e.target.value})} required/>

                            <div className="row">
                            <div className="col-50">
                                <label >By</label>
                                <input type="text" className='checkout-input form-control' name="city" onChange={(e) => setPostDataToOrder({ ...postDataToOrder, city: e.target.value})} required/>
                            </div>

                            <div className="col-50">
                                <label >Post nr.</label>
                                <input type="number" className='checkout-input form-control' name="zip" onChange={(e) => setPostDataToOrder({ ...postDataToOrder, zipCode: e.target.value})} required/>
                            </div>

                            </div>
                            <h3>VÆLG EN BETALINGSMETODE</h3>

                            <div className='payment-options'>
                                <div className='payment-option'>
                                    <input className="form-check-input" type="radio" name="radio" value={'MobilePay'} id="mobilepay" onChange={(e) => setPostDataToOrder({ ...postDataToOrder, paymentMethod: e.target.value })}  />
                                    <label htmlFor="MobilePay">
                                    <img className='payment-options-img' alt='' src={mobilePayLogo}/>
                                    </label>
                                </div>

                                <div className='payment-option'>
                                    <input className="form-check-input" type="radio" name="radio" value={'Faktura'} id="faktura" onChange={(e) => setPostDataToOrder({ ...postDataToOrder, paymentMethod: e.target.value })}  />
                                    <label htmlFor="Faktura">
                                    <img alt='' className='payment-options-img' src={invoiceLIcon}/>
                                    </label>
                                </div>
                            </div>

                            <label><i className="fa fa-address-card-o"></i> Kommentar</label>
                            <textarea type="text" maxLength="500" className='checkout-input' name="comment" onChange={(e) => setPostDataToOrder({ ...postDataToOrder, comment: e.target.value })} />

                        </div>
                    
                    </div>
                
                    <button type="submit" className="checkout-submit-btn btn" >Bekræfte Ordre</button>
                </Form>
            </div>
        </div>


        {/*Order List */}
        
        <div className="col-40">
        <div className="checkout-container container">
            <h4 className='cart-orders-title'>Ordreoversigt: {totalQuantity} produkt</h4>
            {displayProductsInCart}
            <div className='cart-orders-end'>
                <div className='cart-orders-end-content'>
                    <p className='cart-orders-VAT'>Moms</p>
                    <p className='cart-orders-VAT'>{totalVAT} kr.</p>
                </div>
                <div className='cart-orders-end-content'>
                    <p className='cart-orders-total'>Total DKK</p>
                    <p className='cart-orders-total'>{totalAmount} kr.</p>
                </div>
                
            </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default Checkout
