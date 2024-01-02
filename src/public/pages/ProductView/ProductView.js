import './ProductView.css'
import { useState,useEffect} from 'react';
import makeRequest from '../../../data/fetch'
import { useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addToCart} from '../../../redux/cartReducer'
import Modal from 'react-bootstrap/Modal';
import {Link} from 'react-router-dom';

const ProductView = () => {
    const {productNumber} = useParams()
    const [mainImage, setMainImage] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [activeTab, setActiveTab] = useState('pruduct-details');
    const [quantity, setQuantity] = useState(1);
    const [subImage, setSubImage] = useState([]);
    const [data, setData] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        const settings = {
          method: "GET",
      };
        makeRequest(`category/products/items/productItemNumber/${productNumber}`, settings)
          .then((data) => {
            setMainImage(data.img)
            setSubImage(data.subImages)
            setData(data)
        })
          .catch((error) => console.error('Error fetching data:', error));
          
    }, [productNumber]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const newSubImages = [];

    newSubImages.push(data.img)
    subImage.map(item => {
        return newSubImages.push(item.subimageUrl)
        
    })

    
    const imageHover = (subImage) => {
        setMainImage(subImage);
      };
      
    const changeMainImage = newSubImages.map((subImage, counter) =>{
        counter++;
        return <div className='img-box' key={counter} onMouseEnter={() => imageHover(subImage)}><img className='slide' alt='' src={subImage} 
         onChange={() => imageHover(subImage)}/></div>
        
    })
    
  return (
    <>
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered 
    show={modalShow} onHide={()=>setModalShow(false)}>

      <Modal.Body>
        <h4 className='item-title'>Productet er tilføjet til kassen </h4>
        <p className='item-description'>
          Vil du fortsætte med at handle eller gå til kassen?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={()=>setModalShow(false)} className="add-order-btn btn btn-outline-success">Fortsæt med at handle</button>
        <Link to='/checkout'>
          <button type="button" onClick={()=>setModalShow(false)} className="add-order-btn btn btn-outline-success">Gå til kassen</button>
        </Link>
      </Modal.Footer>
    </Modal>
    <div className='product-view'>
        <div className='left'>
            <div className='main_image'>
                <img alt='' className='slide' id='main-img' src={mainImage}></img>
            </div>
            <div className='option flex'>
               {changeMainImage}
                
            </div>
        </div>
        <div className='right'>
            <h3 className='item-title'> {data.name}</h3>
           <div className='item-description'>{data.description}</div>
            <h3 className='item-price'>{data.price}.00 kr.</h3>
            <p>Inkl. montering</p>
            <div>
                <input defaultValue={quantity} type="number" className='order-quantity-input' onChange={(e) => setQuantity(e.target.value)} />
                <button type="button" className="add-order-btn btn btn-outline-success"
                onClick={()=> {dispatch(addToCart({
                  id: data.id,
                  title: data.name,
                  image: data.img,
                  productNr: data.productItemNumber,
                  price: data.price,
                  quantity: quantity,
                  totalPrice: data.price * quantity
                }))
                setModalShow(true)
                } }>Køb</button>
            </div>
        </div>
    </div>
    <div>
      <ul className=" nav nav-tabs" id="myTab" role="tablist">
        
        <li className="nav-item">
          <p
            className={`product-view-nav-tap nav-link ${activeTab === 'pruduct-details' ? 'active' : ''}`}
            aria-controls="pruduct-details"
            aria-selected={activeTab === 'pruduct-details'}
            onClick={() => handleTabClick('pruduct-details')}
          > Produkt Detaljer
             </p>
        </li>

        <li className="product-view-nav-item nav-item">
          <p
            className={`product-view-nav-tap nav-link ${activeTab === 'product-info' ? 'active'  : ''}`}
            aria-controls="product-info"
            aria-selected={activeTab === 'product-info'}
            onClick={() => handleTabClick('product-info')}
          >
            Produkt Info
          </p>
        </li>
        
      </ul>
      <div className="tab-content" id="myTabContent">
        
        <div className={`product-view-nav-tap-pane tab-pane fade ${activeTab === 'pruduct-details' ? 'show active' : ''}`} id="pruduct-details" role="tabpanel" aria-labelledby="pruduct-details-tab">
            <table className="table">
                <tbody>
                   
                    {data.serie !== null ? <tr>
                        <th>Serie</th>
                        <td>{data.serie} mm</td>
                    </tr> : null}

                    {data.color !== null ? <tr>
                        <th>Farve</th>
                        <td>{data.color} mm</td>
                    </tr> : null}

                    {data.type !== null ? <tr>
                        <th>Type</th>
                        <td>{data.type} mm</td>
                    </tr> : null}

                    {data.hight !== null ? <tr>
                        <th>Højde</th>
                        <td>{data.hight} mm</td>
                    </tr> : null}

                    {data.width !== null ? <tr>
                        <th>Bredde</th>
                        <td>{data.width} mm</td>
                    </tr> : null}

                    {data.depth !== null ? <tr>
                        <th>Dybde</th>
                        <td>{data.depth} mm</td>
                    </tr> : null}
                    
                </tbody>
            </table>
        </div>
        <div className={`product-view-nav-tap-pane tab-pane fade show ${activeTab === 'product-info' ? 'active' : ''}`} id="product-info" role="tabpanel" aria-labelledby="product-info-tab">
        ulvstående toilet med skjult S-lås fra Laufens nordiske serie, Kompas. Toilettet er udstyret med vandbesparende dobbeltskyl på 4,5/3 liter vand. Denne version kommer med Laufens særligt rengøringsvenlige ekstra lag af glasur, LCC, der forbliver aktiv hele toilettets levetid.
        </div>
      </div>
    </div>
    
    </>
  )
}

export default ProductView
