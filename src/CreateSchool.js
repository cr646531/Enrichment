import React from 'react'
import { connect } from 'react-redux'
import { createSchool } from './store'

class CreateSchool extends React.Component {

  constructor(){
    super()
    this.state = {
      name: 'name',
      address: 'address',
      numStudents: 0
    }
    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSave(event) {
    const { createSchool, students, numStudents } = this.props
    const { name, address } = this.state

    event.preventDefault()
    createSchool({
      name: name,
      address: address,
      numStudents: numStudents
    })
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  render() {
    const {name, address} = this.state

    return (
      <div>
        <h1>Create School</h1>
        <br />
        <br />
        <form onSubmit={this.onSave}>
          Name:
          <input type='text' name='name' value={name} onChange={this.onChange} />
          <br />
          Address:
          <input type='text' name='address' value={address} onChange={this.onChange} />
          <br />
          <button>CreateSchool</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    createSchool: (school) => { dispatch(createSchool(school)) },
  }
}

const mapStateToProps = ({schools, students}) => {
  return {
    schools,
    students
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSchool)