# Daymark — To-Do Web App

A responsive to-do list app built with HTML, CSS, and vanilla JavaScript for the Oasis Infobyte (OIBSIP) Web Development and Designing Internship — Level 2, Task 3.

## Features
- Add tasks and prevent empty submissions
- Mark tasks complete or return them to the to-do list
- Filter by All, To do, and Completed
- Delete individual tasks or clear all completed tasks
- Live task counts and completion progress indicator
- Saves tasks in the browser using `localStorage`
- Responsive desktop and mobile layout
- Accessible button labels and keyboard focus styles

## Run locally
1. Open `index.html` in a browser, or open this folder in VS Code.
2. Optionally use the VS Code **Live Server** extension.
3. No packages, frameworks, or build step are required.

Tasks are saved in the current browser on this device. Clearing browser site data or using another browser may remove or hide saved tasks.

## Test checklist
- Add a task using the input and Add task button.
- Try submitting an empty input; it should not add a task.
- Mark a task completed and then mark it active again.
- Switch between All, To do, and Completed.
- Delete one task and use Clear completed.
- Refresh the page and check that tasks remain saved.
- Resize the browser to check the mobile layout.

## Project structure
```text
WebDev-L2-ToDoApp/
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
└── Screenshots/
    └── README.txt
```

## Screenshot
Save a screenshot of the working app in the `Screenshots` folder. Suggested filename: `todo-app-preview.png`.

## Technologies
- HTML5
- CSS3
- JavaScript (ES6+)
- Browser localStorage
