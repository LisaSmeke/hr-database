const express = require('express');
const res = require('express/lib/response');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sqlpswd',
  database: 'nodemysql',
});

//Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected');
});

const app = express();

// Create Database
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send('Database Created');
  });
});

/////////// EMPLOYEE ///////////
// Create Employee Table
app.get('/createemployee', (req, res) => {
  let sql =
    'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), location_id VARCHAR(255) PRIMARY KEY(id))';
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send('Employee table created');
  });
});

// Insert employee
app.get('/employee1', (req, res) => {
  let post = { name: '', designation: '', location_id: '' };
  let sql = 'INSERT INTO employee SET ?';
  let query = db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send('Employee added');
  });
});

// Select employees
app.get('/getemployee', (req, res) => {
  let sql = 'SELECT * FROM employee';
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send('Employee details fetched');
  });
});

// Update employee
app.get('/updateemployee/:id', (req, res) => {
  let newName = '';
  let newDesignation = '';
  let sql = `UPDATE employee SET name = '${newName}', designation = '${newDesignation}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send('Employee updated');
  });
});

// Delete employee
app.get('/deleteemployee/:id', (req, res) => {
  let sql = `DELETE FROM employee WHERE id = ${req.params.id} `;
  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send('Employee deleted');
  });
});

/////////// LOCATION ///////////
// Create Location Table
app.get('/createlocations', (req, res) => {
  let sql =
    'CREATE TABLE locations(location_id int AUTO_INCREMENT, location VARCHAR(255), PRIMARY KEY(location_id))';
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send('Locations table created');
  });
});

// Insert location
app.get('/location', (req, res) => {
  let post = { location: '' };
  let sql = 'INSERT INTO locations SET ?';
  let query = db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send('Location added');
  });
});

// Select locations
app.get('/getlocations', (req, res) => {
  let sql = 'SELECT * FROM locations';
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send('Location details fetched');
  });
});

// Update location
app.get('/updatelocation/:id', (req, res) => {
  let newLocation = '';
  let sql = `UPDATE employee SET locations = '${newLocation}'' WHERE location_id = ${req.params.id}`;
  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send('Location updated');
  });
});

// Delete location
app.get('/deletelocation/:id', (req, res) => {
  let sql = `DELETE FROM locations WHERE location_id = ${req.params.id} `;
  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send('Location deleted');
  });
});

/////////// ALTER TABLES ///////////
//Add columns
app.get('/addcolumn', (req, res) => {
  let sql = `ALTER TABLE locations ADD address VARCHAR(255)`;
  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send('Location column added');
  });
});

app.listen('3020', () => {
  console.log('Server Started on port 3020');
});
