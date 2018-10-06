import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ schools, students, path })=> {
  const selected = (_path)=> {
    const style = {};
    if(_path === path){
      style.fontWeight = 'bold';
    }
    return style
  };

  return (
    <ul>
      <li style={ selected('/')}><Link to='/'>Home</Link></li>
      <li style={ selected('/createSchool') }><Link to='/createSchool'>Create School</Link></li>
      <li style={ selected('/createStudent') }><Link to='createStudent'>Create Student</Link></li>
      <li style={ selected('/schools')}><Link to='/schools'>Schools ({ schools.length })</Link></li>
      <li style={ selected('/students')}><Link to='/students'>Students ({ students.length })</Link></li>
    </ul>
  );
};

const mapStateToProps = ({ schools, students })=> {
  return {
    schools,
    students
  };
};
export default connect(mapStateToProps)(Nav);