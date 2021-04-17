import parseJson from "parse-json";
import axios from 'axios';
const NodeHost = "http://localhost:3000/";

export const getStudent = async(id) => {
    const { data } = await axios.get(NodeHost + 'getUsers/' + id)
    return data[0];
};

export const PostStudent = async(student) => {
    console.log("studentHTTP", student);
    const _stud = new FormData();
    _stud.append('name', student.name);
    _stud.append('age', student.age);
    _stud.append('city', student.city);
    _stud.append('email', student.email);
    _stud.append('profileImg', student.profileImg);
    const { data } = await axios.post(NodeHost + "log", _stud);
    console.log("data", data);
    return data;
}

export const DeleteStudent = async(id) => {

    const { data } = await axios.delete(NodeHost + "delete/" + id);
    console.log("data", data);
    return data;
}