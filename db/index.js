const conn = require('./conn');
const School = require('./School');
const Student = require('./Student');

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        School.create({ name: 'Unenrolled', address: 'N/A' }),
        School.create({ name: 'North High School', address: '1 School Lane' }),
        School.create({ name: 'South High School', address: '2 School Lane' }),
      ])
      .then((schools) => {
        return Promise.all([
          Student.create({firstName: 'Bruce', lastName: 'Wayne', gpa: '4.0' })
            .then(bruce => bruce.setSchool(2))
            .then(() => {
              schools[1].update({ numStudents: schools[0].dataValues.numStudents + 1 })
            }),
          Student.create({firstName: 'Clark', lastName: 'Kent', gpa: '3.2'})
            .then(clark => clark.setSchool(3))
            .then(() => {
              schools[2].update({ numStudents: schools[1].dataValues.numStudents + 1 })
            }),
          Student.create({firstName: 'Barry', lastName: 'Allen', gpa: '2.8'})
            .then(barry => barry.setSchool(3))
            .then(() => {
              schools[2].update({ numStudents: schools[1].dataValues.numStudents + 1 })
            }),
          Student.create({firstName: 'Lois', lastName: 'Lane', gpa: '3.8'})
          .then(lois => lois.setSchool(1))
          .then(() => {
            schools[0].update({ numStudents: schools[1].dataValues.numStudents + 1 })
          }),
        ])
    });
  });
};

Student.belongsTo(School);


const findStudents = (id) => {
  Student.findAll({
    where: {
      schoolId: id
    }
  })
    .then(response => console.log(response))
}

module.exports = {
  models: {
    School,
    Student
  },
  syncAndSeed,
  findStudents
};
