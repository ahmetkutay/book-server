CREATE TABLE
    IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS Books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        score INT DEFAULT -1
    );

CREATE TABLE
    IF NOT EXISTS BorrowedBooks (
        user_id INT,
        book_id INT,
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (book_id) REFERENCES Books(id)
    );

CREATE TABLE
    IF NOT EXISTS ReadBooks (
        user_id INT,
        book_id INT,
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (book_id) REFERENCES Books(id)
    );