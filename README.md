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

---

## How the Vulnerabilities Were Demonstrated

### 🔹 SQL Injection
- **Scenario:** The login form directly concatenated user inputs into the SQL query.
- **Attack Vector:** Entered payloads such as:
  ```sql
  ' OR '1'='1' --
This bypassed authentication and returned all user records.

Tools Used:
Burp Suite Community Edition – for intercepting and modifying HTTP requests
SQLite CLI – to inspect query execution and verify the injected payload
Browser Console – to observe login bypass behavior

Verification of Fix: Retested with same payloads after applying parameterized queries; authentication bypass no longer worked.

Cross-Site Scripting (XSS)

Scenario: Product comment section rendered user input without sanitization.
Attack Vector: Injected payloads such as:
<script>alert('XSS');</script>
causing arbitrary JavaScript execution in victim browsers

Tools Used:
Burp Suite Repeater – to modify HTTP POST requests with XSS payloads
Browser Developer Tools – to view DOM and confirm script execution

Verification of Fix: Implemented input sanitization and CSP headers; re-testing confirmed payloads were safely neutralized.

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


