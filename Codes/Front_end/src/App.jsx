import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './User/Products'; // Adjust the path as per your file structure
// Create MyCart component

// Import all other components as needed
import Login from './User/Login';
import Signup from './User/Signup';
import Unavbar from './User/Unavbar';
import Addbook from './Seller/Addbook';
import Myproducts from './Seller/Myproducts';
import Slogin from './Seller/Slogin';
import Book from './Seller/Book';
import Orders from './Seller/Orders';
import Uitem from './User/Uitem';
import Myorders from './User/Myorders';
import Uhome from './User/Uhome';
import OrderItem from './User/OrderItem';
import Shome from './Seller/Shome';
import Ssignup from './Seller/Ssignup';
import Home from './Componenets/Home'; // Adjust the path as per your file structure
import Alogin from './Admin/Alogin';
import Asignup from './Admin/Asignup';
import Ahome from './Admin/Ahome';
import Users from './Admin/Users';
import Seller from './Admin/Seller';
import Wishlist from './User/Wishlist';
import NonFiction from './User/NonFiction';
import Children from './User/Children';
import Literature from './User/Literature';
import History from './User/History';
import Comics from './User/Comics';
import EntranceExamBooks from './User/EntranceExamBooks';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path='/' element={<Home />} />

        {/* Admin */}
        <Route path='/alogin' element={<Alogin />} />
        <Route path='/asignup' element={<Asignup />} />
        <Route path='/ahome' element={<Ahome />} />
        <Route path='/users' element={<Users />} />
        <Route path='/sellers' element={<Seller />} />

        {/* Seller */}
        <Route path='/slogin' element={<Slogin />} />
        <Route path='/ssignup' element={<Ssignup />} />
        <Route path='/shome' element={<Shome />} />
        <Route path='/myproducts' element={<Myproducts />} />
        <Route path='/addbook' element={<Addbook />} />
        <Route path='/book/:id' element={<Book />} />
        <Route path='/orders' element={<Orders />} />

        {/* User */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/nav' element={<Unavbar />} />
        <Route path='/uhome' element={<Uhome />} />
        <Route path='/uproducts' element={<Products />} />
        <Route path='/uitem/:id' element={<Uitem />} />
        <Route path='/orderitem/:id' element={<OrderItem />} />
        <Route path='/myorders' element={<Myorders />} />
        <Route path='/wishlist' element={<Wishlist />} />
        
        {/* Categories */}
        <Route path='/non-fiction' element={<NonFiction />} />
        <Route path='/children' element={<Children />} />
        <Route path='/literature' element={<Literature />} />
        <Route path='/history' element={<History />} />
        <Route path='/comics' element={<Comics />} />
        <Route path='/entrance-exam' element={<EntranceExamBooks />} />

        
        
        {/* Add more routes as needed */}
      

      </Routes>
    </Router>
  );
}

export default App;
