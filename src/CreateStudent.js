import React from 'react'
import { connect } from 'react-redux'
import { createStudent } from './store'
import { Link } from 'react-router-dom'

class CreateStudent extends React.Component {

  constructor(){
    super()
    this.state = {
      firstName: 'first name',
      lastName: 'last name',
      gpa: 'gpa',
      schoolId: 1
    }
    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSave(event) {
    const { createStudent, students } = this.props
    const { firstName, lastName, gpa, schoolId } = this.state

    event.preventDefault()
    createStudent({
      firstName: firstName,
      lastName: lastName,
      gpa: gpa,
      schoolId: schoolId
    })
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  formChange(event){
    this.setState({
      schoolId: event.target.value
    })
    console.log("Change: ", this.state.schoolId);
  }

  render() {
    const { firstName, lastName, gpa, schoolId } = this.state
    const { schools } = this.props

    return (
      <div>
        <h1>Create Student</h1>
        <br />
        <br />
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
          <button>CreateStudent</button>
        </form>

        <div>
          <select value={this.state.schoolId} onChange={this.formChange}>
          {
            schools.map(school => {
              if(school.id === schoolId){
                return ( <option key={school.id} name='schoolId' value={schoolId} defaultValue>{school.name}</option> )
              }
            })
          }
          {
            schools.map(school => {
              if(school.id !== schoolId){
                return ( <option key={school.id} name='schoolId' value={schoolId}>{school.name}</option> )
              }
            })
          }
          </select>
        <br />
        <br />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    createStudent: (student) => { dispatch(createStudent(student)) },
  }
}

const mapStateToProps = ({schools, students}) => {
  return {
    schools,
    students
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent)