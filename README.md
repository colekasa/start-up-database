# Start UP Database API

This API is built for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. It uses Express.js for routing, a MongoDB database, and the Mongoose ODM. You may optionally use a JavaScript date library of your choice or the native JavaScript Date object to format timestamps.

## Usage

### Authentication

This API uses JSON Web Tokens (JWT) for authentication. To use the API, you will need to include an Authorization header with a valid JWT token in your requests. To obtain a token, you will need to send a POST request to /api/users/login with a valid email and password in the request body.

### Routes

#### GET Routes

1 /api/users - Retrieves all users in a formatted JSON.
2 /api/thoughts - Retrieves all thoughts in a formatted JSON.

#### POST Routes

Use Insomnia to send POST requests to the following routes to create new data:
/api/users - Create a new user in the database.
/api/thoughts - Create a new thought in the database.

#### PUT Routes

Use Insomnia to send POST requests to the following routes to create new data:
/api/users - Create a new user in the database.
/api/thoughts - Create a new thought in the database.

#### DELETE Routes

Use Insomnia to send DELETE requests to the following routes to delete data:
/api/users/:userId - Delete the user with the specified userId.
/api/thoughts/:thoughtId - Delete the thought with the specified thoughtId.

Reactions and Friends

To interact with reactions and friends, use the following routes:
/api/thoughts/:thoughtId/reactions - Create a reaction for a specific thought.
/api/thoughts/:thoughtId/reactions/:reactionId - Delete a reaction from a specific thought.
/api/users/:userId/friends - Add or remove friends to a user's friend list.

### Technologies Used

The Social Network API is built using the following technologies:

Node.js
Express.js
MongoDB
Mongoose

### Contribution

Contributions to the Social Network API are welcome! If you encounter any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue in the project repository.

### License

MIT License

Thank you for using the Social Network API! Enjoy building your social network application with ease.
