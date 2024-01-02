import {Link} from 'react-router-dom'
import './Card.css'
import { useParams  } from 'react-router-dom';
import {  useState } from 'react';


const Card = (props) => {
  const {categoryUrl,productUrl} = useParams()
  const [isHovered, setIsHovered] = useState(false);
  
  const handleCardHover = () =>{
    setIsHovered(true)
  }
  const handleMouseLeave = () =>{
    setIsHovered(false)
  }
  

  return (
    <>
    <div className='card-item'>
     <div className={`card-bg ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleCardHover} onMouseLeave={handleMouseLeave} >
       <img className={`card-img ${isHovered ? 'zoom-in' : ''}`} alt='' src={props.img} />
       <div className='card-content' >
            <Link  className='card-link' alt="" to={props.url}>
                <p className='product-title'>{props.title}</p>
            </Link>
            <p className='product-price'>{props.price}<span>,00 kr.</span><br/>
            <span>Inkl. montering</span>
            </p>
            
            <Link className='card-btn-link'  to={`/shop/${categoryUrl}/${productUrl}/${props.url}`}>
                <button type="button" className="card-btn btn btn-outline-success">KØB</button>
            </Link>
       </div>


     </div>
    </div>
    </>
  )
}


const GroupCard = (props) => {
  
  return (
    <>
    <div className='group-card-item'>
     <div className='group-card-bg'  >
       <img className='group-card-img' alt='' src={ props.img} />
       <div className='group-card-content' >
            <Link  className='group-card-link' alt="" to={`/${props.url}`} replace>
              
                <h4>{props.title}</h4>
            </Link>
       </div>
     </div>
    </div>
    </>
  )
}
export default Card
export {GroupCard }