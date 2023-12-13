import {Link} from 'react-router-dom'
import './AdminHeader.css'

import logo from '../../../assets/logo/logoV7.png'


const AdminHeader = () => {
    return (
        <nav className="navbar navbar-expand-md " >
            <div className="container">
                <Link className="ramo-navbar-brand navbar-brand" to="/">
                <img className="logo" src={logo} alt="Site Logo"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="ramo-nav-link nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="ramo-nav-link nav-link" to="/order">Order</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="ramo-nav-link nav-link" to="/products/items">Product Items</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="ramo-nav-link nav-link" to="/products">Products</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="ramo-nav-link nav-link" to="/category">Category</Link>
                    </li>
                    <li className="ramo-nav-link nav-item dropdown">
                    <Link className="ramo-nav-link nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ex.
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link className="ramo-nav-dropdown dropdown-item" to="/">Action</Link></li>
                        <li><Link className="ramo-nav-dropdown dropdown-item" to="/">Another action</Link></li>
                        <li><hr className="ramo-nav-dropdown dropdown-divider" /></li>
                        <li><Link className="ramo-nav-dropdown dropdown-item" to="/">Something else here</Link></li>
                    </ul>
                    </li>
                    
                    
                </ul>
                
                </div>
            </div>
    </nav>
      
    )
}

export default AdminHeader