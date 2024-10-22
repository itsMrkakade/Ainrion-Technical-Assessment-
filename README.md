# Ainrion-Technical-Assessment-
Ainrion Technical Assessment 
# Book Management Application

This is a simple Book Management Application that allows users to perform CRUD (Create, Read, Update, Delete) operations on a collection of books. The backend is built using Node.js, Express, and MySQL, while the frontend is developed using React.

## Features
- List all books
- Add a new book
- Update book details
- Delete a book
- Basic validation and user-friendly alerts

## Technologies Used

### Backend:
- Node.js
- Express.js
- MySQL
- dotenv
- CORS

### Frontend:
- React
- Axios (for API calls)
- SweetAlert2 (for alerts)

## Prerequisites

Before running the application, ensure you have the following installed:
- **Node.js** (version >= 14.x.x)
- **MySQL** database
- **npm** (comes with Node.js)
  
## Backend Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/itsMrkakade/Ainrion-Technical-Assessment-.git
cd Ainrion-Technical-Assessment
Step 2: Setup the Environment Variables
Create a .env file in the backend directory with the following environment variables:

makefile .env in Backend

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=item_list_app


Step 3: Install Backend Dependencies
Navigate to the backend folder and install the dependencies:

bash

cd Backend
npm install

Step 4: Setup the MySQL Database
Open MySQL Workbench or any MySQL client and create a new database:

sql
Copy code
CREATE DATABASE item-;
Create a books table with the following structure:

sql
Copy code
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  year INT
);

FrontEnd SetUp
cd Frontend
cd ainrion-technical-assessment

npm install
npm install axios sweetalert2
npm start



