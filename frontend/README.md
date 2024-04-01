# Frontend (React, React Router DOM, Axios)

The **QuillAI** frontend is designed to offer a user-friendly and efficient platform for creating, submitting, and consuming content. Built with **React** and **React Router DOM**, it delivers a responsive and dynamic user experience.

## Key Components

- **Link**: Navigation links for seamless user navigation.
- **IndexAllPosts**: Displays a comprehensive list of all posts.
- **PostForm**: Provides a form for users to create new posts.
- **PostPage**: Displays the details of a single post.
- **Footer**: Renders the application footer.

## Routing

The application includes the following routes:

- **`/`**: Displays all posts (via **IndexAllPosts**). By default, pagination shows 10 posts per page.
- **`/create_post`**: Renders the **PostForm** for creating new posts.
- **`/sq`**: A placeholder for search functionality (currently displays **IndexAllPosts**). This route searches through text in the category, title, and content of posts.
- **`/post/:post_id`**: Displays a single post (via **PostPage**). Each post is assigned a unique identifier (UUID) upon creation. UUIDs are dynamically generated using client-side parameters and a timestamp, ensuring uniqueness across users and sessions.

## Enhancements

The frontend incorporates various enhancements:

- **Data Fetching**: Utilizes Axios and the `useFetch` hook for seamless data retrieval from the API/database.
- **Error Handling**: Implements basic error handling capabilities within the React application.
- **Accessibility**: Aims for improved accessibility, with a focus on refining styles for enhanced user comfort and aesthetics.
- **Testing**: Basic functionality testing is implemented to ensure the app works as expected.
- **Deployment**: Prepared for deployment to provide users with access to the application.

## Running the App

To run the application, use the following commands:

1. Compile Sass files into CSS for styling:
   ```bash
   npm run compile:sass
   ```

2. Start the React development server for hot reloading and live updates:
   ```bash
   npm start
   ```

This setup allows for an efficient development process, enabling rapid changes and testing.