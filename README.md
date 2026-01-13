```markdown
# Secure E-Commerce Web Application – SQL Injection & XSS Mitigation

This repository demonstrates **two major web security vulnerabilities** —  
**SQL Injection (SQLi)** and **Cross-Site Scripting (XSS)** — using a custom **Next.js-based e-commerce application**, and showcases their **secure mitigations** through best coding practices.

---

## Tech Stack
- **Framework:** Next.js (TypeScript)
- **Styling:** Tailwind CSS
- **Database:** SQLite
- **Backend Logic:** Node.js with TypeScript modules (`db.ts`, `seed.ts`, `resetdb.ts`)
- **Testing Tools:** Burp Suite, OWASP ZAP, Browser Developer Tools
- **Version Control:** Git + GitHub

---

##Project Overview
This project was created as part of coursework -end of semseter project for **Cyber Threats**.

The web app simulates:
- User login/signup  
- Product listings and comments  
- Query-based product search  
- Form inputs intentionally left vulnerable for educational testing  

You can observe and patch **SQL Injection** and **XSS** vulnerabilities while understanding the remediation techniques.

---

## Folder Structure (Uploaded as ZIPs)

| Folder | Purpose |
|---------|----------|
| **app.zip** | Core application pages and routing (Next.js app router) |
| **components.zip** | UI components such as login, product, and cart sections |
| **lib.zip** | Database handling and reusable utility scripts |
| **public.zip** | Static assets (images, icons, etc.) |

>  Each folder has been compressed individually to stay under GitHub’s 25 MB upload limit.  
> To use the project locally, download and extract all `.zip` files into the same root folder.

---

##  How to Rebuild & Run the Project Locally

1️⃣ **Download the ZIPs** from this repository:  
   - `app.zip`  
   - `components.zip`  
   - `lib.zip`  
   - `public.zip`

2️⃣ **Extract all ZIPs** into a single folder, keeping this structure:
```

ecommerce-demo/
├── app/
├── components/
├── lib/
├── public/
├── database.db
├── db.ts
├── seed.ts
├── resetdb.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md

````

3️⃣ **Install dependencies**
```bash
npm install
````

4️⃣ **Run the development server**

```bash
npm run dev
```

5️⃣ **Open in your browser**

```
http://localhost:3000
```

---

## Vulnerabilities Demonstrated

###  SQL Injection

**Before mitigation:**

```sql
SELECT * FROM users WHERE username = '${input}' AND password = '${pwd}';
```

**After mitigation:**

```ts
db.prepare('SELECT * FROM users WHERE username = ? AND password = ?')
  .get(username, password);
```

**Tools used:**

* Burp Suite (intercepted HTTP requests)
* SQLite CLI (verified payload execution)
* Browser console (observed authentication bypass)

---

###  Cross-Site Scripting (XSS)

**Before mitigation:**

```html
<input type="text" value="<script>alert('XSS')</script>">
```

**After mitigation:**

```tsx
{/* React automatically escapes user input */}
<p>{sanitize(userInput)}</p>
```

**Tools used:**

* Burp Suite Repeater
* OWASP ZAP
* Chrome DevTools (to confirm payload execution)

---

## 🧨 How the Vulnerabilities Were Demonstrated

| Stage                 | Description                                                                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Attack Simulation** | Login and comment input fields were tested using crafted payloads (`' OR '1'='1' --` for SQLi, `<script>alert()</script>` for XSS). |
| **Observation**       | Successful login bypass or popup execution confirmed vulnerability presence.                                                        |
| **Mitigation**        | Implemented parameterized queries, CSP headers, and output encoding.                                                                |
| **Verification**      | Retested payloads after applying fixes — results neutralized.                                                                       |

---

## Security Fix Summary

| Vulnerability           | Cause                    | Mitigation                        |
| ----------------------- | ------------------------ | --------------------------------- |
| SQL Injection           | Concatenated SQL strings | Parameterized queries             |
| XSS                     | Unsanitized user input   | Input validation + escaping + CSP |
| Sensitive Data Exposure | Plain text credentials   | Hashing (simulated)               |
| Unvalidated Redirects   | Direct link input        | Safe redirect handlers            |

---

## Learning Outcomes

* Perform **ethical exploitation** of web vulnerabilities.
* Apply **OWASP Top 10** mitigation techniques.
* Understand **secure coding practices** in real-world web apps.
* Demonstrate both **attack and defense** proficiency.

---

## Project Summary

**Course:** Secure Software Development / Cyber Threatd
**Institution:** Florida Institute of Technology
**Author:**Devika Kishor
**Year:** 2024

---

## Tools Used

* Burp Suite Community Edition
* OWASP ZAP
* SQLite Database Browser
* Chrome Developer Tools
* Visual Studio Code
* Next.js Dev Server
* Node.js Environment

---

##  Note for Viewers

> The project is structured for educational and research use only.
> The uploaded `.zip` files (`app.zip`, `components.zip`, `lib.zip`, `public.zip`) contain the full implementation.
> Extract them to the same directory before running the app locally.

---

## 🧑‍💻 Author

**Devika Kishor**
Master’s Student in Cybersecurity, Florida Institute of Technology



---

##  License

This project is shared for **academic and demonstrational purposes**.
Unauthorized commercial use or redistribution of this code is prohibited.

```
