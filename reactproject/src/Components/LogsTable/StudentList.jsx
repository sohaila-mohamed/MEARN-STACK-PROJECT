import React, { Component } from 'react';
import'./StudentList.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import {connect} from 'react-redux';
import {NavLink as Link} from "react-router-dom";


class LogsTable extends Component {

  handleClick(id) {
        this.props.history.push("/student/details/"+id);
      }
   
    render() { 
        return ( 
<React.Fragment>
    


<div className="container">
    
    <table className="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">city</th>
            </tr>
            
        </thead>
        <tbody>
           
            {  this.props.studentList.map((log,i) => {
               
               return(          
                <tr key={i} >
                <th scope="row">{i}</th>
                <td style={{cursor:"pointer"}} onClick={()=>{this.handleClick(log.id)}}>{log.name}</td>
                <td>{log.email}</td>
                <td>{log.age}</td>
                <td>{log.city}</td>
               </tr> 
           )})} 
                   
            
        </tbody>
    </table>
</div>
</React.Fragment>

         );
    }
}
const mapStateToProps =state=>{
    return{
        studentList:state.students
    }
}
export default connect (mapStateToProps)(LogsTable);