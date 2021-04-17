import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import * as httpService from '../../Services/HttpService';
import './StudentDetaila.css';
class StudentDetails extends Component {
    state = { student: {} };
    constructor(props) {
        super(props);
        console.log(this.props);

        this.state = { id: props.match.params.id }
        console.log(this.state);
    }
    async componentDidMount() {
        const studentData = await httpService.getStudent(this.state.id);
        console.log(studentData);
        this.setState({ student: studentData });
        console.log(this.state);
    }
    async Delete(){
        const UpdatedStudentData = await httpService.DeleteStudent(this.state.id);
        console.log(UpdatedStudentData);
        this.setState({ student: UpdatedStudentData });
        console.log(this.state);

    }
    renderStudent() {
        if (this.state.student === undefined)
            return (<p class="card-text">Loading ...</p>)
        else {
            const imagePath = "http://localhost:3000/" + this.state.student.profileImg;
            return (
                <React.Fragment>
                    <div class="card" style={{ width: "18rem;" }}>
                        <img style={{ width: "300px" }} src={imagePath} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{this.state.student.username}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Email: {this.state.student.email}</h6>
                            <p class="card-text">Age: {this.state.student.age}</p>
                            <p class="card-text">City:  {this.state.student.city}</p>
                            <button class="btn btn-primary" onClick={()=>this.Delete()}>Delete</button>
                        </div>
                    </div>
                </React.Fragment>)
        }
    }
    render() {
        return (

            <div className="container">
                {this.renderStudent()}
            </div>

        );
    }
}

export default StudentDetails;