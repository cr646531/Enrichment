const path = require('path');
const express = require('express');
const db = require('./db');
const { School, Student } = db.models;

const app = express();
app.use(require('body-parser').json());

const port = process.env.PORT || 3000;

app.use('/dist', express.static(path.join(__dirname, 'dist')));

const index = path.join(__dirname, 'index.html');

app.get('/', (req, res)=> res.sendFile(index));

app.get('/api/schools', (req, res, next)=> {
  School.findAll()
    .then( schools => res.send(schools))
    .catch(next);
});

app.get('/api/schools/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => res.send(school))
    .catch(next);
});

app.post('/api/schools', (req, res, next)=> {
  School.create(req.body)
    .then( school => res.status(201).send(school))
    .catch(next);
});

app.put('/api/schools/:id', (req, res, next)=> {
  School.findById(req.params.id)
    .then( school => school.update(req.body))
    .then( school => res.send(school))
    .catch(next);
});

app.delete('/api/schools/:id', (req, res, next)=> {
  School.findById(req.params.id)
    .then( school => school.destroy())
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.get('/api/students', (req, res, next)=> {
  Student.findAll()
    .then( students => res.send(students))
    .catch(next);
});

app.post('/api/students', (req, res, next)=> {
  Student.create(req.body)
    .then( student => res.status(201).send(student))
    .catch(next);
});

app.put('/api/students/:id', (req, res, next)=> {
  Student.findById(req.params.id)
    .then( student => student.update(req.body))
    .then( student => res.send(student))
    .catch(next);
});

app.delete('/api/students/:id', (req, res, next)=> {
  Student.findById(req.params.id)
    .then( student => student.destroy())
    .then( () => res.sendStatus(204))
    .catch(next);
});

//app.listen(port, ()=> console.log(`listening on port ${port}`));

db.syncAndSeed();

app.use((err, req, res, next)=> {
  res.status(500).send({ error: err.message });
});
