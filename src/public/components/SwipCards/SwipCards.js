import {Link} from 'react-router-dom'

import './SwipCards.css'

const SwipCards = (props) => {
  return (
    <>
         <div className='swiper-item'>
          <div className='card-wrapper'  >
            <Link  className='swiper-card-link' alt="" to={{pathname: props.url, state: "props.dataToSend"}}>
            <img className='card-img' alt='' src={props.img} />
            </Link>
          </div>
        </div>
    </>
  )
}

export default SwipCards
