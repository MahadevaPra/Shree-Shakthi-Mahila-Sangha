// Import required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

// Initialize Express app
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Specify the directory for your views
app.set('views', path.join(__dirname, '../views'));

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the Frontend folder
app.use('/ssms', express.static(path.join(__dirname, '../Frontend')));

app.get('/image/logo', (req, res) => {
  res.sendFile(path.join(__dirname, "../images/logo.jpg"));
});

app.use('/image', express.static(path.join(__dirname, '../images')));

app.get('/image/image2',(req,res) => {
  res.sendFile(path.join(__dirname,"../images/image2.jpg"));
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
 
app.get('/ssms/add-members', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/add-members.html'));
});

app.get('/ssms/helpdesk', (req, res) => {
  res.render('help');
});

app.get('/ssms/logout', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
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
        window.location.href = '/ssms/intro';
      </script>
    `);    
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

app.post('/ssms/add-members', (req, res) => {
  // Destructure form data
  const { 'member-id': memberId, name, savings, loan, 'acc-no': accNo } = req.body;

  // Validate input data
  if (!memberId || !name || savings === undefined || loan === undefined || !accNo) {
    return res.status(400).send(`
      <script>
        alert('All fields are required.');
        window.history.back();
      </script>
    `);
  }

  // Parse numeric fields
  const parsedSavings = parseFloat(savings);
  const parsedLoan = parseFloat(loan);

  // Query to insert the new member
  const query = `INSERT INTO members (Mem_id, Name, Savings, Loan, Ac_number) VALUES (?, ?, ?, ?, ?)`;

  // Execute query
  db.query(query, [memberId, name, parsedSavings, parsedLoan, accNo], (err, result) => {
    if (err) {
      console.error('Error adding member to the database:', err);
      return res.status(500).send(`
        <script>
          alert('Database error. Please try again later.');
          window.history.back();
        </script>
      `);
    }

    res.send(`
      <script>
        alert('Member added successfully!');
        window.location.href = '/ssms/add-members';
      </script>
    `);
  });
});


// Route to fetch and display all members
// app.get('/ssms/member', (req, res) => {
  app.get('/members', (req, res) => {

  // Query to fetch all members from the members table
  const query = 'SELECT * FROM members';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching members:', err);
      return res.status(500).send('Database error. Please try again later.');
    }

    // Render the members page with the fetched members
    res.render('members', { members: result });
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/ssms/add-money', (req, res) => {
  const query = 'SELECT * FROM members';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching members:', err);
      return res.status(500).send('Database error. Please try again later.');
    }
    res.render('add_money', { members: result });
  });
});


app.post('/ssms/addmoney', (req, res) => {
  const { memberId, savingsUpdate, loanUpdate } = req.body;

  // Check if all fields are provided and are valid
  if (!memberId || !savingsUpdate || !loanUpdate || memberId.length !== savingsUpdate.length || memberId.length !== loanUpdate.length) {
    console.error('Invalid data:', { memberId, savingsUpdate, loanUpdate });
    return res.status(400).send('Invalid input data.');
  }

  const currentDate = new Date(); // Get current DateTime

  // Convert current date into MySQL compatible format (YYYY-MM-DD HH:MM:SS)
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  // Loop through the member IDs and update them one by one
  for (let i = 0; i < memberId.length; i++) {
    const member = memberId[i];
    const savings = parseFloat(savingsUpdate[i]) || 0;
    const loan = parseFloat(loanUpdate[i]) || 0;

    // Update Query to Set saved_at and loan_given_at
    const updateQuery = `
        UPDATE members
        SET Savings = Savings + ?, Loan = Loan - ?, saved_at = ?, loan_given_at = ?
        WHERE Mem_id = ?`;

    db.query(updateQuery, [savings, loan, formattedDate, formattedDate, member], (err, result) => {
      if (err) {
        console.error('SQL Error:', err.sqlMessage);
        return res.status(500).send('Database error. Please try again later.');
      }

      // After all updates are done, fetch updated totals
      if (i === memberId.length - 1) {  // Ensure totals are only fetched once after all updates
        const totalQuery = `
            SELECT 
                COUNT(*) AS totalMembers, 
                SUM(Savings) AS totalSavings, 
                SUM(Loan) AS totalLoans 
            FROM members`;

        db.query(totalQuery, (err, totals) => {
          if (err) {
            console.error('Error fetching totals:', err);
            return res.status(500).send('Database error while fetching totals.');
          }

          const { totalMembers, totalSavings, totalLoans } = totals[0];

          const tQuery = `
              INSERT INTO s_total (T_members, T_money, T_loan)
              VALUES (?, ?, ?)
              ON DUPLICATE KEY UPDATE 
                  T_members = VALUES(T_members),
                  T_money = VALUES(T_money),
                  T_loan = VALUES(T_loan)`;

          db.query(tQuery, [totalMembers, totalSavings, totalLoans], (err) => {
            if (err) {
              console.error('Error updating s_total:', err);
              return res.status(500).send('Database error while updating totals.');
            }

            // Redirect to refresh the page with updated data
            res.redirect('/ssms/add-money');
          });
        });
      }
    });
  }
});


app.get('/ssms/intro', (req, res) => {
  // Query to fetch member summary data
  const query = `
      SELECT 
          COUNT(*) AS totalMembers, 
          SUM(Savings) AS totalSavings, 
          SUM(Loan) AS totalLoans 
      FROM members
  `;
  
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching summary data:', err);
          return res.status(500).send('Database error. Please try again later.');
      }

      const { totalMembers, totalSavings, totalLoans } = results[0];

      res.render('intro', {
          totalMembers: totalMembers || 0,
          totalSavings: totalSavings || 0,
          totalLoans: totalLoans || 0
      });
  });
});


app.get('/ssms/history', (req, res) => {
  // Fetch the members with their creation date
  const query1 = 'SELECT * FROM members ORDER BY created_at DESC'; 

  db.query(query1, (err, membersResult) => {
    if (err) {
      console.error('Error fetching members:', err);
      return res.status(500).send('Database error. Please try again later.');
    }

    // Fetch the transaction details from members (where saved_at or loan_given_at is not null)
    const query2 = `
      SELECT Mem_id, Name, Savings, Loan, saved_at, loan_given_at
      FROM members
      WHERE saved_at IS NOT NULL OR loan_given_at IS NOT NULL
      ORDER BY saved_at DESC, loan_given_at DESC;
    `;

    db.query(query2, (err, transactionsResult) => {
      if (err) {
        console.error('Error fetching transaction history:', err);
        return res.status(500).send('Database error. Please try again later.');
      }

      // Pass the members and transaction data to the EJS view
      res.render('history', { 
        members: membersResult,
        transactions: transactionsResult
      });
    });
  });
});

app.post('/submit-feedback', (req, res) => {
  const userId = req.body.user_id; // Get user_id from session or request
  const feedbackText = req.body.feedback;
  const problemText = req.body.problem;

  const query = `INSERT INTO user_feedback (user_id, feedback_text, problem_text) VALUES (?, ?, ?)`;

  db.query(query, [userId, feedbackText, problemText], (err, result) => {
      if (err) {
          console.error('Error inserting feedback:', err);
          return res.status(500).send('Failed to save feedback.');
      }
      res.send('Feedback submitted successfully!');
      res.redirect('/ssms/intro');
  });
});
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('Click on link to open website: localhost:3000/ssms');
});