<<<<<<< HEAD
# Shree-Shakthi-Mahila-Sangha
This is a web development project made to help women to digitalise their Mahila Sangha , Which helps to keep their records safe and adding money or taking loan from their bank to digital, which reduces the manual paper work and also ensures the security of their money.
=======
Stree Shakti Mahila Sangha

Overview
This project is a web application developed to support women’s self-help groups by managing activities and resources efficiently.

Prerequisites
Before running this project, ensure you have the following installed on your system:

Visual Studio Code (VSCode) - Download VSCode,
Node.js - Download Node.js,
XAMPP (or any server with phpMyAdmin) - Download XAMPP
Steps to Set Up and Run the Project
1. Clone or Download the Project
Download the project files and extract them to a desired location on your computer.

2. Install Required Packages
Open VSCode and navigate to the project folder.
Launch the terminal (Ctrl+or go toView > Terminal`).
Navigate to the backend folder:
Copy code
cd shree-shakti-sangha/backend  
Run the following command to install the required packages:
Copy code
npm install express mysql2 bcrypt path body-parser ejs  

3. Set Up the Database
Open phpMyAdmin (usually available at http://localhost/phpmyadmin).
Create a new database:
Copy code
Name: ssms  
Import the SQL file located in the backend folder:
Go to the "Import" tab in phpMyAdmin.
Choose the SQL file from the backend folder of the project.
Click Go to execute the import.

4. Start Apache and MySQL Servers
Open your XAMPP control panel.
Start the Apache and MySQL servers.

5. Run the Project
In the terminal, navigate to the backend folder again if not already there:
Copy code
cd shree-shakti-sangha/backend  
Start the application by running:
Copy code
node app.js  

6. Access the Application
After running app.js, a link will be generated in the terminal (e.g., http://localhost:3000).
Open the link in your web browser to access the application.

Notes
Ensure that your Apache and MySQL servers are running while using the application.
If you face any issues, double-check the database setup and ensure all packages are correctly installed.
>>>>>>> d4bcd1d98f88306fb3fb94c92a9a042fbc417e6e
