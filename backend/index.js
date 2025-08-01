import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express(); // Create an Express app
const PORT = 3000;     // Define the port to listen on

// Middleware
app.use(express.json()); // automatically parse all incoming JSON
app.use(cors()); // in production this would be restricted to the actual frontend only

let db;
// Set up database connection and ensure tables exist (faction this off into a db.js for db maintenance specific things
async function setupDatabase() {
  db = await open({
    filename: './data/workouts.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS placeholder (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      holdplace TEXT
    );
  `);

  return db;
}

// Start server
setupDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });

  process.on('SIGINT', () => {
    db.close();
    process.exit();
  });
});

// Routes
app.get('/lui', (req, res) => {
  res.send('farooqi');
});

