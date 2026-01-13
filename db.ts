import sqlite3 from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcrypt'; // For password hashing

// Define the Product type
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

// Create and configure the database
const db = new sqlite3(path.resolve('database.db'));

// Function to create the products table if it doesn't exist
const createTable = () => {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      imageUrl TEXT NOT NULL,
      category TEXT NOT NULL  
    )
  `).run();
};

// Create the orders table
db.prepare(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerName TEXT NOT NULL,
    email TEXT NOT NULL,
    totalAmount REAL NOT NULL,
    status TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`).run();

// Create the order_items table
db.prepare(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY(orderId) REFERENCES orders(id),
    FOREIGN KEY(productId) REFERENCES products(id)
  );
`).run();

// Create the users table for authentication
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`).run();

// Insert a demo user with hashed password
(async function createDemoUser() {
  const demoUsername = 'admin';
  const demoPassword = 'password123';

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(demoPassword, 10);

  try {
    db.prepare(`
      INSERT OR IGNORE INTO users (username, password) 
      VALUES (?, ?)
    `).run(demoUsername, hashedPassword); // Store hashed password
  } catch (error) {
    console.error("Error inserting demo user:", error);
  }
})();

// Function to get all products
export function getProducts(): Product[] {
  // Explicitly cast the result to Product[] to satisfy TypeScript
  return db.prepare('SELECT * FROM products').all() as Product[];
}

// Function to add a product to the database
export function addProduct(name: string, description: string, price: number, imageUrl: string, category: string): void {
  const insert = db.prepare(`
    INSERT INTO products (name, description, price, imageUrl, category)
    VALUES (?, ?, ?, ?, ?)
  `);
  try {
    insert.run(name.trim(), description.trim(), price, imageUrl.trim(), category.trim()); // Sanitized inputs
  } catch (error) {
    console.error("Error inserting product:", error);
    throw error; // Re-throw error for handling in the route
  }
}

// Function to get all distinct categories
export function getCategories(): string[] {
  const rows = db.prepare('SELECT DISTINCT category FROM products').all() as { category: string }[];
  return rows.map(row => row.category);
}

// Function to delete all products from the products table
export function deleteAllProducts(): void {
  const deleteProducts = db.prepare('DELETE FROM products');
  try {
    deleteProducts.run(); // Delete all products
    console.log("All products have been deleted.");
  } catch (error) {
    console.error("Error deleting all products:", error);
    throw error; // Re-throw error for handling
  }
}

// Secure function to authenticate a user
export async function authenticateUser(username: string, password: string): Promise<boolean> {
  const user = db.prepare(`
    SELECT password FROM users WHERE username = ?
  `).get(username);

  if (user) {
    // Compare the provided password with the hashed password stored in the database
    return await bcrypt.compare(password, user.password);
  }

  return false;
}

// Function to add a new user with a hashed password
export async function addUser(username: string, password: string): Promise<void> {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    db.prepare(`
      INSERT INTO users (username, password)
      VALUES (?, ?)
    `).run(username.trim(), hashedPassword); // Store sanitized and hashed password
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

// Export the db object for direct access when necessary
export { db };

// Create the table on startup
createTable();
