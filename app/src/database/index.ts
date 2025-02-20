import { useSQLiteContext } from 'expo-sqlite';

//@ts-expect-error
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
                total_points INT NULL,
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

            CREATE TABLE IF NOT EXISTS questions (
                uuid TEXT PRIMARY KEY,
                modules_uuid TEXT REFERENCES modules(uuid),
                question TEXT,
                correct_answer TEXT,
                explanation TEXT,
                points INT,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS options (
                uuid TEXT PRIMARY KEY,
                questions_uuid TEXT REFERENCES questions(uuid),
                option TEXT,
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