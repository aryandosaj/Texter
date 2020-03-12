# Texter
REST API written in NodeJs.

## Installation

Make sure you have [NodeJs](https://nodejs.org/en/download/) installed.

Use the foolwing commands in the main directory to start the server.
```bash
npm start
```

## Usage

User can send HTTP requests to 
 * post
 * delete
 * update
 * retrieve all
 * find a specific post.

### Posting a Post

To Post a message, user needs to send a POST request with title, description, author, author username in the request body.

### Deleting a Post
To delete a specific Post, user needs to send a DELETE request with post id in the request parameter.

### Updating a Post

Currently, update feature only allows to update the title of a post.
User needs to send a patch request with updated title in the request's body.

### Retrieve all posts

Send a get request to receive all the posts.

### Find a specific post

Send a get request with the post id.

Note: Before sending any of these requests, you first need to login and get the access token.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
