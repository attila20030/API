import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    await dbRun("DROP TABLE IF EXISTS users")
    await dbRun("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, class TEXT)");

    const users = [
        { id: "1",firstName: "John",lastName: "Wick", email: "john.wick@example.com",class:"2/14.a" },
        { id: "2",firstName: "Balogh",lastName: "Niki", email: "balogh.niki@example.com",class:"2/14.b" },
        { id: "3",firstName: "Kis",lastName: "Lili", email: "kis.lili@example.com",class:"2/14.c" },

    ];
    
    for (const user of users) {
        await dbRun("INSERT INTO users (firstName,lastName,email,class) VALUES (?, ?, ?, ?)", [user.firstName,user.lastName,user.email, user.class]);
    }
};

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };
