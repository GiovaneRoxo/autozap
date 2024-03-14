const sqlite3 = require('sqlite3').verbose();
const Attendant = require('../domain/Attendant');

class DatabaseService {
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath);
    }

    getAllAttendants(callback) {
        this.db.all("SELECT * FROM attendant", (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            const attendants = rows.map(row => new Attendant(row.id, row.name, row.bio, row.link));
            callback(null, attendants);
        });
    }

    getMessage(callback) {
        let query = "SELECT message FROM message WHERE active = true LIMIT 1"
        this.db.get(query, (err, row) => {
            if (err) {
                return;
            }
            if (!row) {
                return;
            }
            callback(row.message)
        });
    }

    getReply(callback) {
        let query = "SELECT reply FROM reply WHERE active = true LIMIT 1"
        this.db.get(query, (err, row) => {
            if (err) {
                return;
            }
            if (!row) {
                return;
            }
            callback(row.reply)
        });
    }

    getNextAttendantById(currentAttendantId, callback) {
        this.db.get("SELECT * FROM attendant WHERE id = (SELECT COALESCE((SELECT id FROM attendant WHERE id > ? LIMIT 1),(SELECT id FROM attendant ORDER BY id ASC LIMIT 1)))", [currentAttendantId], (err, row) => {
            if (err) {
                return;
            }
            if (!row) {
                return;
            }
            const attendant = new Attendant(row.id, row.name, row.bio, row.link);
            callback(null, attendant)
        });
    }

}

module.exports = DatabaseService;