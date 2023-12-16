import './AdminContainer.css'
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';


const AdminContainer = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      
      navigate('/log-in');
    }
  }, [navigate]);

  return (
    <div className='container'>
        {props.children}
    </div>
  )
}

export default AdminContainer
