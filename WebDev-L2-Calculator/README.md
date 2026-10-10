# Calcura — Calculator

A responsive calculator built with **HTML, CSS, and vanilla JavaScript** for the Oasis Infobyte (OIBSIP) Web Development and Designing Internship — Level 2, Task 1.

## Features
- Addition, subtraction, multiplication, and division
- Decimal input, percentage, sign toggle, and delete-last-digit
- Clear-all button and divide-by-zero handling
- Keyboard input (`0–9`, `.`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, `Escape`, `%`)
- Calculation history panel with the ability to restore a previous result
- Copy-result button
- Responsive desktop, tablet, and mobile layout
- Accessible labels and visible keyboard focus states

## Run locally
1. Open `index.html` in a browser, or open the folder in VS Code.
2. Optionally use the VS Code **Live Server** extension and select **Open with Live Server**.
3. No build step, framework, or package installation is required.

The fonts load from Google Fonts; fallback fonts are included.

## Quick test checklist
- `8 + 4 =` should show `12`
- `9 − 5 =` should show `4`
- `6 × 7 =` should show `42`
- `8 ÷ 2 =` should show `4`
- `5 ÷ 0 =` should show an error message
- Try `2.5 + 1.2 =`
- Test `±`, `%`, delete, AC, keyboard controls, history, and Copy result
- Resize the browser to check the mobile layout

## Project structure
```text
WebDev-L2-Calculator/
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
└── Screenshots/
    └── README.txt
```

## Screenshot
After running the app, take a screenshot of the calculator in your browser and save it in the `Screenshots` folder. Suggested filename: `calculator-preview.png`.

## Technologies
- HTML5
- CSS3
- JavaScript (ES6+)
