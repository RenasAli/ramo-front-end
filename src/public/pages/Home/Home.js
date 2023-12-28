import './Home.css';
import {Link} from 'react-router-dom';
import{Swiper} from '../../components/index';


const Home = () => {
  

  

  return (
    <>
     <Swiper/>  
    <div className='order-offer-content'>
      <Link to='/bestil-vvser'>
        <button type="button"
          className="order-offer-btn btn btn-outline-success">Bestil Gratis Tilbud</button>
        </Link>          
    </div>
   

        
        
    </>
  )
}



export default Home
