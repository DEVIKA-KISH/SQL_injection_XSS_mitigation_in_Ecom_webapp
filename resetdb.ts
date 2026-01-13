import sqlite3 from "better-sqlite3";
import { db } from "./db";

// Function to reset the database
const resetDatabase = () => {
  try {
    // Delete all rows from related tables
    db.prepare('DELETE FROM order_items').run();
    db.prepare('DELETE FROM orders').run();

    // Delete all rows from the products table
    db.prepare('DELETE FROM products').run();

    console.log('Database reset successfully.');
  } catch (error) {
    console.error('Error resetting database:', error);
  }
};

// Call the reset function
resetDatabase();