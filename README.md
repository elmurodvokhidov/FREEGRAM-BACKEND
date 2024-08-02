# FREEGRAM BACKEND

FREEGRAM BACKEND is a robust backend solution designed for the FREEGRAM application. This repository provides the server-side logic and API endpoints necessary for the application's functionality. 

## Features

- **User Authentication**: Secure login and registration functionality using JWT.
- **Post Management**: Create, read, update, and delete posts.
- **User Profiles**: Manage user profiles and follow/unfollow other users.
- **Comments and Likes**: Add comments and likes to posts.
- **Real-time Updates**: Support for real-time updates on posts and notifications.

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/elmurodvokhidov/FREEGRAM-BACKEND.git
   ```

2. Navigate into the project directory:

   ```bash
   cd FREEGRAM-BACKEND
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=your_preferred_port
   ```

5. Start the server:

   ```bash
   npm start
   ```

   The server will start on the port specified in your `.env` file (default is `3000`).

## API Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Authenticate a user and return a JWT token.
- **GET /api/posts**: Retrieve all posts.
- **POST /api/posts**: Create a new post.
- **GET /api/posts/:id**: Retrieve a specific post by ID.
- **PUT /api/posts/:id**: Update a specific post by ID.
- **DELETE /api/posts/:id**: Delete a specific post by ID.
- **POST /api/posts/:id/like**: Like a specific post.
- **POST /api/posts/:id/comment**: Add a comment to a specific post.
- **GET /api/users/:id**: Retrieve a user's profile by ID.
- **PUT /api/users/:id**: Update a user's profile by ID.
- **POST /api/users/:id/follow**: Follow a user.
- **POST /api/users/:id/unfollow**: Unfollow a user.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the coding standards and write clear commit messages.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, please contact [elmurodvokhidov@gmail.com](mailto:elmurodvokhidov@gmail.com).