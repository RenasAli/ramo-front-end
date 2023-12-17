import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import './root.css'

import { Home,BestilVVSer ,OmOs, Products, Product, ProductView, Checkout } from './public/pages/index.js'
import { Container, Footer, Header} from './public/sections/index.js'
import {AdminContainer, AdminHeader} from './admin/sections/index.js'
import {AdminHome, Order, AdminProducts, Category, CreateNewCategory, CreateNewProduct,CreateProductItem, ProductItems, ProductItemView, OrderView, LogIn} from './admin/pages/index'
const App = () => {
    
    return (
        <>
            <Router basename='/app'>
                <Header />
                <Container>
                   <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/checkout' element={<Checkout/>}/>
                    <Route path='/bestil-vvser' element={<BestilVVSer/>}/>
                    <Route path='/om-os' element={<OmOs/>}/>
                    <Route path='/shop/:categoryUrl' element={<Products/>}/>
                    <Route path='shop/:categoryUrl/:productUrl' element={<Product/>}/>
                    <Route path='shop/:categoryUrl/:productUrl/:productNumber' element={<ProductView/>}/>
                    </Routes> 
                </Container>
                <Footer/>
            </Router>
            
            <Router basename='/admin'>
                 <AdminHeader />
                
                <AdminContainer>
                   <Routes>
                    <Route path='/' element={<AdminHome/>}/>
                    <Route path='/log-in' element={<LogIn/>}/>
                    <Route path='/order' element={<Order/>}/>
                    <Route path='/order/:orderNr' element={<OrderView/>}/>
                    <Route path='/products/items' element={<ProductItems/>}/>
                    <Route path='/products/items/view/:productItemNumber' element={<ProductItemView/>}/>
                    <Route path='/products/items/add-new-item' element={<CreateProductItem/>}/>
                    <Route path='/products' element={<AdminProducts/>}/>
                    <Route path='/products/add-new-product' element={<CreateNewProduct/>}/>
                    <Route path='/category' element={<Category/>}/>
                    <Route path='/category/add-new-category' element={<CreateNewCategory/>}/>
                    </Routes> 
                </AdminContainer>
            </Router>
        </>
    )
}

export default App