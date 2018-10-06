// const conn = require('./conn');
// const Student = conn.define('student', {
//   firstName: {
//     type: conn.Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       notEmpty: true
//     }
//   },
//   lastName: {
//     type: conn.Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       notEmpty: true
//     }
//   },
//   gpa: {
//     type: conn.Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       notEmpty: true
//     }
//   }
// });

// const School = conn.define('school', {
//   name: {
//     type: conn.Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       notEmpty: true
//     }
//   },
//   address: {
//     type: conn.Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       notEmpty: true
//     }
//   }
// });

// Student.hasOne(School);

// module.exports = { Student, School };