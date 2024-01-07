INSERT INTO Users (name)
VALUES ('John Doe'), ('Jane Smith'), ('Bob Johnson'), ('Alice Williams'), ('Charlie Brown'), ('Eva Davis'), ('Mike Miller'), ('Sara Wilson'), ('David Lee'), ('Emma White'), ('Kevin Brown'), ('Olivia Davis'), ('Daniel Smith'), ('Grace Johnson'), ('Andrew Taylor'), ('Sophia Wilson'), ('Jack Martin'), ('Lily Thompson'), ('Matthew Clark');

INSERT INTO Books (name, score)
VALUES ('Adventure Quest', 10), ('Mystery Mansion', 8), ('Fantasy World', 9), ('Space Odyssey', 7), ("Dragon's Tale", 9), ('Epic Journey', 8), ('Lost Horizon', 8), ('Midnight Secrets', 7), ('Enchanted Forest', 9), ('Galactic Empire', 10), ('Secrets of the Sphinx', 8), ('Echoes of Eternity', 9), ('Chronicles of Chaos', 7), ('Whispers in the Wind', 8), ('Phoenix Rising', 9), ('The Alchemist', 10), ('Beyond the Stars', 8), ('Shadows of Destiny', 9), ('Eternal Flame', 7);

INSERT INTO
    BorrowedBooks (user_id, book_id)
VALUES (1, 1), (2, 2), (3, 14), (4, 6), (5, 7), (6, 17), (7, 12), (8, 4), (9, 10), (10, 18), (11, 15), (12, 8), (13, 13), (14, 16), (15, 5), (16, 3), (17, 11), (18, 19), (19, 9);

INSERT INTO
    ReadBooks (user_id, book_id)
VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10), (11, 11), (12, 12), (13, 13), (14, 14), (15, 15), (16, 16), (17, 17), (18, 18), (19, 19);