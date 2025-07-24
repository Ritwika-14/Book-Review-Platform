# Book Review Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application designed as a platform for users to discover, add, and review books. This project features a complete user authentication system, a RESTful backend API, and a dynamic, interactive frontend built with React.

---

## Features

-   **User Authentication**: Secure user registration and login system using JSON Web Tokens (JWT).
-   **Protected Routes**: Backend middleware ensures that only authenticated users can add new books or write reviews.
-   **Book Management**: Authenticated users can add new books with a title, author, and genre.
-   **Review & Rating System**: Users can write detailed reviews and give a star rating (1-5) for any book.
-   **Real-Time Average Rating**: The average rating for each book is automatically calculated and updated on the backend whenever a new review is submitted.
-   **Dynamic Filtering**: Users can filter the list of all books by author and/or genre in real-time.
-   **RESTful API**: A well-structured backend API to handle all data operations.

---

## Tech Stack

-   **Frontend**: React, React Router, Axios
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose
-   **Authentication**: JSON Web Tokens (JWT), bcryptjs
-   **Environment Management**: dotenv

---

## Setup and Installation

Follow these instructions to get a local copy of the project up and running on your machine.

### Prerequisites

You will need the following software installed on your computer:
-   [Node.js](https://nodejs.org/) (which includes npm)
-   [Git](https://git-scm.com/)
-   A MongoDB database instance (you can get a free one from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/<your-github-username>/book-review-platform.git
    cd book-review-platform
    ```

2.  **Setup the Backend:**
    ```bash
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install
    ```
    -   Create a `.env` file in the `backend` directory.
    -   Add the following environment variables to your `.env` file. You will need to get the `MONGO_URI` from your MongoDB Atlas dashboard.
        ```env
        # .env.example
        MONGO_URI="your_mongodb_connection_string"
        JWT_SECRET="your_super_secret_and_long_jwt_key"
        ```
    -   Start the backend server:
        ```bash
        npm start
        ```
    -   The backend will be running on `http://localhost:5000`.

3.  **Setup the Frontend:**
    ```bash
    # Open a new terminal window
    # Navigate to the frontend directory from the root project folder
    cd frontend

    # Install dependencies
    npm install
    ```
    -   Start the frontend development server:
        ```bash
        npm start
        ```
    -   The React application will open in your browser at `http://localhost:3000`.

---

## Architecture Decisions

This project was built with several key architectural patterns to ensure it is robust, scalable, and maintainable.

1.  **MERN Stack**:
    -   **Why?**: Using JavaScript/Node.js across the entire stack allows for a unified development experience and facilitates code sharing. The MERN stack is highly popular, with a vast ecosystem and community, making it ideal for rapid development of modern web applications.

2.  **RESTful API Backend**:
    -   **Why?**: The backend is designed as a stateless RESTful service. This decouples the frontend from the backend, allowing them to be developed, deployed, and scaled independently. Each resource (users, books, reviews) has a dedicated set of endpoints, making the API predictable and easy to consume.

3.  **Token-Based Authentication (JWT)**:
    -   **Why?**: JWT is a stateless authentication mechanism perfect for REST APIs. Upon login, the server issues a token that the client stores locally. For subsequent protected requests, the client sends this token in the `Authorization` header. This avoids the need for server-side sessions, making the application more scalable. An Axios interceptor on the frontend automates this process.

4.  **Mongoose for Database Modeling**:
    -   **Why?**: While MongoDB is schema-less, Mongoose provides a schema-based solution to model application data. This enforces data structure and validation at the application level, preventing malformed data from being saved.
    -   **Specific Implementation**: A powerful Mongoose `post('save')` hook was implemented on the `Review` model. This server-side logic automatically recalculates and updates a book's `averageRating` every time a new review is saved, ensuring data integrity and efficiency.

5.  **Separation of Concerns**:
    -   **Frontend**: The React application is structured into `components`, `pages`, `api`, and `context` folders. This separates UI presentation, page-level views, API communication logic, and global state management, making the codebase clean and easy to navigate.
    -   **Backend**: The Express application is organized into `models`, `routes`, `controllers`, and `middleware`. This MVC-like pattern separates the data schema, API endpoints, business logic, and request processing functions (like authentication), which is a standard best practice for building maintainable APIs.

6.  **React Context for State Management**:
    -   **Why?**: For a project of this scale, the built-in React Context API is a lightweight and effective solution for managing global state, such as the user's authentication token. It avoids the need for more complex libraries like Redux, reducing boilerplate and simplifying the state management flow.

---

## Known Limitations & Future Improvements

While this project fulfills all the core requirements, there are several areas for future enhancement.

### Known Limitations

-   **UI/UX is Basic**: The styling is minimal to focus on functionality. No component libraries or advanced CSS were used.
-   **No Edit/Delete Functionality**: Users can add books and reviews, but there is currently no functionality to edit or delete their own contributions.
-   **Basic Error Handling**: The frontend relies on simple `alert()` messages for user feedback. A more sophisticated system using toast notifications would improve the user experience.
-   **No Pagination on Frontend**: The backend API is built to support pagination, but the frontend currently fetches and displays all books at once.

### Future Improvements

-   **Implement a UI Library**: Integrate a library like **Material-UI (MUI)** or **Chakra UI** for a more polished and professional user interface.
-   **Add Edit/Delete Features**: Implement the necessary API endpoints and frontend components to allow users to edit or delete the books and reviews they have created.
-   **Frontend Pagination & Sorting**: Add controls to the `BookListPage` to paginate through results and sort books by criteria like `averageRating` or `createdAt`.
-   **Advanced User Profiles**: Create a user profile page where users can see all the books they've added and all the reviews they've written.
-   **Deployment**: Deploy the application to a cloud service like Vercel (for frontend) and Render/Railway (for backend) for public access.
