import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Route,Switch } from "react-router-dom";
import './App.css';
import Register from './Components/Register';
import Navbar from './Components/Navbar/Navbar';
import LogsTable from './Components/LogsTable/StudentList';
import StudentDetails from './Components/StudentDetails/StudentDetails';

const App = () => {
  return ( 
      <React.Fragment>
          <main >
              <BrowserRouter>
              <Navbar></Navbar>
              <Switch>
                  <Route path='/home' component={Register}></Route>   
                  <Route path='/students' component={LogsTable}></Route> 
                  <Route path='/student/details/:id' component={StudentDetails}></Route>         
                  <Route path='*' component={Register}></Route>
                  
              </Switch>
              </BrowserRouter>
          </main>
         
      </React.Fragment>  
  )
}

export default App;