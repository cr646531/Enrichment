import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSchools, loadStudents } from './store';
import { Route, HashRouter as Router } from 'react-router-dom';
import Schools from './Schools';
import Students from './Students';
import Student from './Student';
import School from './School';
import CreateSchool from './CreateSchool'
import CreateStudent from './CreateStudent'
import Nav from './Nav';
import Add from './Add';

class App extends Component{
  componentDidMount(){
    this.props.initSchools();
    this.props.initStudents();
  }
  render(){
    const { schools, students } = this.props;
    return (
      <div>
        <Router>
          <div>
            <Route component={ ({ location })=> <Nav path={ location.pathname }/> } />
            <Route path='/schools' component={ Schools } />
            <Route path='/students' component={ Students } />
            <Route path='/schools/:id' render={ ({ match }) => <School id={ parseInt(match.params.id) } /> } />
            <Route path='/createSchool' component={ CreateSchool } />
            <Route path='/createStudent' component={ CreateStudent } />
            <Route path='/students/:id' render={ ({ match }) => <Student id={ parseInt(match.params.id) } /> } />
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    initSchools: ()=> { dispatch(loadSchools()) },
    initStudents: ()=> { dispatch(loadStudents()) },
  };
};

const mapStateToProps = ({ schools, students })=> {
  return {
    schools,
    students
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);