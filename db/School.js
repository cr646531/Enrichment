const conn = require('./conn');
const School = conn.define('school', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: conn.Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  numStudents: {
    type: conn.Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
});

module.exports = School;
