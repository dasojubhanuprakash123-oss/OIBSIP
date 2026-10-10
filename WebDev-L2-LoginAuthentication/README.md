# Northstar — Login Authentication UI

A responsive sign-in and registration interface demo built with HTML, CSS, and vanilla JavaScript for the Oasis Infobyte (OIBSIP) Web Development and Designing Internship — Level 2, Task 4.

## Features
- Switch between sign-in and create-account forms
- Client-side email and password validation
- Confirm-password validation on registration
- Show/hide password control
- Friendly inline validation messages
- Demo-only password reset message
- Responsive desktop and mobile layouts
- Simple in-memory demo account registration and sign-in

## Important security note
This is a **frontend demonstration, not production authentication**. Accounts exist only in JavaScript memory and are cleared when the page is refreshed. Passwords are not sent to a server, hashed, or securely stored. Do not use real credentials. A real login system requires a backend, secure password hashing, HTTPS, server-side validation, session management, and appropriate protections.

## Run locally
1. Open `index.html` in a browser, or open this folder in VS Code.
2. Optionally use the VS Code **Live Server** extension.
3. No packages or build step are required.

## Test checklist
1. Try submitting with empty fields and check validation.
2. Switch to Create account.
3. Enter a name, valid email, password of 8+ characters, and matching confirmation.
4. Create the demo account and sign in with the same details in the same page session.
5. Try an incorrect password and confirm the error appears.
6. Use Show/Hide password.
7. Test the layout at mobile width.

## Project structure
```text
WebDev-L2-LoginAuthentication/
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
└── Screenshots/
    └── README.txt
```

## Screenshot
Save screenshots of the sign-in and registration states in the `Screenshots` folder. Suggested filenames: `login-preview.png` and `register-preview.png`.

## Technologies
- HTML5
- CSS3
- JavaScript (ES6+)
