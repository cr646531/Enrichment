import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateSchool, deleteSchool, deleteStudent } from './store';


class School extends React.Component {

  constructor(){
    super()
    this.state = {
      id: 0,
      name: '',
      address: '',
      numStudents: 0
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidMount(){
    const {id, schools} = this.props

    schools.map(school => {
      if(school.id === id){
        this.setState({
          id: school.id,
          name: school.name,
          address: school.address,
          numStudents: school.numStudents
        })
      }
    })
  }

  onChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSave(event){
    const { updateSchool, students } = this.props
    const { id, name, address, numStudents } = this.state

    event.preventDefault()
    if(name){
      updateSchool({
        id: id,
        name: name,
        address: address,
        numStudents: numStudents
      })
    }
  }

  delete(){
    const { deleteSchool } = this.props
    if(this.state.id !== 1){
      deleteSchool(this.state.id)
    }
  }

  render(){
    const { name, address } = this.state;
    return (
      <div>
        <hr />
        <form onSubmit={this.onSave}>
          Name:
          <input type='text' name='name' value={name} onChange={this.onChange} />
          <br />
          Address:
          <input type='text' name='address' value={address} onChange={this.onChange} />
          <br />
          <button>Submit Changes</button>
        </form>
        <button onClick={this.delete}>
          <Link to={'/schools'}>Delete School</Link>
        </button>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (student) => { dispatch(deleteStudent(student)) },
    updateSchool: (school) => { dispatch(updateSchool(school)) },
    deleteSchool: (id) => { dispatch(deleteSchool(id)) },
  };
};

const mapStateToProps = ({ schools, students })=> {
  return {
    schools,
    students 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(School)