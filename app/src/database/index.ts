import { useSQLiteContext } from 'expo-sqlite';

async function initializeDatabase(database) {
    try {
        await database.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS courses ( 
                uuid TEXT PRIMARY KEY, 
                status TEXT NOT NULL, 
                youtube TEXT NOT NULL, 
                title TEXT NULL,
                author TEXT NULL,
                category TEXT NULL,
                totalPoints INT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS modules (
                uuid TEXT PRIMARY KEY,
                course_uuid TEXT REFERENCES courses(uuid),
                summary TEXT NULL,
                transcription TEXT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Database initialised')
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
}

export {
    initializeDatabase
}