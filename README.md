# Anonymous Q&A (AJAX)

## Overview
This project is a single-page application (SPA) that allows users to anonymously post questions and provide answers to those questions. The application uses AJAX to handle all interactions dynamically without refreshing the page. It demonstrates the use of Express.js for creating APIs, MongoDB for data storage, and client-side JavaScript for rendering the user interface.

## Features
- **Post Questions**: Users can post anonymous questions.
- **Add Answers**: Users can anonymously answer existing questions.
- **Dynamic Updates**: All updates to questions and answers are made dynamically using AJAX, with no page reloads.
- **Error Handling**: Handles server and network errors gracefully with user-friendly messages.
- **Modals**: Custom modal dialogs for adding questions and answers.

## Technologies Used
- **Express.js**: Backend framework for routing and API creation.
- **MongoDB**: NoSQL database for storing questions and answers.
- **Mongoose**: ODM for database integration.
- **AJAX**: For asynchronous server communication.
- **JavaScript**: For client-side DOM manipulation and event handling.
- **CSS**: For basic styling of the interface.

## Directory Structure
The project follows this structure:
├── .env ├── .gitignore ├── package-lock.json ├── package.json ├── public │ ├── index.html │ ├── javascripts │ │ └── index.js │ └── stylesheets │ └── style.css ├── src │ ├── app.mjs │ ├── config.mjs │ └── db.mjs ├── README.md


## How to Run
1. Clone the repository:
   ```bash
   git clone git@github.com:your-username/anonymous-q-and-a.git

2. Navigate to the project directory:
   ```bash
   cd anonymous-q-and-a

3. Install dependencies:
   ```bash
   npm install

4. Set up a MongoDB database:

Create a local or cloud-based MongoDB database (e.g., MongoDB Atlas).

5. Add the connection string to a .env file:
DSN=mongodb://localhost/qanda

6. Start the server:
   ```bash
   node src/app.mjs

7. Open the application in your browser:
- **Home**: [http://localhost:3000/](http://localhost:3000/)

## How to Use

1. Post a Question:
- Click the "Ask a Question" button.
- Enter your question in the modal and submit.
2. Answer a Question:
- Click the "Add an Answer" button under a question.
- Enter your answer in the modal and submit.
3.  View All Questions and Answers:
- All questions and their answers are displayed dynamically on the home page.