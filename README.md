# Secure E-Commerce Application – SQL Injection & XSS Mitigation

This project demonstrates common **web application vulnerabilities** — **SQL Injection** and **Cross-Site Scripting (XSS)** — and their **secure mitigations** using a modern full-stack setup.

---

## Tech Stack
- **Frontend:** Next.js 14 (React + TypeScript)  
- **Styling:** Tailwind CSS  
- **Backend:** Node.js / Express API routes (TypeScript)  
- **Database:** SQLite (using `db.ts`)  
- **Security Testing:** Burp Suite, OWASP ZAP, Manual payloads  

---

## Features
✅ User login / signup simulation  
✅ Product list & add-to-cart system  
✅ Demonstration of SQL Injection & XSS payloads  
✅ Implementation of **secure coding fixes**:  
   - Parameterized queries  
   - Input validation & output encoding  
   - Content-Security-Policy headers  

---

## Vulnerabilities Demonstrated

### 1️ SQL Injection
**Before mitigation:**
```sql
SELECT * FROM users WHERE username = '${input}' AND password = '${pwd}';

**After mitigation:**
```sql
db.prepare('SELECT * FROM users WHERE username = ? AND password = ?')
  .get(username, password);

### 2️ Cross-Site Scripting (XSS)
**Before mitigation:**
```html
<input type="text" value="<script>alert('Hacked!')</script>">
**After mitigation:**
{/* React automatically escapes user input */}
<p>{sanitize(userInput)}</p>


##Security Fix Summary

| Vulnerability           | Cause                  | Mitigation                                  |
| ----------------------- | ---------------------- | ------------------------------------------- |
| SQL Injection           | Dynamic SQL queries    | Prepared statements / parameterized queries |
| XSS                     | Unsanitized user input | Input validation + escaping + CSP           |
| Sensitive Data Exposure | Plain text passwords   | Hashing with bcrypt (simulated)             |
| Unvalidated Redirects   | Direct link inputs     | Safe redirect handlers                      |


##Run Locally

# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Visit
http://localhost:3000


##Learning Outcomes

-Understand how injection and scripting attacks occur
-Practice ethical exploitation and secure remediation
-Apply OWASP Top 10 principles in a real web app


Author

Devika Kishor
Master’s Student in Cybersecurity, Florida Institute of Technology
Sem end Project for Cyber Threats  coursework


