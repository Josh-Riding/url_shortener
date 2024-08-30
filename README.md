# URL Shortener

This project is a URL shortener that allows users to create shortened versions of long URLs. It provides a simple and convenient way to share links without having to remember or type lengthy URLs.

## Features

- **Shorten URLs**: Users can enter a long URL and generate a shortened version.
- **Analytics**: The system tracks the number of clicks and provides a route to see the amount of clicks.
- **Redirection**: Using the generated shorter URL works in the browser to redirect to the intended domain.
- **CLI**: These routes can also be used through basic CLI interface.

## Installation

1. Clone the repository.
2. Navigate to the project directory: `cd url-shortener`
3. Install dependencies: `npm install`
4. Set up your MongoDB database: Create an `.env` file and place your connection string there. For example:
    ```
    DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/url_shortener?retryWrites=true&w=majority
    ```
5. Set your Variables for DB and COLLECTION in the `.env` file.
6. Start the server: `npm start`

## Usage

To use the URL shortener, you can make requests to the following routes defined in [`index.js`](index.js):

- `POST /`: This route accepts a long URL in the request body and generates a shortened version. Example usage:
    ```sh
    curl -X POST -H "Content-Type: application/json" -d '{"url": "https://example.com/very-long-url"}' http://localhost:3000/
    ```

- [`GET /:id`]: This route accepts a shortened URL code as a parameter and redirects the user to the original long URL. Example usage:
    ```sh
    Go to this link in a browser: http://localhost:3000/abc123
    ```

- [`POST /:id`]: This route returns the number of clicks for a given shortened URL. Example usage:
    ```sh
    curl -X POST http://localhost:3000/abc123
    ```

Make sure to replace [`http://localhost:3000`] with the appropriate base URL of your deployed application.

- CLI usage for the above routes

```
node cli.js click <shortUrl>
```
Returns the amount of times the URL has been clicked or used.

```
node cli.js short <urlToShorten>
```
Returns the shortened URL.

## License

This project is licensed under the ISC License. See the LICENSE file for more information.