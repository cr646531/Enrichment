const conn = require('./conn');
const Student = conn.define('student', {
  firstName: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: true
    }
  },
  gpa: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Student;
