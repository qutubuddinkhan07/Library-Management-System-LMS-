const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("view engine", "ejs");

// In-memory databases
const users = [
    { id: 1, username: "admin", password: "admin123", role: "admin" },
];
const books = [
    { id: 1, title: "1984", author: "George Orwell", available: true },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", available: true },
];
const borrowedBooks = []; // { userId, bookId }

// Helper Functions
const findUser = (username) => users.find((u) => u.username === username);
const isBookBorrowed = (bookId) => borrowedBooks.some((b) => b.bookId === bookId);

// Routes

// Serve the login/signup page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        if (user.role === "admin") {
            res.json({ success: true, redirectTo: "/admin" });
        } else {
            res.json({ success: true, redirectTo: "/members", userId: user.id });
        }
    } else {
        res.json({ success: false, message: "Invalid credentials" });
    }
});

// Handle Signup
app.post("/signup", (req, res) => {
    const { name, contact, password } = req.body;

    if (name && contact && password) {
        const existingUser = users.find(
            (u) => u.username === name || u.contact === contact
        );
        if (existingUser) {
            return res.json({ success: false, message: "User already exists!" });
        }
        const newUser = {
            id: users.length + 1,
            username: name,
            contact,
            password,
            role: "member",
        };
        users.push(newUser);
        res.json({ success: true, redirectTo: "/members", userId: newUser.id });
    } else {
        res.json({ success: false, message: "All fields are required" });
    }
});

// Admin Page
app.get("/admin", (req, res) => {
    const admin = users.find((u) => u.role === "admin");
    if (!admin) {
        return res.status(403).send("Access denied");
    }

    // Get any messages or errors passed in the query
    const message = req.query.message || null;
    const error = req.query.error || null;

    res.render("admin", { users, books, borrowedBooks, message, error });
});


// Members Page
app.get("/members", (req, res) => {
    const { userId } = req.query;
    const user = users.find((u) => u.id == userId && u.role === "member");
    if (!user) {
        return res.status(403).send("Access denied");
    }

    // Get borrowed books for the user
    const userBorrowedBooks = borrowedBooks
        .filter((b) => b.userId === user.id)
        .map((b) => {
            const book = books.find((bk) => bk.id === b.bookId);
            return book;
        });

    res.render("members", { books, borrowedBooks: userBorrowedBooks, userId: user.id });
});

// Handle Admin Adding a Book
app.post("/admin/addBook", (req, res) => {
    const { title, author } = req.body;
    if (title && author) {
        const newBook = {
            id: books.length + 1,
            title,
            author,
            available: true,
        };
        books.push(newBook);
        res.redirect("/admin");
    } else {
        res.status(400).send("Title and Author are required");
    }
});

// Handle Admin Removing a Book
app.post("/admin/removeBook", (req, res) => {
    const { bookId } = req.body;
    const bookIndex = books.findIndex((b) => b.id == bookId);
    if (bookIndex !== -1) {
        if (isBookBorrowed(bookId)) {
            return res
                .status(400)
                .send("Cannot remove book. It is currently borrowed by a member.");
        }
        books.splice(bookIndex, 1);
        res.redirect("/admin");
    } else {
        res.status(404).send("Book not found");
    }
});

// Handle Member Borrowing a Book
app.post("/members/borrowBook", (req, res) => {
    const { userId, bookId } = req.body;
    const book = books.find((b) => b.id == bookId);
    const user = users.find((u) => u.id == userId && u.role === "member");

    if (!book || !user) {
        return res.status(400).send("Invalid book or user");
    }

    if (!book.available) {
        return res.status(400).send("Book is not available for borrowing");
    }

    borrowedBooks.push({ userId: user.id, bookId: book.id });
    book.available = false;
    res.redirect(`/members?userId=${user.id}`);
});

// Handle Member Returning a Book
app.post("/members/returnBook", (req, res) => {
    const { userId, bookId } = req.body;
    const borrowIndex = borrowedBooks.findIndex(
        (b) => b.userId == userId && b.bookId == bookId
    );

    if (borrowIndex !== -1) {
        borrowedBooks.splice(borrowIndex, 1);
        const book = books.find((b) => b.id == bookId);
        if (book) {
            book.available = true;
        }
        res.redirect(`/members?userId=${userId}`);
    } else {
        res.status(400).send("Borrow record not found");
    }
});

app.post('/admin/removeUser/:userId', (req, res) => {
    const userId = req.params.userId;

    const user = users.find(u => u.id === parseInt(userId));

    if (!user) {
        return res.status(404).send("User not found");
    }

    const borrowedBooksCount = borrowedBooks.filter(b => b.userId === userId).length;

    if (borrowedBooksCount === 0) {
        const userIndex = users.findIndex(u => u.id === parseInt(userId));
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
        }
        res.redirect('/admin?message=User removed successfully');
    } else {
        res.redirect('/admin?error=User has borrowed books and cannot be removed');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
