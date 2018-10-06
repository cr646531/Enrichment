import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({ students, schools })=> {
  let flag = 0;
  let counter = 0;

  return (
    <div>
      <h1>Students</h1>
        <ul>
          {
            students.map(student => {
              return (
                <div key={student.id}>
                    <li><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                    {
                      schools.map(school => {
                        if(student.schoolId === school.id){
                          return ( <p key={school.id} >{school.name}</p> )
                        } 
                        if(!student.schoolId && flag === 0) {
                          flag = 1;
                          counter++;
                          return ( <p key={0-school.id}>Homeschooled</p> )
                        }
                      })
                    }
                    </li>
                </div>
              )
              flag = 0;
            })
          }
        </ul>
    </div>
  );
}

// const mapDispatchToProps = (dispatch)=> {
//   return {
//     destroyUser: (user)=> dispatch(destroyUser(user)),
//     reset: ()=> dispatch(reset())
//   };
// };

const mapStateToProps = ({ students, schools })=> {
  return {
    students,
    schools 
  };
};

export default connect(mapStateToProps)(Students);