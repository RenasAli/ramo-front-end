import './Cart.css'
import {Link} from 'react-router-dom'
import { GiShoppingCart } from "react-icons/gi";
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector , useDispatch} from 'react-redux';
import {removeFromCart, resetCart, incrementQuantity,
     decrementQuantity,getTotalProducts} from '../../../redux/cartReducer'

const Cart = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    const dispatch = useDispatch()

    
    const products = useSelector(state => state.cart.products);
    const totalAmount = useSelector(state => state.cart.productsTotalAmount);
    const totalQuantity = useSelector(state => state.cart.productsTotalQuantity);
    
    

    useEffect(() => {
        dispatch(getTotalProducts())
        }, [ dispatch, products]);
      
    const displayProductsInCart = products.map(product =>{
        
        return <div className='offcanvas-order-body' key={product.id}>
                    <div className='offcanvas-body-top'>
                        <img alt='' src={product.image}/>
                        <p>{product.title}</p>
                    </div>
                    <div className='offcanvas-body-bottom'>
                        <div className='qantity-btn-wrap'>
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
                        <p className='offcanvas-price' >{product.totalPrice} kr.</p>
                        
                    </div>
                </div>   
    });
    
  return (
    <>
    <div className="cart-icon " onClick={toggleShow} ><GiShoppingCart /></div>
    
    <div className='cart-badge' >{totalQuantity}</div>
    <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h4 className='offcanvas-title'>Indkøbskurv</h4></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {products.length === 0 ? <div className='empity-cart'> Indkøbskurv er Tøm</div> : 
            <div className='offcanvas-body'>
                {displayProductsInCart}
                <div className='offcanvas-orders-end'>
                    <p className='offcanvas-orders-total'>Total DKK</p>
                    <p className='offcanvas-orders-total'>{totalAmount} kr.</p>
                </div>
                <div className='offcanvas-body-btn'>
                    
                    <Link to="/checkout" onClick={handleClose} className="add-new-btn btn btn-outline-success">Gå Til Kassen</Link>
                    
                    
                </div>
                <div className='offcanvas-body-btn'>
                    <button  className="add-new-btn btn btn-outline-success" onClick={() => dispatch(resetCart())}>Tøm indkøbskurv</button>
                </div>
            </div>
          }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Cart
