import { Component } from 'react';
import './Register.css';
import {connect} from 'react-redux'
import * as Actions from   '../store/Actions' ;
import * as httpService from '../Services/HttpService';
import parseJson from 'parse-json';

class Register extends Component {
    state = { _stud:{
        name:'',
        age:'',
        city:'',
        email:'',
        profileImg:''
    }}


    handleChange= (value)=> {
        this.setState(value);
        console.log(this.state._stud);
      };

       // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({_stud:{age:this.state._stud.age,city:this.state._stud.city,name:this.state._stud.name,email:this.state._stud.email,profileImg:event.target.files[0]}});
      
      };

       // File content to be displayed after
    // file upload is complete
    fileData = () => {
    
        if (this.state.selectedFile) {
           
          return (
            <div>
              <h2>File Details:</h2>
               
  <p>File Name: {this.state.selectedFile.name}</p>
   
               
  <p>File Type: {this.state.selectedFile.type}</p>

            </div>
          );
        } else {
          return (
            <div>
              <br />
              <h4>Choose before Pressing the Upload button</h4>
            </div>
          );
        }
      };



    render() {
        return (<div> <div className="container">
            
        <div>
            <h1>Students Form</h1>
            <form >
                <div>
                    <label >Name</label>
                    <input type="text" id="name"   value={this.state._stud.name} onChange={(e)=>this.handleChange({_stud:{name:e.target.value,city:this.state._stud.city,age:this.state._stud.age,email:this.state._stud.email,profileImg:this.state.profileImg}})}/>

                </div>
    
                <div>
                    <label >City</label>
                    <input type="text"  className="form-control" id="id"  name="student_id" value={this.state._stud.city} 
                    onChange={(e)=>this.handleChange({_stud:{city:e.target.value,name:this.state._stud.name,age:this.state._stud.age,email:this.state._stud.email}})}/>
 
                </div>
    
                <div>
                    <label >Age</label>
                    <input type="number"  className="form-control" id="age"name="stud_age" value={this.state._stud.age}
                    onChange={(e)=>this.handleChange({_stud:{age:e.target.value,city:this.state._stud.city,name:this.state._stud.name,email:this.state._stud.email,profileImg:this.state.profileImg}})}/>
            
                </div>

                <div>
                    <label >Email</label>
                    <input type="text"  className="form-control" id="email" name="stud_email" value={this.state._stud.email}
                    onChange={(e)=>this.handleChange({_stud:{email:e.target.value,city:this.state._stud.city,name:this.state._stud.name,age:this.state._stud.age,profileImg:this.state.profileImg}})}/>
            
                </div>
                 
                <div>
                <input type="file" onChange={this.onFileChange} />
                <p>{this.fileData()}</p>
                </div>
                 
                <input type="button"  disabled={this.state._stud.name==''&&this.state._stud.city==''&&this.state._stud.age==''&&this.state._stud.email==''} className="btn btn-success"  value="Submit" onClick={()=>{this.props.SubmitLogin(this.state._stud)}} />
                <input type="button" className="btn btn-default"  value="New Login" />
            </form>
        </div> 
    </div>
    
    </div>);
    }
}

const mapDispatchToProps  =dispatch=>{
    return{
        SubmitLogin:async (stud)=>{
            console.log("Submit Login",Actions);
           const body= await httpService.PostStudent(stud);
                console.log("body", body);
                dispatch({type:Actions.ADD,payload:{student:{...stud,id:body._id}}});
        }

    }
    

}


export default connect(null, mapDispatchToProps)(Register);