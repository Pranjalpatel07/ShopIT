import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Disclaimer from './pages/Disclaimer.jsx'
import Return from './pages/ReturnPolicy.jsx'
import ProductDetail from './pages/productDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import Profile from './pages/Profile.jsx'
import Admin from './Admin/AdminDashboard.jsx'
import AddProduct from './Admin/AddProduct.jsx'
import ManageProducts from './Admin/AdminProducts.jsx'
import EditProduct from './Admin/EditProducts.jsx'
import AdminOrders from './Admin/AdminOrders.jsx'
import AdminUsers from './Admin/AdminUsers.jsx'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">

      <Navbar />

        <main className="grow">
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/register' element={<Register/>}/>

        <Route path='/login' element={<Login/>}/>

        <Route path='/products/:id' element={<ProductDetail/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/ordersuccess' element={<OrderSuccess/>}/>

        <Route path='/profile' element={<Profile/>}/>

        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin/add-product' element={<AddProduct/>}/>
        <Route path='/admin/products/' element={<ManageProducts/>}/>
        <Route path='/admin/edit-product/:id' element={<EditProduct/>}/>
        <Route path='/admin/orders' element={<AdminOrders/>}/>
        <Route path='/admin/users' element={<AdminUsers/>}/>


        
        
        <Route path='/about' element={<About />} />
        <Route path='/disclaimer' element={<Disclaimer/>}/>
        <Route path='/return' element={<Return/>}/>

      </Routes>
        </main>


      <Footer />
      </div>
    </Router>
  )
}

export default App
