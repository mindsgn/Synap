import * as SQLite from 'expo-sqlite';

// Open (or create) a SQLite database named 'content.db'
const db = SQLite.openDatabase("content.db");

/**
 * Initializes the database table if it doesn't exist.
 */
export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS content (subject TEXT PRIMARY KEY NOT NULL, keypoints TEXT);",
      [],
      () => console.log("Table created or already exists."),
      (_, error) => {
        console.error("Error creating table", error);
        return false;
      }
    );
  });
};

/**
 * Retrieve content for the given subject from the DB.
 * @param subject The subject to search for.
 */
export const getContentFromDB = (subject: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT keypoints FROM content WHERE subject = ?",
        [subject],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0).keypoints);
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          console.error("Error while selecting content from DB", error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const insertContentToDB = (
  subject: string,
  keypoints: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO content (subject, keypoints) VALUES (?, ?)",
        [subject, keypoints],
        (_, result) => {
          resolve();
        },
        (_, error) => {
          console.error("Error while inserting content into DB", error);
          reject(error);
          return false;
        }
      );
    });
  });
};