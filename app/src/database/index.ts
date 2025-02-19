import { useSQLiteContext } from 'expo-sqlite';

async function initializeDatabase(database) {
    try {
        await database.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS Courses ( 
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                uuid status TEXT NOT NULL, 
                status TEXT NOT NULL, 
                youtube TEXT NOT NULL, 
                title TEXT NULL, 
                author TEXT NULL, 
                category TEXT NULL,
                summary TEXT NULL,
                totalPoints INT NULL,
                transcription TEXT NULL,
                createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
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