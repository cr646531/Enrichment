import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';


class Schools extends Component {

  render(){
    const { schools } = this.props;
    return (
      <div>
      <h1>Schools</h1>
      <ul>
        {
          schools.map((school) => (
              <li key={school.id} >
                <Link to={`/schools/${school.id}`}>{school.name} ({school.numStudents})</Link>
              </li>
          ))
        }
        <br />
        <br />
        <button><Link to={'/createStudent'}>Create a Student</Link></button>
      </ul>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    initSchool: (id)=> dispatch(loadSchool(id)),
  };
};

const mapStateToProps = ({ schools })=> {
  return {
    schools 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schools);