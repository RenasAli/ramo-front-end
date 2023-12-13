import './Footer.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import whiteLogo from '../../../assets/logo/logo-white.png';
import {Link} from 'react-router-dom';


const Footer = () => {
  return (
    <>
    <footer>

        
        <Row className='footer-row'>
          <Col>
            <img className='footer-logo footer-col-header' alt='' src={whiteLogo}></img>
            <p className='about-os'>
            Ramo MultiService er et nyt firma specialiseret i VVS-montering, elinstallationer og miljøvenlige services. Vi er dedikerede til at levere kvalitetsarbejde og pålidelige løsninger inden for disse områder.
            </p>
          </Col>

          <Col>
            <p className='footer-col-header'>Kontak Os</p>
            <p> Tlf: 28 19 96 97</p>
            <p> Email: ramo@ramomultiservice.dk</p>
            <p> CVR: 42 79 70 81</p>
          </Col>

          <Col>
          <p className='footer-col-header'>Links</p>
            <Link  className='footer-link' alt="" to='/'>
                <p >Home</p>
            </Link>
            <Link  className='footer-link' alt="" to='/bestil-vvser'>
                <p >BestilVVSer</p>
            </Link>
            <Link  className='footer-link' alt="" to='/checkout'>
                <p >Indkøbskurv</p>
            </Link>
          
          </Col>
        </Row>
  
 
      
    </footer>
    </>
  )
}

export default Footer
