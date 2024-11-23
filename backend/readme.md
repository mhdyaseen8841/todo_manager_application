# Todo Manager Application

# Features

### Project Management:
* Create a new project.
* List all projects in a centralized dashboard.
* View and edit project details.

### Todo Management:
* Add, update, delete todos within a project.
* Mark todos as complete or pending.
* Display completion status with timestamps.

### Export as Gist:
* Export the summary as a secret GitHub gist.
* Save the exported gist file locally as a markdown file.

### Authentication:
* JWT (JSON Web Token) authentication to secure the application and manage user sessions.

### Responsive UI:
* Built with React for a clean, user-friendly interface with Material UI.

### Database Storage:
* Store project and todo details in a database for persistence.

### Tech Stack
* Frontend: React, MUI
* Backend: Node.js, Express
* Database: MongoDB (atlas cloud)
* Version Control: Git, GitHub
* Gist Integration: GitHub API (currently setup github token in backend .env. which have access only to gist)

### Setup Instructions
Follow the steps below to run the application locally:

1. Prerequisites
    1. Ensure the following are installed:
    Node.js (v14+)

2. Git
   1. Clone the Repository
   2. git clone frontend
   3. git clone backend
   3. cd <repository-folder>

3. Install Dependencies
   * Backend ( Navigate to the backend folder and run: )

     1. cd backend
     2. npm install

  * Frontend (
Navigate to the frontend folder and run:)

     1. cd frontend 
     2. npm install

4. Configure Environment Variables
Create a .env file in the backend folder with the following:

   1. PORT = 4000
   2. MONGOURI = "mongodb+srv://yaseen:5LzUmReTjZ5dWxt2@cluster0.4qw1v.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0"
   3. JWT_SECRET_KEY ="YSN07928841PBVRSF"
   4. GIST_TOKEN = "YOUR_GIST_TOKEN"

5. Create a .env file in the frontend folder with the following:

    1. REACT_APP_API_BASE_URL="http://localhost:4000/api/v1"

5. Run the Application

   1. Start the Backend Server
   2. cd backend
   3. npm start

6. Start the Frontend Server
   1. cd frontend
   2. npm start

The app will be available at http://localhost:3000.



### Usage

* Navigate to the homepage and log in with your credentials.
* Create a new project from the dashboard.
* Add, update, or delete project.
* Add, update, or delete todos within a project.
* Mark todos as pending or complete.
* Export the project summary as a secret gist using the "Export Summary" button.


### Note on Environment Variables
>Due to the nature of this task, the environment variables like MongoDB URI, JWT secret, and GitHub Gist token are shared here. In production, you should always keep these values secure and not expose them in your source code. Use .env files that are excluded from version control and only made available to your backend and frontend servers through secure means (e.g., environment variable management systems in cloud providers).
