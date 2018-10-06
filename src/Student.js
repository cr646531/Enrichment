import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent } from './store';
import { deleteStudent } from './store';

class Student extends React.Component {
  
  constructor(){
    super()
    this.state = {
      id: 0,
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: 0
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.delete = this.delete.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentDidMount(){
    const {id, students} = this.props

    students.map(student => {
      if(student.id === id){
        this.setState({
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          gpa: student.gpa,
          schoolId: student.schoolId
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
    const { updateStudent } = this.props
    const { id, firstName, lastName, gpa, schoolId } = this.state

    event.preventDefault()
    if(id){
      updateStudent({
        id: id,
        firstName: firstName,
        lastName: lastName,
        gpa: gpa,
        schoolId: schoolId
      })
    }
  }

  delete(){
    const { deleteStudent } = this.props

    deleteStudent(this.state.id)
  }

  formChange(event){
    this.setState({
      schoolId: event.target.value
    })
  }

  render(){
    const { firstName, lastName, gpa, schoolId } = this.state;
    const { schools } = this.props;

    return (
      <div>
        <hr />
        <br />
        <div>
        <form onSubmit={this.onSave}>
          First Name:
          <input type='text' name='firstName' value={firstName} onChange={this.onChange} />
          <br />
          Last Name:
          <input type='text' name='lastName' value={lastName} onChange={this.onChange} />
          <br />
          GPA:
          <input type='text' name='gpa' value={gpa} onChange={this.onChange} />
          <br />
          <br />
          <button>Submit Changes</button>
        </form>
        </div>

        <div>
          <select value={this.state.schoolId} onChange={this.formChange}>
          {
            schools.map(school => {
              if(school.id === schoolId){
                return ( <option key={school.id} name='schoolId' value={school.id} defaultValue>{school.name}</option> )
              }
            })
          }
          {
            schools.map(school => {
              if(school.id !== schoolId){
                return ( <option key={school.id} name='schoolId' value={school.id}>{school.name}</option> )
              }
            })
          }
          </select>
        <br />
        <br />
        <button onClick={this.delete}>
          <Link to={'/students'}>Delete Student</Link>
        </button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: (student) => { dispatch(updateStudent(student)) },
    deleteStudent: (id) => { dispatch(deleteStudent(id)) },
  };
};

const mapStateToProps = ({ schools, students })=> {
  return {
    schools,
    students 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student)