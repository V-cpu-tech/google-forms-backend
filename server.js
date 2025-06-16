const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL credentials (update as per your config)
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'mysql@2025',
  database: 'interview_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

app.post('/api/store', (req, res) => {
  const {
    timestamp, firstName, lastName, gender, dob,
    email, phone, address, experience,
    interviewMode, interviewDate, role
  } = req.body;

  const sql = `INSERT INTO interview_form
    (timestamp, firstName, lastName, gender, dob, email, phone, address, experience, interviewMode, interviewDate, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    timestamp, firstName, lastName, gender, dob,
    email, phone, address, experience,
    interviewMode, interviewDate, role
  ], (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).send("Error saving to DB");
    }
    res.send("Data stored in MySQL successfully");
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
