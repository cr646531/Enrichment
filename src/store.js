import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger'
import thunk from 'redux-thunk';
import axios from 'axios'

//--------------------------------------------------------------------

const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL';
const DELETE_SCHOOL = 'DELETE_SCHOOL';
const CREATE_SCHOOL = 'CREATE_SCHOOL';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const CREATE_STUDENT = 'CREATE_STUDENT';


//--------------------------------------------------------------------

const schoolsReducer = (state = [], action) => {
  switch(action.type) {
    case LOAD_SCHOOLS:
      state = action.schools;
      break;
    case UPDATE_SCHOOL:
      state = state.map(school => school.id === action.school.id ? action.school : school );
      break;
    case DELETE_SCHOOL:
      state = state.filter(school => (school.id !== action.id));
      break;
    case CREATE_SCHOOL:
      state = state.push(action.school);
      break;
  }
  return state;
};

const studentReducer = (state = [], action) => {
  switch(action.type) {
    case LOAD_STUDENTS:
      state = action.students;
      break;
    case DELETE_STUDENT:
      state = state.filter(student => student.id !== action.id);
      break;
    case UPDATE_STUDENT:
      state = state.map(student => student.id === action.student.id ? action.student : student );
      break;
    case CREATE_STUDENT:
      state = state.push(action.student);
      break;
  }
  return state;
};

const reducer = combineReducers({
  schools: schoolsReducer,
  students: studentReducer
});

export default createStore(reducer, applyMiddleware(thunk, loggerMiddleware));

//--------------------------------------------------------------------

const _loadSchools = (schools)=>({
  type: LOAD_SCHOOLS,
  schools
});

const _updateSchool = (school) => ({
  type: UPDATE_SCHOOL,
  school
});

const _deleteSchool = (id) => ({
  type: DELETE_SCHOOL,
  id
});

const _createSchool = (school) => ({
  type: CREATE_SCHOOL,
  school
});

const _loadStudents = (students) => ({
  type: LOAD_STUDENTS,
  students
});

const _deleteStudent = (id) => ({
  type: DELETE_STUDENT,
  id
});

const _updateStudent = (student) => ({
  type: UPDATE_STUDENT,
  student
});

const _createStudent = (student) => ({
  type: CREATE_STUDENT,
  student
});

//--------------------------------------------------------------------

export const loadSchools = ()=> {
  return (dispatch)=> {
    return axios.get('/api/schools')
      .then( response => response.data)
      .then( schools => {
        dispatch(_loadSchools(schools))
      }); 
  }
};

export const updateSchool = (school) => {
  return (dispatch) => {
    return axios.put(`/api/schools/${school.id}`, school)
      .then(response => response.data)
      .then(school => {
        dispatch(_updateSchool(school))
      });
  }
};

export const deleteSchool = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/schools/${id}`)
      .then(() => dispatch(_deleteSchool(id)))
  };
};

export const createSchool = (school) => {
  return (dispatch) => {
    return axios.post(`/api/schools/`, school)
      .then(response => response.data)
      .then(school => {
        dispatch(_createSchool(school))
    });
  }
};

export const createStudent = (student) => {
  return (dispatch) => {
    return axios.post(`/api/students`, student)
      .then(response => response.data)
      .then(student => {
        dispatch(_createStudent(student))
      });
  };
};

export const loadStudents = () => {
  return (dispatch) => {
    return axios.get('/api/students')
    .then( response => response.data )
    .then ( students => {
      dispatch(_loadStudents(students))
    });
  }
};

export const deleteStudent = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/students/${id}`)
      .then(() => dispatch(_deleteStudent(id)))
  };
};

export const updateStudent = (student) => {
  return (dispatch) => {
    return axios.put(`/api/students/${student.id}`, student)
      .then(response => response.data)
      .then(student => {
        dispatch(_updateStudent(student))
      });
  }
};

