import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import {NavLink as Link} from "react-router-dom";
class Navbar extends Component {
    
    render() { 
        return ( 

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
      
    <Link exact className="navbar-brand" to="/home">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
       
          <Link exact className="nav-link active" activeStyle={{color:'red'}} aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link exact className="nav-link"  activeStyle={{color:'red'}} to="/students">Students</Link>
        </li>
        <li className="nav-item">
       
          <Link exact className="nav-link"  activeStyle={{color:'red'}} to="/about">About</Link> 
        </li>
       
      </ul>
    </div>
  </div>
</nav>

         );
    }
}
 
export default Navbar;