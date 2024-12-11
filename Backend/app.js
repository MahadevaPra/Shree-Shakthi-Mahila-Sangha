// Import required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the Frontend folder
app.use(express.static(path.join(__dirname, '../Frontend')));

// Serve the logo for the header
app.get('/image/logo', (req, res) => {
  res.sendFile(path.join(__dirname, "../images/logo.jpg"));
});

// Routes for serving HTML pages
app.get('/ssms', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/main/index.html'));
});

app.get('/ssms/signin', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/Signin.html'));
});

app.get('/ssms/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/Signup.html'));
});

app.get('/ssms/forgot', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/Forgot.html'));
});

app.get('/ssms/intro', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/intro.html'));
});

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'ssms' // replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to MySQL Database');
});

// POST route to register a new user
app.post('/register', (req, res) => {
  const { Sanghaid, Name, phoneNumber, email, Password, ConfirmPassword } = req.body;

  // Check if password and confirm password match
  if (Password !== ConfirmPassword) {
    return res.status(400).send(`
      <script>
        alert('Passwords do not match');
        window.location.href = '/ssms/signup';
      </script>`);
  }

  // Insert data into the database
  const query = `INSERT INTO admin_info (S_id, User_id, Phone_num, Email, Password) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [Sanghaid, Name, phoneNumber, email, Password], (err, result) => {
    if (err) {
      console.error('Error inserting data: ', err);
      return res.status(500).send('Database error');
    }
    // Send success message
    res.status(200).send(`
      <script>
        alert('Registration successful!');
        window.location.href = '/ssms/signin';
      </script>`);
  });
});

// POST route for login
app.get('/ssms/login', (req, res) => {
  const { id, Password } = req.query;

  // Query to fetch user data
  const query = `SELECT User_id, Password FROM admin_info WHERE User_id = ? AND Password = ?`;

  // Execute the query
  db.query(query, [id, Password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Database error');
    }

    // Check if user exists and credentials match
    if (results.length === 0) {
      return res.status(401).send(`
        <script>
          alert("Invalid user details");
          window.history.back();
        </script>`);
    }

    // Login successful
    res.send(`
      <script>
        alert("Login Successful");
        window.location.href = '/ssms/intro'; // Redirect to intro page
      </script>`);
  });
});

// POST route for password reset
app.post('/ssms/forgot', (req, res) => {
  const { id, Password, cPassword } = req.body;

  if (Password !== cPassword) {
    return res.status(400).send(`
      <script>
        alert('Passwords do not match');
        window.history.back();
      </script>`);
  }

  const updateQuery = `UPDATE admin_info SET Password = ? WHERE User_id = ?`;

  db.query(updateQuery, [Password, id], (err, results) => {
    if (err) {
      console.error('Cannot update password:', err);
      return res.status(400).send(`
        <script>
          alert('Password cannot be changed, try after some time');
          window.location.href = '/ssms/signin';
        </script>`);
    }

    if (results.affectedRows === 0) {
      return res.status(404).send(`
        <script>
          alert('User not found');
          window.history.back();
        </script>`);
    }

    res.status(200).send(`
      <script>
        alert('Password changed successfully!');
        window.location.href = '/ssms/signin';
      </script>`);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('Click on link to open website: localhost:3000/ssms');
});