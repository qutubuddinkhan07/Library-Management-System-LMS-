# Library Management System (LMS)

This is a simple Library Management System (LMS) built using Node.js, Express, and EJS for the front-end. The system supports user authentication, book management (add/remove), and a member dashboard for borrowing/returning books.

### Features
* Admin Panel: Manage books, view user details, and remove users if no books are borrowed.
* Member Panel: Borrow and return books, view borrowed book details.
* Book Inventory: Add and remove books from the system (admin-only).
* User Management: Admin can view user details and remove users (if they have not borrowed any books).
---

### Table of Contents
* Prerequisites
* Installation
* Run Locally
* Usage
* Folder Structure
* License
---

### Prerequisites
Before you begin, ensure you have the following installed:

* Node.js: You need Node.js to run the backend server. Download and install it from here.
* npm: Node package manager (npm) is included with Node.js, but make sure it's updated by running npm install -g npm.
---

### Installation
* Clone the repository:
* 
Open a terminal (or command prompt) and run the following command to clone this repository:
**git clone https://github.com/yourusername/LMS.git**

* Navigate to the project directory:

After cloning the repository, go into the project folder:
**cd LMS**

### Install dependencies:

The next step is to install the required dependencies for the project. Run the following command in the terminal:
**npm install**

This will install all the necessary packages listed in package.json.
---

### Run Locally
Once all dependencies are installed, you can start the server locally.

* Start the server:

Run the following command to start the application:
**npm run dev**

Alternatively, if you are using the standard Node.js command (without nodemon), run:
**node server.js**

*Access the application:

Open a browser and go to http://localhost:3000. You should be able to see the login or signup page.
---

# Usage
1. Login & Signup
* Login: Users can log in using their credentials (username and password).
* Signup: New users can sign up with their name, contact, and password.

2. Admin Dashboard
* Admins can view and manage the book inventory.
* Admins can add or remove books (if no member has borrowed the book).
* Admins can view all users and their borrowed books.
* Admins can remove users if they have not borrowed any books.

3. Member Dashboard
* Members can view the book inventory, borrow available books, and see the details of their borrowed books.

4. Book Borrowing and Returning
* Members can borrow books if available and return them once they are done.
---

### Folder Structure
The repository has the following structure:

LMS/
│
├── public/                    # Static files (CSS, JS)
│   ├── css/                   # Stylesheets
│   └── js/                    # JavaScript files
│
├── views/                     # EJS templates for rendering HTML
│   ├── admin.ejs              # Admin dashboard page
│   ├── members.ejs            # Member dashboard page
│   └── index.html             # Login/Signup page
│
├── server.js                  # Main server file (Node.js)
├── package.json               # Project dependencies and scripts
└── README.md                  # This file
---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Feel free to update the instructions and links as needed. Let me know if you need any further customization or clarifications!
