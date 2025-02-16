import * as SQLite from 'expo-sqlite';

export const getContentFromDB = async(subject: string): Promise<any> => {
  const db = await SQLite.openDatabaseSync('content.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY NOT NULL, subject TEXT NOT NULL, content TEXT NOT NULL, title TEXT NOT NULL, video TEXT NOT NULL);
  `);

  const firstRow = await db.getFirstAsync('SELECT * FROM content');
  console.log(firstRow);
};

export const insertContentToDB = async(): Promise<any> => {
  return null;
};