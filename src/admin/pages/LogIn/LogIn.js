import './LogIn.css'
import makeRequest from '../../../data/fetch'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";


const LogIn = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({});

  

  const logInHandle = async() => {
    const settings = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    };
     makeRequest('user/login', settings)
    .then(async (data) => {
        setPostData(await data)
        localStorage.setItem( 'token', await data.token)
        navigate('/')
    })
    .catch((error) => console.error('Error fetching data:', error));
    
}
  



  return (
   <>
    <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            
            <div className="card my-5">
            <h4 className='text-center text-dark mt-5'> Ramo MultiService Log In</h4>
              <div className="card-body cardbody-color p-lg-5">
                <div className="text-center user-Icon">
                <FaUserCircle />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control"  aria-describedby="emailHelp"
                    placeholder="User Name" onChange={(e) => setPostData({ ...postData, username: e.target.value })}/>
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="password" onChange={(e) => setPostData({ ...postData, userPassword: e.target.value })}/>
                </div>
                <div className="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100" onClick={logInHandle}>Login</button></div>
              </div>
            </div>

          </div>
        </div>
      </div>
   </>
  )
}

export default LogIn
